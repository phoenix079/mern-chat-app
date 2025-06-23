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
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const handleClick = () => setShow(!show);
  const [loading, setLoading] = useState(false); // State for loading indicator
  const toast = useToast(); // Initialize useToast hook for Chakra UI notifications
  const navigate = useNavigate(); // Initialize useNavigate hook for programmatic navigation

  const handleSubmit = async () => {
    setLoading(true); // Start loading state

    // Basic input validation
    if (!email || !password) {
      toast({
        title: "Please Fill all the Fields",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom", // Toast notification position
      });
      setLoading(false); // Stop loading if validation fails
      return;
    }

    try {
      // Make the POST request to your backend login API using axios
      const config = {
        headers: {
          "Content-Type": "application/json", // Specify content type
        },
      };
      const { data } = await axios.post(
        "/api/user/login", // Your actual backend login endpoint
        { email, password }, // Request body with email and password
        config // Configuration object with headers
      );

      // If the request is successful (axios throws an error for non-2xx responses)
      toast({
        title: "Login Successful",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });

      // Save user information (e.g., token, user details) to local storage
      // This userInfo will likely be used for authentication in subsequent requests
      localStorage.setItem("userInfo", JSON.stringify(data));

      setLoading(false); // Stop loading
      navigate("/app/welcome"); // Navigate to the welcome page inside the app
    } catch (error) {
      // Handle errors from the API call
      toast({
        title: "Error Occurred!",
        description: error.response?.data?.message || error.message, // Get error message from response or generic
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
      <FormControl id="email" isRequired>
        <FormLabel>Email</FormLabel>
        <Input
          placeholder="Enter email"
          variant="filled"
          onChange={(e) => setEmail(e.target.value)}
          value={email} // Controlled component for email input
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
      <Button
        colorScheme="purple" // Chakra UI color scheme
        variant="solid" // Chakra UI button variant
        w="50%" // Width of the button
        onClick={handleSubmit} // Attach the handleSubmit function to the button click
        isLoading={loading} // Chakra UI prop to show loading spinner and disable button
        loadingText="Logging in..."  //text to show when logging
      >
        Login
      </Button>
      <Button colorScheme="red" variant="solid" w="50%">
        Forgot Password?
      </Button>
    </VStack>
  );
};

export default Login;
