import { useState } from "react"
import "./App.css"

function App() {
  const [inputValue, setInputValue] = useState("")
  const [messages,setMessages]=useState([])
  const [isLoading ,setIsLoading]=useState(false)

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
    const convWithUser = [...messages, {role: "user",content:newMessage}]
    const recentChat=convWithUser.slice(-10)
    setIsLoading(true)
    setMessages(recentChat)
    setInputValue("")


    try{
      const response = await fetch(url,{method: "POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({messages : recentChat})});
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
      setMessages(convWithAssistant)

      while (true) {
        const { value, done } = await reader.read()
        if (done) {
          break
        }
        const chunk = decoder.decode(value, { stream: true })
        nexusAnswer += chunk
        setMessages([...convWithUser, { role: "assistant", content: nexusAnswer }])
      }
      setIsLoading(false)
    }
    catch(error){
      console.error(error.message)
      const errorMessage = "Impossible de contacter le backend NEXUS. Vérifie que FastAPI est lancé sur http://127.0.0.1:8000."
      const convWithError=[...convWithUser,{role:"error", content:errorMessage}]
      setIsLoading(false)
      setMessages(convWithError)
    }

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

  return (
    <div className="app-container">
      <h1>NEXUS</h1>

      <div className="chat-box">
        {messages.map((message,index)=>(<div key={index} className={`message ${message.role}`}><span className="message-label">{getMessageLabel(message.role)}</span>{message.content}</div>))}
        <div className="load">
          {isLoading?(<p>Nexus réfléchit...</p>):null}
        </div>
      </div>

      <form className="input-area" onSubmit={handleSend}>
        <input
          type="text"
          placeholder="Pose ta question à NEXUS..."
          value={inputValue}
          onChange={(event) => setInputValue(event.target.value)}
        />

        <button type="submit" disabled={isLoading} >
          {isLoading ?("Attente..."):("Envoyer")}
        </button>

      </form>
    </div>
  )
}

export default App
 