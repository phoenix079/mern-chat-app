import React from "react";
import { Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { IconButton } from "@mui/material"; // This is the MUI IconButton
import { useNavigate } from "react-router-dom";
import axios from "axios";

/**
 * LogoutMenu Component: Provides a dropdown menu for logout functionality.
 * This component now directly renders the IconButton as its child,
 * allowing Chakra UI's MenuButton to manage its behavior.
 *
 * @param {object} props - Component props.
 * @param {boolean} props.isOpen - Controls the open state of the menu.
 * @param {function} props.onClose - Function to close the menu.
 * @param {function} props.onOpen - Function to open the menu.
 */

function LogoutMenu({ isOpen, onOpen, onClose, setUser }) {
  const navigate = useNavigate();
  const handleLogout = async () => {
    // Make it async to await the backend call
    try {
      // Optional: Call the backend logout endpoint
      // This is primarily for server-side logging or if you implement refresh tokens
      const config = {
        headers: {
          "Content-Type": "application/json",
          // You might send the token here if your logout endpoint requires authentication
          // Authorization: `Bearer ${JSON.parse(localStorage.getItem('userInfo'))?.token}`,
        },
      };
      await axios.post("http://localhost:5000/api/user/logout", {}, config);
      console.log("Backend logout acknowledged.");
    } catch (error) {
      console.error("Error calling backend logout:", error);
      // Even if backend call fails, proceed with client-side logout
    } finally {
      // Always clear user information from localStorage
      localStorage.removeItem("userInfo");
      setUser(null);
      // Navigate to the login page (root path)
      navigate("/");
      // Close the menu after logout
      onClose();
    }
  };

  return (
    <Menu isOpen={isOpen} onClose={onClose} onOpen={onOpen}>
      {/*
        MenuButton directly wraps the IconButton from @mui/material.
        Chakra UI's MenuButton will automatically handle the click event
        on its child to open/close the menu.
      */}
      <MenuButton
        as={IconButton} // Tell MenuButton to render an MUI IconButton
        aria-label="More options"
      >
        <MoreVertIcon /> {/* This is the icon that will be displayed */}
      </MenuButton>

      <MenuList justifyItems="center">
        <MenuItem
          maxWidth="200px"
          justifyContent="center"
          onClick={handleLogout}
          color="red.500"
          fontWeight="semibold"
          // Margins on all sides (m={units})
          m="3px" // Applies 2px margin on all sides (top, right, bottom, left)
          // Adjusting padding using Chakra UI's spacing system (py for vertical, px for horizontal)
          // Using units like '2' or '3' corresponds to theme.space values (e.g., 2 -> 8px, 3 -> 12px)
          // If you literally meant 2px for all padding, you can use px="2px" py="2px"
          // Based on your original "p='2 2 2 2'", it seems you wanted more padding.
          // Let's go with Chakra's default units for better consistency.
          py={2} // Vertical padding (e.g., 8px default)
          px={4} // Horizontal padding (e.g., 16px default)
          // Fun Design additions
          borderRadius="lg" // Slightly larger rounded corners for a softer look
          _hover={{
            bg: "red.100", // Lighter red on hover
            transform: "scale(1.02)", // Slightly scale up on hover for a subtle "pop"
            boxShadow: "lg", // Deeper shadow on hover
            transition: "all 0.2s ease-in-out", // Smooth transition for effects
          }}
          _active={{
            bg: "red.200", // Even darker red on active
            transform: "scale(0.98)", // Slightly scale down on click for feedback
          }}
          _focus={{
            boxShadow: "outline", // A standard focus outline
          }}
        >
          Logout
        </MenuItem>
      </MenuList>
    </Menu>
  );
}

export default LogoutMenu;
