import { useState,useRef,useEffect } from "react"
import "./App.css"

function App() {
  const [inputValue, setInputValue] = useState("")
  const [conversations , setConversations] =useState(()=>{
    try{
      return localStorage.getItem("nexus_conversations")? ( JSON.parse(localStorage.getItem("nexus_conversations"))):([{id: "1", messages: []}])}
    catch{
      return [{id:"1",messages:[]}]
    }
  })
  const [activeId ,setActiveId]=useState("1")
  const activeConv=conversations.find(conv => conv.id ===activeId)
  const messages=activeConv?(activeConv.messages):([] )
  const [isLoading ,setIsLoading]=useState(false)
  const abortControllerRef=useRef(null)
  const messagesEndRef = useRef(null)

  async function handleSend(event){
    event.preventDefault() // empêcher le refresh de la page 
    if (isLoading){
      return 
    }
    const newMessage=inputValue.trim()//nettoyer le message
    const url= "http://127.0.0.1:8000/chat"

    if( newMessage === ""){
      return
    }
    let targetId=activeId
    if (activeConv===undefined){
      const newId=crypto.randomUUID()
      setConversations(ancienClasseur=>[...ancienClasseur,{id:newId,messages:[]}]);
      setActiveId(newId)
      targetId=newId
    }
    const convWithUser = [...messages, {role: "user",content:newMessage}]
    const recentChat=convWithUser.slice(-10)
    const controller=new AbortController()
    abortControllerRef.current=controller
    setIsLoading(true)
    setConversations(ancienClasseur => 
    ancienClasseur.map(conv => {
      if (conv.id === targetId) {
        return { ...conv, messages:recentChat};
      }
      return conv
    }))
    setInputValue("")


    try{
      const response = await fetch(url,{method: "POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({messages : recentChat}),signal:controller.signal});
      if(!response.ok){
        throw new Error(`Response status: ${response.status}`);
      }
      if (!response.body) {
        throw new Error("Response body is empty")
      }
      const reader = response.body.getReader()
      const decoder = new TextDecoder()
      let nexusAnswer = ""
      const convWithAssistant = [...convWithUser, { role: "assistant", content: "" }]
        setConversations(ancienClasseur => 
        ancienClasseur.map(conv => {
          if (conv.id === targetId) {
            return { ...conv, messages: convWithAssistant }
          }
          return conv
       }))
      while (true) {
        const { value, done } = await reader.read()
        if (done) {
          break
        }
        const chunk = decoder.decode(value, { stream: true })
        nexusAnswer += chunk
        setConversations(ancienClasseur => 
        ancienClasseur.map(conv => {
          if (conv.id === targetId) {
            return { ...conv, messages: [...convWithUser,{role:"assistant",content:nexusAnswer}] };
          }
          return conv;
        }))
      }
      setIsLoading(false)
      abortControllerRef.current = null
    }
    catch(error){
      if(error.name==="AbortError"){
        abortControllerRef.current=null
        setIsLoading(false)
        return
      }
      console.error(error.message)
      const errorMessage = "Impossible de contacter le backend NEXUS. Vérifie que FastAPI est lancé sur http://127.0.0.1:8000."
      const convWithError=[...convWithUser,{role:"error", content:errorMessage}]
      setIsLoading(false)
      setConversations(ancienClasseur => 
      ancienClasseur.map(conv => {
        if (conv.id === targetId) {
          return { ...conv, messages:convWithError};
        }
        return conv;
      }))
      abortControllerRef.current = null
    }

  }
  function handleStop(){
    if (abortControllerRef.current){
      abortControllerRef.current.abort()
      abortControllerRef.current=null
      setIsLoading(false) 
    }
  }
  function handleNewConv(){
    const newId=crypto.randomUUID()
    setConversations(ancienClasseur=>[...ancienClasseur,{id:newId,messages:[]}]);
    setActiveId(newId)
  }
  function getMessageLabel(role){
    if (role==="user") {
      return "Moi"
    }
    else if (role==="assistant"){
      return "NEXUS"
    }
    else{
      return "Erreur"
    }
  }
  function handleDeleteConv(id){
    setConversations(ancienClasseur=>ancienClasseur.filter(conv=>conv.id!==id))
    if (activeId===id){
      setActiveId("")
    }
  }
  useEffect(()=>{messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });},[messages])
  useEffect(()=>{
    const tableToString=JSON.stringify(conversations)
    localStorage.setItem("nexus_conversations",tableToString)
  },[conversations])
  return (
    <div className="app-container">
      <header className="brand-header">
        <span className="brand-mark" aria-hidden="true">
          <span className="brand-core"></span>
        </span>
        <h1>NEXUS</h1>
      </header>
      <div className="History">
        {(conversations.map((conversation)=>(<div key={conversation.id} onClick={()=>setActiveId(conversation.id)}>{conversation.id}
          <button onClick={()=>handleDeleteConv(conversation.id)}>X</button>
        </div>)))}
      </div>
      <div className="new-session">
        <button onClick={handleNewConv}>+</button>
      </div>
      <div className="chat-box">
        {messages.length !== 0? (messages.map((message,index)=>(<div key={index} className={`message ${message.role}`}><span className="message-label">{getMessageLabel(message.role)}</span>{message.content}</div>))):(<div>Nexus est prêt</div>)}
        <div className="load">
          {isLoading?(<p>Nexus réfléchit...</p>):null}
        </div>
        <div ref={messagesEndRef}></div>
      </div>

      <form className="input-area" onSubmit={handleSend}>
        <input
          type="text"
          placeholder="Pose ta question à NEXUS..."
          value={inputValue}
          onChange={(event) => setInputValue(event.target.value)}
        />

        <button
          className="send-button"
          type="submit"
          disabled={isLoading}
          aria-label={isLoading ? "Envoi en cours" : "Envoyer le message"}
          title={isLoading ? "Envoi en cours" : "Envoyer"}
        >
          {isLoading ? (
            <span className="spinner" aria-hidden="true"></span>
          ) : (
            <span className="send-icon" aria-hidden="true">➜</span>
          )}
        </button>
        {isLoading ?(
         <button
          className="stop-button"
          type="button"
          onClick={handleStop}
          aria-label="Arrêter la réponse de NEXUS"
          title="Arrêter la réponse"
        >
          Stop
        </button>):null
        }

      </form>
    </div>
  )
}

export default App
