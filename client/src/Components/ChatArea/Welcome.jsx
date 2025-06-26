import React from 'react'
import '../MainContainer.css'

function Welcome() {
  return (
    <div className="welcome-container">
      {/* Replaced empty src with a placeholder image URL */}
      <img
        src="/assets/images/translogo.png"
        alt="Chat App Logo"
      />
      <p>Select a chat to start messaging.</p>
      <p>Or start a new conversation!</p> 
    </div>
  );
}

export default Welcome