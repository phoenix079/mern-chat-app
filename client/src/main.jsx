import React from "react";
import * as ReactDOM from "react-dom/client";
import { BrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import { ChakraProvider } from "@chakra-ui/react";
import { ThemeProvider, createTheme } from "@mui/material/styles"; // Import for MUI theming
import CssBaseline from "@mui/material/CssBaseline"; // Optional: for consistent baseline styles

// Create a basic Material-UI theme
// This provides the necessary context, including pxToRem, for MUI components
const muiTheme = createTheme();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={muiTheme}>
        {/*
          CssBaseline provides a consistent CSS baseline across browsers.
          It's optional but highly recommended when using MUI.
        */}
        <CssBaseline />
        <ChakraProvider>
          <App />
        </ChakraProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);
