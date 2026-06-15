function App() {
  return (
    <div className="app-container">
      <h1>NEXUS</h1>
      
      <div className="chat-box">
        {/* L'historique des messages viendra ici plus tard */}
      </div>

      <div className="input-area">
        <input type="text" placeholder="Pose ta question à NEXUS..." />
        <button>Envoyer</button>
      </div>
    </div>
  )
}

export default App
