import React, {useState, useEffect} from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SearchIcon from '@mui/icons-material/Search';
import "../MainContainer.css";
import { IconButton } from "@mui/material";
import Conversation from "./Conversation";
import { Box } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";


function Sidebar() {
  const [fetchAgain, setFetchAgain] = useState(false);
  const [conversations, setConversations] = useState([]);
  const [loadingChats, setLoadingChats] = useState(true); // New state for loading chats
  const [user, setUser] = useState(null); // State to store logged-in user info
  const navigate = useNavigate();

  // Effect to get user info from localStorage on component mount
  // This simulates getting the authenticated user's details after login
  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (userInfo) {
      setUser(userInfo);
      // In a real app, you'd fetch chats based on this user's ID/token
      fetchConversations(userInfo);
    } else {
      // If no user info, redirect to login page (protected route logic)
      navigate("/");
    }
  }, [navigate]); // navigate is stable, but good to include if it changes often

  // Simulate fetching conversations (replace with actual API call later)
  const fetchConversations = (loggedInUser) => {
    setLoadingChats(true);
    // In a real application, you'd make an axios.get request here:
    // axios.get(`/api/chats?userId=${loggedInUser._id}`, { headers: { Authorization: `Bearer ${loggedInUser.token}` } })
    // .then(response => { setConversations(response.data); setLoadingChats(false); })
    // .catch(error => { console.error("Error fetching chats:", error); setLoadingChats(false); });

    // For now, use mock data after a short delay
    setTimeout(() => {
      setConversations([
        {
          name: "Bhaipo",
          lastMessage: "Hey, how are you?",
          timeStamp: "10:30 AM",
          id: 1, // Add unique IDs for keys in map
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
    }, 1000); // Simulate network delay
  };
  return (
    <>
      <div className="sidebar-container">
        <div className="sidebar-header">
          {/* User Profile / Avatar */}
          <div>
            <IconButton>
              {/* Display user's initial or actual profile pic */}
              {user ? (
                <AccountCircleIcon /> // Or use an Avatar component with user.pic if you have it
              ) : (
                <AccountCircleIcon />
              )}
            </IconButton>
            {user && (
              <span style={{ fontWeight: "bold", marginLeft: "5px" }}>
                {user.name}
              </span>
            )}
          </div>

          {/* Action Buttons */}
          <div>
            <IconButton>
              <PersonAddAltIcon /> {/* Add Contact */}
            </IconButton>
            <IconButton>
              <GroupAddIcon /> {/* Create Group */}
            </IconButton>
            <IconButton>
              <AddCircleIcon /> {/* New Chat */}
            </IconButton>
            <IconButton>
              <MoreVertIcon /> {/* More Options */}
            </IconButton>
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
              // Navigate to the chat area for the selected conversation
              // You'd typically pass a conversation ID here
              const handleConversationClick = () => {
                navigate(`/app/chat?id=${conversation.id}`); // Example: /app/chat?id=1
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
