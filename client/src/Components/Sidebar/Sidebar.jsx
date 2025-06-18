import React, {useState} from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SearchIcon from '@mui/icons-material/Search';
import "./MainContainer.css";
import { IconButton } from "@mui/material";
import Conversation from "./Conversation";
import ChatArea from "./ChatArea";
import { Box } from "@chakra-ui/react";

function Sidebar() {
    const [fetchAgain, setFetchAgain]=useState(false)
    const {user} = Sidebar()


    const [conversations,setConversations]=useState([
        {
            name:"Bhaipo",
            lastMessage:"Hello",
            timeStamp:"Today",
        },
        {
            name:"Mayukh College",
            lastMessage:"Hi",
            timeStamp:"Now",
        },
    ]);
  return (
    <>
      <div style={{ width: "100%" }}>
        {user && <SideDrawer />}
        <Box
          d="flex"
          justifyContent="space-between"
          w="100%"
          h="91.5vh"
          p="10px"
        >
          {user && <MyChats fetchAgain={fetchAgain} />}
          {user && (
            <Chatbox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
          )}
        </Box>
      </div>

      <div className="sidebar-container">
        <div className="sidebar-header">
          <div>
            <IconButton>
              <AccountCircleIcon />
            </IconButton>
          </div>

          <div>
            <IconButton>
              <PersonAddAltIcon />
            </IconButton>
            <IconButton>
              <GroupAddIcon />
            </IconButton>
            <IconButton>
              <AddCircleIcon />
            </IconButton>
            <IconButton>
              <MoreVertIcon />
            </IconButton>
          </div>
        </div>
        <div id="search1">
          <div class="sidebar-search">
            <IconButton>
              <SearchIcon />
            </IconButton>
            <input
              type="text"
              placeholder="Search"
              id="search-box"
              class="sidebar-search"
            />
          </div>
        </div>
        <div className="sidebar-conversations">
          {conversations.map((conversation) => {
            return (
              <Conversation props={conversation} key={conversation.name} />
            );
          })}
        </div>
      </div>
    </>
  );
}

export default Sidebar;
