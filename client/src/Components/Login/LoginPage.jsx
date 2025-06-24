import React, { useState } from "react";
import {
  Container,
  Box,
  Text,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import "./loginPage.css";
import Login from "./Login";
import Signup from "../Register/Register.jsx";

const LoginPage = () => {
  // State to manage the currently selected tab index
  const [selectedTabIndex, setSelectedTabIndex] = useState(0); // 0 for Login, 1 for Sign Up

  // Variants for the fade animation
  const fadeVariant = {
    // Initial state: invisible and slightly offset (optional, for subtle slide)
    hidden: { opacity: 0, y: 10 },
    // Animation state: fully visible, returns to original position
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3, ease: "easeOut" },
    },
    // Exit state: fades out and moves slightly down
    exit: {
      opacity: 0,
      y: 10,
      transition: { duration: 0.3, ease: "easeIn" },
    },
  };

  return (
    <Container maxW="350px" alignSelf="flex-start" centerContent>
      <Box
        display="flex"
        justifyContent="center"
        p="10px"
        bgColor="white"
        w="38vw"
        m="40px 0 15px 0"
        borderRadius="10px"
        borderWidth="1px"
      >
        <Text fontSize="1.5em" fontWeight="bold">
          Hive : Talk and Connect
        </Text>
      </Box>
      <Box
        bgColor="white"
        w="38vw"
        h="35%"
        p="20px"
        paddingBottom="35px"
        maxHeight="70vw"
        borderRadius="10px"
        borderWidth="1px"
      >
        <Tabs
          variant="soft-rounded"
          colorScheme="purple"
          index={selectedTabIndex} // Control the active tab programmatically
          onChange={(index) => setSelectedTabIndex(index)} // Update state on tab change
        >
          <TabList justifyContent="space-around" marginBottom={4}>
            <Tab w="50%" m="7px">
              Login
            </Tab>
            <Tab w="50%" m="7px">
              Sign Up
            </Tab>
          </TabList>

          {/* TabPanels component manages the content for each tab */}
          <TabPanels>
            {/* TabPanel for Login content */}
            <TabPanel p={0}>
              {/* AnimatePresence wraps the conditionally rendered motion.div */}
              <AnimatePresence mode="wait">
                {/* Conditionally render the Login component's motion.div only when selected */}
                {selectedTabIndex === 0 && (
                  <motion.div
                    key="login-form-content" // Unique key for the motion component
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    variants={fadeVariant}
                  >
                    <Login />
                  </motion.div>
                )}
              </AnimatePresence>
            </TabPanel>

            {/* TabPanel for Sign Up content */}
            <TabPanel p={0}>
              {/* AnimatePresence wraps the conditionally rendered motion.div */}
              <AnimatePresence mode="wait">
                {/* Conditionally render the Signup component's motion.div only when selected */}
                {selectedTabIndex === 1 && (
                  <motion.div
                    key="signup-form-content" // Unique key for the motion component
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    variants={fadeVariant}
                  >
                    <Signup />
                  </motion.div>
                )}
              </AnimatePresence>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
    // <div className="loginArea">
    //     <div className="loginBar">
    //         <label id="lbl1">Enter email</label>
    //         <input type="text" placeholder="Enter email"/>
    //     </div>
    //     <div className="passwordbar">
    //         <label id="lbl2">Enter Password</label>
    //         <input type="text" placeholder="Enter Password"/>
    //     </div>
    //     <label id="frgtpass">Forgot Password?</label>
    // </div>
  );
};

export default LoginPage;
