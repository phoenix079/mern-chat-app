import React, { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import PersonIcon from '@mui/icons-material/Person';
import InfoIcon from '@mui/icons-material/Info';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import EmojiPicker from "emoji-picker-react";
import "./MainContainer.css";
import { IconButton } from "@mui/material";
import { useRef } from "react";


const ChatArea= () => {
  const [open,setOpen]= useState(false);
  const [Text,setText]= useState("");

  const endRef=useRef(null)
  useEffect(()=>{
    endRef.current?.scrollIntoView({behavior:"smooth"});
  },[])

  const handleEmoji = (e) =>{
    setText((prev)=>prev+e.emoji);
    setOpen(false);
  }

  return (
    <div className="chatArea-container">
      <div className="chatArea-header">
        <div className="user">
          <IconButton>
            <PersonIcon/>
          </IconButton>
          <div className="span">
            <span>ABC</span>
            <p>agsyadguhui</p>
          </div>
        </div>
        <div className="more-func">
          <IconButton>
            <InfoIcon/>
          </IconButton>
        </div>
      </div>
      <div className="message-container">
        <div className="message">
          <div className="texts">
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit corporis, suscipit nihil dignissimos at labore velit, enim, quaerat vero corrupti doloremque error consequuntur quam iusto ratione! Fuga accusantium quos at.</p>
            <span>1 min ago</span>
          </div>
        </div>
        <div className="message-own">
          <div className="texts">
            <p>abcd</p>
            <span>1 min ago</span>
          </div>
        </div>
        <div className="message">
          <div className="texts">
            <p>abcd</p>
            <span>1 min ago</span>
          </div>
        </div>
        <div className="message-own">
          <div className="texts">
            <img  src="https://www.akamai.com/site/im-demo/media-viewer/01.jpg?imwidth=5000" alt="car-1" />
            <p>abcd</p>
            <span>1 min ago</span>
          </div>
        </div>
        <div className="message">
          <div className="texts">
            <p>abcd</p>
            <span>1 min ago</span>
          </div>
        </div>
        <div className="message-own">
          <div className="texts">
            <p>abcd</p>
            <span>1 min ago</span>
          </div>
        </div>
        <div ref={endRef}></div>
      </div>
      <div className="text-input-area">
        <div className="text-func">
          <IconButton>
            <AttachFileIcon/>
          </IconButton>
        </div>
        <input type="text" placeholder="Type your message"
          value={Text} 
          onChange={(e)=>setText(e.target.value)}/>
        <div className="emoji">
          <IconButton>
            <EmojiEmotionsIcon className="emoji-icon" onClick={() =>setOpen((prev)=>!prev)}/>
            <EmojiPicker className="picker" open={open} onEmojiClick={handleEmoji}/>
          </IconButton>
        </div>
        <div className="send">
          <IconButton>
            <SendRoundedIcon/>
          </IconButton>
        </div>
      </div>
    </div>
  );
}

export default ChatArea;
