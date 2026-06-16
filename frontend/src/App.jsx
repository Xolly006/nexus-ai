import { useState } from "react"

function App() {
  const [inputValue, setInputValue] = useState("")

  return (
    <div className="app-container">
      <h1>NEXUS</h1>

      <div className="chat-box">
        <p>Historique des messages à venir...</p>
      </div>

      <div className="input-area">
        <input
          type="text"
          placeholder="Pose ta question à NEXUS..."
          value={inputValue}
          onChange={(event) => setInputValue(event.target.value)}
        />

        <button>Envoyer</button>
      </div>

      <p>Tu as écrit : {inputValue}</p>
    </div>
  )
}

export default App
