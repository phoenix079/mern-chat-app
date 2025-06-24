import React from 'react'
import '../MainContainer.css'

function Welcome() {
  return (
    <div className="welcome-container">
      {/* Replaced empty src with a placeholder image URL */}
      <img
        src="https://placehold.co/200x200/BDB2FA/4A235A?text=Chat+App"
        alt="Chat App Logo"
      />
      <p>Select a chat to start messaging.</p>
      <p>Or start a new conversation!</p> 
    </div>
  );
}

export default Welcome