import React from "react";

function Conversation({ props }) {
  return (
    <div className="conversation-container">
      {/* Display first letter of name as icon */}
      <p className="con-icon">
        {props.name ? props.name[0].toUpperCase() : ""}
      </p>
      {/* Display conversation title */}
      <p className="con-title">{props.name}</p>
      {/* Display last message */}
      <p className="con-lastMessage">{props.lastMessage}</p>
      {/* Display timestamp */}
      <p className="con-timeStamp">{props.timeStamp}</p>
    </div>
  );
}

export default Conversation;
