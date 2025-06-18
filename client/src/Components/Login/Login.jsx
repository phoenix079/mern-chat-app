import React,{useState} from "react"
import {Stack,HStack,VStack,Input,InputGroup,InputRightElement,Button,
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    useStatStyles,
} from "@chakra-ui/react"

const Login = () => {
    const [show, setShow] = useState(false);
    const [email,setEmail] = useState();
    const [password,setPassword] = useState();

    const handleClick = () => setShow(!show)

  return (
    <VStack>
      <FormControl id="email" isRequired>
          <FormLabel>Email</FormLabel>
          <Input placeholder="Enter email" variant="filled"
          onChange={(e)=>setEmail(e.target.value)}/>
      </FormControl>
      <FormControl id="password" isRequired>
          <FormLabel>Password</FormLabel>
          <InputGroup>
          <Input type={show ? "text" : "password"} placeholder="Enter password"
              onChange={(e)=>setPassword(e.target.value)}/>
              <InputRightElement w='4.5rem'>
                  <Button h='1.75rem' size='sm' onClick={handleClick}>
                      {show ? 'Hide' : 'Show'}
                  </Button>
              </InputRightElement>
          </InputGroup>
      </FormControl>
      <Button colorScheme='purple' variant='solid' w="50%" >
          Login
      </Button>
      <Button colorScheme='red' variant='solid' w="50%" >
          Forgot Password?
      </Button>
    </VStack>
  );
}

export default Login