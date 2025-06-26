// client/src/Components/Sidebar/Sidebar.jsx
import React, { useState, useEffect } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SearchIcon from "@mui/icons-material/Search";

import { IconButton } from "@mui/material";

import { useDisclosure } from "@chakra-ui/react";
import { Box } from "@chakra-ui/react";

import "../MainContainer.css";
import Conversation from "./Conversation";
import { useNavigate } from "react-router-dom";
import LogoutMenu from "./LogoutMenu";

// Sidebar MUST accept setUser as a prop to pass it down
function Sidebar({ setUser }) {
  const [fetchAgain, setFetchAgain] = useState(false);
  const [conversations, setConversations] = useState([]);
  const [loadingChats, setLoadingChats] = useState(true);
  const [internalUser, setInternalUser] = useState(null); // Renamed internal state to avoid confusion

  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();

  // This useEffect fetches user info for Sidebar's internal display
  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (userInfo) {
      setInternalUser(userInfo);
      fetchConversations(userInfo);
    } else {
      // If no userInfo in localStorage, and we're on a protected route,
      // navigate home. The App.jsx's useEffect handles the primary redirect.
      navigate("/");
    }
  }, [navigate]); // navigate is stable. Removed internalUser from dependency to prevent loop with fetchConversations

  const fetchConversations = (loggedInUser) => {
    setLoadingChats(true);
    setTimeout(() => {
      setConversations([
        {
          name: "Bhaipo",
          lastMessage: "Hey, how are you?",
          timeStamp: "10:30 AM",
          id: 1,
        },
        {
          name: "Mayukh College",
          lastMessage: "Meeting at 2 PM.",
          timeStamp: "Yesterday",
          id: 2,
        },
        {
          name: "Project Group",
          lastMessage: "Don't forget the deadline!",
          timeStamp: "Mon",
          id: 3,
        },
        {
          name: "John Doe",
          lastMessage: "See you later!",
          timeStamp: "Sun",
          id: 4,
        },
        {
          name: "Jane Smith",
          lastMessage: "Thanks for your help.",
          timeStamp: "2 days ago",
          id: 5,
        },
      ]);
      setLoadingChats(false);
    }, 1000);
  };

  return (
    <>
      <div className="sidebar-container">
        <div className="sidebar-header">
          {/* User Profile / Avatar */}
          <div>
            <IconButton>
              {internalUser?.pic ? (
                <img
                  src={internalUser.pic}
                  alt="Profile Pic"
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    objectFit: "cover",
                  }}
                />
              ) : (
                <AccountCircleIcon style={{ fontSize: "2.1rem" }} />
              )}
            </IconButton>
            {/* {internalUser && (
              <span style={{ fontWeight: "bold", marginLeft: "5px" }}>
                {internalUser.name}
              </span>
            )} */}
          </div>

          {/* Action Buttons */}
          <div className="sidebar-action-buttons">
            <IconButton>
              <PersonAddAltIcon />
            </IconButton>
            <IconButton>
              <GroupAddIcon />
            </IconButton>
            <IconButton>
              <AddCircleIcon />
            </IconButton>
            {/* LogoutMenu MUST receive setUser */}
            <LogoutMenu
              isOpen={isOpen}
              onOpen={onOpen}
              onClose={onClose}
              setUser={setUser}
            />
          </div>
        </div>

        {/* Search Bar */}
        <div className="sidebar-search">
          <IconButton>
            <SearchIcon />
          </IconButton>
          <input
            type="text"
            placeholder="Search chats or users"
            id="search-box"
          />
        </div>

        {/* Conversations List */}
        <div className="sidebar-conversations">
          {loadingChats ? (
            <p style={{ textAlign: "center", marginTop: "20px" }}>
              Loading chats...
            </p>
          ) : conversations.length > 0 ? (
            conversations.map((conversation) => {
              const handleConversationClick = () => {
                navigate(`/app/chat?id=${conversation.id}`);
              };
              return (
                <div key={conversation.id} onClick={handleConversationClick}>
                  <Conversation props={conversation} />
                </div>
              );
            })
          ) : (
            <p style={{ textAlign: "center", marginTop: "20px" }}>
              No chats found. Start a new one!
            </p>
          )}
        </div>
      </div>
    </>
  );
}

export default Sidebar;
