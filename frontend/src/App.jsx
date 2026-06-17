import { useState } from "react"

function App() {
  const [inputValue, setInputValue] = useState("")
  const [messages,setMessages]=useState([])
  function handleSend(event){
    event.preventDefault()
    const newMessage=inputValue.trim()
    if( newMessage === ""){
      return
    }
    setMessages([...messages,newMessage])
    setInputValue("")
    
  }
  return (
    <div className="app-container">
      <h1>NEXUS</h1>

      <div className="chat-box">
        {messages.map((message,index)=>(<p key={index}>{message}</p>))}
      </div>

      <form className="input-area" onSubmit={handleSend}>
        <input
          type="text"
          placeholder="Pose ta question à NEXUS..."
          value={inputValue}
          onChange={(event) => setInputValue(event.target.value)}
        />

        <button type="submit" >
          Envoyer
        </button>
      </form>

    </div>
  )
}

export default App
 