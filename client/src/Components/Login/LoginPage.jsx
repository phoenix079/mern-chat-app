import React, {useState} from "react";
import {Container,Box,Text,Tabs,TabList,TabPanels,Tab,TabPanel} from "@chakra-ui/react"
import "./loginPage.css"
import Login from "./Login"
import Signup from "../Login-comp/Authentication/Signup"
import { containerClasses } from "@mui/material";
import { white } from "color-name";

const LoginPage = () => {
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
                <Text fontSize="1.5em">
                    Hive : Talk and Connect
                </Text>
            </Box>
            <Box bgColor="white" w="38vw" h="35%" maxHeight="70vw"
                borderRadius="10px"
                borderWidth="1px"
            >
                <Tabs variant="soft-rounded" colorScheme="purple">
                <TabList justifyContent="space-around">
                    <Tab w="50%" m="7px">Login</Tab>
                    <Tab w="50%" m="7px">Sign Up</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>
                        <Login/>
                    </TabPanel>
                    <TabPanel>
                        <Signup/>
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
}

export default LoginPage;