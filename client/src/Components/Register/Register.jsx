import React, { useState } from "react";
import {
  Stack,
  HStack,
  VStack,
  Input,
  InputGroup,
  InputRightElement,
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  useStatStyles,
  useToast,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = ({setUser}) => {
  const [show, setShow] = useState(false);
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  // const [pic,setPic] = useState();    //used for setting up profile picz
  const [loading, setLoading] = useState(false); // State for loading indicator during registration
  const toast = useToast(); // Initialize useToast hook for Chakra UI notifications
  const navigate = useNavigate(); // Initialize useNavigate hook for programmatic navigation

  const handleClick = () => setShow(!show); //used to toggle show and hide password

  /*
   * Handles the form submission for user registration.
   * This function will:
   * 1. Set the loading state to true.
   * 2. Perform client-side validation for all fields and password matching.
   * 3. Make an asynchronous POST request to the backend registration API using axios.
   * 4. On success, show a success toast, save user info to localStorage, and navigate.
   * 5. On failure, show an error toast with the error message.
   * 6. Set the loading state back to false.
  */
  const handleSubmit = async () => {
    setLoading(true); // Start loading state

    // Client-side validation: Check if all required fields are filled
    if (!name || !email || !password || !confirmPassword) {
      toast({
        title: "Please Fill all the Fields",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false); // Stop loading if validation fails
      return;
    }

    // Client-side validation: Check if passwords match
    if (password !== confirmPassword) {
      toast({
        title: "Passwords Do Not Match",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false); // Stop loading if passwords don't match
      return;
    }

    try {
      // Configure request headers
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      // Make the POST request to your backend registration API using axios
      const { data } = await axios.post(
        "http://localhost:5000/api/user/register", // Your actual backend registration endpoint (e.g., /api/users or /api/register)
        { name, email, password }, // Request body with user registration data
        config // Configuration object with headers
      );

      // If the registration is successful
      toast({
        title: "Registration Successful",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });

      // Optionally, you might want to automatically log in the user after registration
      // and store their info. Or, you might redirect them to the login page.
      // For this example, we'll store info and redirect to app/welcome, similar to login.
      localStorage.setItem("userInfo", JSON.stringify(data));
      setUser(data);
      setLoading(false); // Stop loading
      navigate("/app/welcome"); // Navigate to the welcome page after successful registration
    } catch (error) {
      // Handle errors from the API call (e.g., email already exists)
      toast({
        title: "Error Occurred!",
        description: error.response?.data?.message || "Failed to Register", // Get error message from response or generic
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false); // Stop loading
    }
  };

  return (
    <VStack spacing={4}>
      <FormControl id="name" isRequired>
        <FormLabel>Name</FormLabel>
        <Input
          placeholder="Enter name"
          variant="filled"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
      </FormControl>
      <FormControl id="email" isRequired>
        <FormLabel>Email</FormLabel>
        <Input
          placeholder="Enter email"
          variant="filled"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          type="email"
        />
      </FormControl>
      <FormControl id="password" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input
            type={show ? "text" : "password"}
            placeholder="Enter password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <InputRightElement w="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <FormControl id="confirm-password" isRequired>
        <FormLabel>Confirm Password</FormLabel>
        <InputGroup>
          <Input
            type={show ? "text" : "password"}
            placeholder="Enter password again"
            onChange={(e) => setConfirmPassword(e.target.value)}
            value={confirmPassword}
          />
          <InputRightElement w="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <Button
        colorScheme="purple"
        variant="solid"
        w="50%"
        onClick={handleSubmit} // Attach the handleSubmit function to the button click
        isLoading={loading} // Chakra UI prop to show loading spinner and disable button
        loadingText="Signing Up..." // Text to show when loading
      >
        Sign In
      </Button>
    </VStack>
  );
};

export default Signup;
