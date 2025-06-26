import React, { useState, useEffect } from "react";
import {
  Container,
  Box,
  Text,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Image, // Make sure Image is imported
} from "@chakra-ui/react";
import { motion, AnimatePresence, useAnimation } from "framer-motion"; // Import useAnimation
import "./loginPage.css";
import Login from "./Login";
import Signup from "../Register/Register.jsx";

// Import your logo image. Based on your file directory and previous error,
// the path is likely relative to the public folder if it's there.
// We'll use the absolute path from the root for direct access as per Vite's recommendation.
const LOGO_PATH = "/assets/images/translogo.png"; //

const LoginPage = ({ setUser }) => {
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);
  const logoAnimationControls = useAnimation(); // Controls for the falling/reshaping logo and its final position
  const imageOpacityControls = useAnimation(); // Controls specifically for the logo image's opacity
  const pageContentControls = useAnimation(); // Controls for the main page content fade-in
  const textTypingControls = useAnimation(); // New: Controls for the overall typing animation start

  // Variants for the fade animation (retained for tab content and overall page content)
  const fadeVariant = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3, ease: "easeOut" },
    },
    exit: {
      opacity: 0,
      y: 10,
      transition: { duration: 0.3, ease: "easeIn" },
    },
  };



  
  // Text for the typewriter effect - UPDATED with spaces
  const titleText = "Hive: Talk and Connect";

  // Calculate the total duration of the typing animation
  // (initial delay + number of characters * stagger delay)
  const totalTypingDuration = 0.5 + titleText.length * 0.05;

  // Variants for the typewriter effect
  const sentence = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        delay: 0.5,
        staggerChildren: 0.05, // Stagger each character's animation
      },
    },
  };

  const letter = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.01, // Quick appearance for each letter
        ease: "linear", // No spring effect, just appear
      },
    },
  };

  // Variants for the blinking cursor
  const cursorBlink = {
    hidden: { opacity: 0 }, // Initially hidden
    visible: {
      opacity: [0, 1, 1, 0], // Blink effect: fade in, stay, fade out
      transition: {
        delay: totalTypingDuration + 0.1, // Start blinking after typing finishes + small buffer
        repeat: Infinity, // Repeat indefinitely
        duration: 0.8, // Duration of one blink cycle
        ease: "easeInOut",
        repeatDelay: 0.2, // Delay before repeating the blink
      },
    },
  };



  useEffect(() => {
    const sequence = async () => {
      // 0. Ensure main content and image are hidden initially
      await pageContentControls.set("hidden");
      await imageOpacityControls.set({ opacity: 0 });
      await textTypingControls.set("hidden"); // Ensure the text is hidden initially

      // 1. Purple circular object falls from above to the center (bigger animation)
      await logoAnimationControls.start({
        // Initial state of the falling object
        y: "0%", // Falls to vertical center relative to its initial absolute position
        borderRadius: "50%",
        opacity: 1,
        backgroundColor: "rgba(128, 90, 213, 1)", // Purple color
        width: "200px", // Increased initial size of the circle
        height: "200px",
        // Position it centrally within the viewport for the animation
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)", // Fully center it
        transition: {
          type: "spring",
          damping: 10,
          stiffness: 70,
          duration: 1.5,
          delay: 0.5,
        },
      });

      // 2. Reshape into logo form (by fading background and showing image)
      // Simultaneously start fading in the actual image
      await Promise.all([
        logoAnimationControls.start({
          borderRadius: "0px", // Reshape to square (intermediate, for hex-like effect)
          scale: [1, 1.1, 1], // Slight bounce effect during reshape
          backgroundColor: "rgba(128, 90, 213, 0)", // Fade out background as image fades in
          transition: {
            duration: 0.8,
            ease: "easeInOut",
            delay: 0.2, // Small delay after falling
          },
        }),
        imageOpacityControls.start({
          opacity: 1, // Fade in the actual image
          transition: {
            duration: 0.8, // Match reshape duration
            ease: "easeOut",
            delay: 0.5, // Delay slightly to appear *during* the reshape
          },
        }),
      ]);

      // 3. Shrink and move logo to top-left corner with smooth transition
      await logoAnimationControls.start({
        top: "10px", // Target top position from viewport top
        left: "10px", // Target left position from viewport left
        width: "80px", // Shrink width
        height: "80px", // Shrink height
        transform: "none", // Remove translate to simplify positioning relative to top/left
        transition: {
          duration: 0.8, // Smooth transition duration
          ease: "easeInOut", // Smooth ease for movement
        },
      });

      // 4. Fade in the rest of the LoginPage content
      await pageContentControls.start("visible");
      // This will use the delay defined in the 'sentence' variant itself.
      await textTypingControls.start("visible");
    };

    sequence();
  }, [
    logoAnimationControls,
    imageOpacityControls,
    pageContentControls,
    textTypingControls,
    titleText.length,
  ]);

  return (
    // Outer Container spans full viewport to house both absolute logo and centered content
    <Container
      maxW="100vw" // Take full viewport width
      minH="100vh" // Take full viewport height
      display="flex"
      flexDirection="column" // Stack its children (logo and main content) vertically
      justifyContent="center" // Vertically center the main content area
      alignItems="center" // Horizontally center the main content area
      p={{ base: "20px", md: "0" }}
      position="relative" // Crucial for positioning the absolute logo animation correctly relative to the viewport
      overflow="hidden" // Prevent scrollbars if elements temporarily go off-screen
    >
      {/* The animated logo element - positioned absolutely within the full-viewport Container */}
      <motion.div
        initial={{
          opacity: 0, // Initially hidden
          y: "-250%", // Start further up to simulate dropping
          width: "200px",
          height: "200px",
          borderRadius: "50%",
          backgroundColor: "rgba(128, 90, 213, 1)",
          // Start off-screen (top) for the drop animation
          position: "absolute",
          top: "0", // Will be animated to 50% for center, then 10px for corner
          left: "50%",
          transform: "translate(-50%, -50%)", // Centers it horizontally relative to its left
          zIndex: 10, // Ensure it's above other content during animation
        }}
        animate={logoAnimationControls}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          // The background color will change during animation, showing the image
        }}
      >
        {/* The actual logo image - its opacity is controlled separately */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={imageOpacityControls} // Use separate controls for image opacity
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            src={LOGO_PATH} // Use the constant for the logo path
            alt="Hive Talk and Connect Logo"
            boxSize="100%" // Take full size of its parent motion.div
            objectFit="contain"
          />
        </motion.div>
      </motion.div>

      {/* Main LoginPage Content - initially hidden, fades in after logo animation */}
      {/* This will be centered by the parent Container's flex properties */}
      <motion.div
        initial="hidden"
        animate={pageContentControls}
        variants={fadeVariant}
        style={{
          width: "100%",
          maxWidth: "480px", // Keep a max-width for the form content itself
          zIndex: 1, // Ensure it's below the animation during its play
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "0", // Reset any default margin that might push it down
        }}
      >
        {/* Box for "Hive : Talk and Connect" text */}
        <Box
          display="flex"
          justifyContent="center"
          p="10px"
          bgColor="white"
          // Responsive width: 90% on small screens, fixed px on medium, 38vw on larger
          w="full" // Takes full width of its parent Container
          maxW="450px" // Max width to prevent it from becoming too large
          m={{ base: "20px 0 15px 0", md: "40px 0 15px 0" }} // Adjust margin for smaller screens
          borderRadius="10px"
          borderWidth="1px"
          boxShadow="md"
          fontSize={{ base: "1.5em", md: "1.5em" }}
        >
          <motion.div
            variants={sentence}
            initial="hidden"
            animate={textTypingControls}
          >
            {/* Ensure Text component only wraps the motion.spans */}
            <Text fontWeight="bold" textAlign="center" display="flex" justifyContent="center">
              {titleText.split("").map((char, index) => (
                <motion.span key={char + "-" + index} variants={letter}>
                  {char === " " ? "\u00A0" : char}{" "}
                  {/* Render a non-breaking space for actual spaces */}
                </motion.span>
              ))}
              <motion.span
                key="cursor" // Unique key for the cursor
                variants={cursorBlink}
                initial="hidden" // Start as hidden
                animate="visible" // Animate to visible (and then blink)
                style={{
                  display: "inline-block",
                  marginLeft: "2px",
                  width: "3px",
                  height: "1em",
                }} // Style the cursor
              >
                |
              </motion.span>
            </Text>
          </motion.div>
        </Box>

        {/* Box for Login/Signup Tabs */}
        <Box
          bgColor="white"
          w="full"
          maxW="450px"
          minHeight="400px"
          p="20px"
          paddingBottom="35px"
          borderRadius="10px"
          borderWidth="1px"
          boxShadow="md"
        >
          <Tabs
            variant="soft-rounded"
            colorScheme="purple"
            index={selectedTabIndex}
            onChange={(index) => setSelectedTabIndex(index)}
          >
            <TabList justifyContent="space-around" marginBottom={4}>
              <Tab w="50%" m="7px">
                Login
              </Tab>
              <Tab w="50%" m="7px">
                Sign Up
              </Tab>
            </TabList>

            <TabPanels>
              <TabPanel p={0}>
                <AnimatePresence mode="wait">
                  {selectedTabIndex === 0 && (
                    <motion.div
                      key="login-form-content"
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      variants={fadeVariant}
                      style={{ width: "100%" }}
                    >
                      <Login setUser={setUser} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </TabPanel>

              <TabPanel p={0}>
                <AnimatePresence mode="wait">
                  {selectedTabIndex === 1 && (
                    <motion.div
                      key="signup-form-content"
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      variants={fadeVariant}
                      style={{ width: "100%" }}
                    >
                      <Signup setUser={setUser} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </motion.div>
    </Container>
  );
};

export default LoginPage;
