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
    setIsLoading(true)
    setMessages(convWithUser)
    setInputValue("")


    try{
      const response = await fetch(url,{method: "POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({text : newMessage})});
      if(!response.ok){
        throw new Error(`Response status: ${response.status}`);
      }
      const nexusAnswer = await response.text();
      const convWithNexus=[...convWithUser,{role:"assistant" , content: nexusAnswer}]
      setIsLoading(false)
      setMessages(convWithNexus)
      
    }
    catch(error){
      console.error(error.message)
      const convWithError=[...convWithUser,{role:"error", content:error.message}]
      setIsLoading(false)
      setMessages(convWithError)
    }

  }
  return (
    <div className="app-container">
      <h1>NEXUS</h1>

      <div className="chat-box">
        {messages.map((message,index)=>(<div key={index} className={`message ${message.role}`}>{message.content}</div>))}
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
          Envoyer
        </button>

      </form>
    </div>
  )
}

export default App
 