import './App.css'
import MainContainer from './Components/MainContainer'
import LoginPage from './Login/LoginPage'
import { ChakraProvider } from '@chakra-ui/react'
import Welcome from "./Components/ChatArea/Welcome";
import ChatArea from "./Components/ChatArea";
import {Route, Routes} from "react-router-dom";

function App() {

  return (
      <div className="App">
        <Routes>
          <Route path="/" element={<ChakraProvider><LoginPage /></ChakraProvider>} exact/>
          <Route path="app" element={<MainContainer />}>
            <Route path="welcome" element={<Welcome />} />
            <Route path="chat" element={<ChatArea />} />
          </Route>
        </Routes>
      </div>
  )
}

export default App
