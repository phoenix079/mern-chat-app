import React,{useState} from "react"
import {Stack,HStack,VStack,Input,InputGroup,InputRightElement,Button,
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    useStatStyles,
} from "@chakra-ui/react"

const Signup = () => {
    const [show, setShow] = useState(false);
    const [name,setName] = useState();
    const [email,setEmail] = useState();
    const [password,setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState()
    const [pic,setPic] = useState();

    const handleClick = () => setShow(!show)

    return(  
        <VStack>
            <FormControl id="name" isRequired>
                <FormLabel>Name</FormLabel>
                <Input placeholder="Enter name" variant="filled"
                onChange={(e)=>setName(e.target.value)}/>
            </FormControl>
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
            <FormControl id="password" isRequired>
                <FormLabel>Confirm Password</FormLabel>
                <InputGroup>
                <Input type={show ? "text" : "password"} placeholder="Enter password again"
                    onChange={(e)=>setConfirmPassword(e.target.value)}/>
                    <InputRightElement w='4.5rem'>
                        <Button h='1.75rem' size='sm' onClick={handleClick}>
                            {show ? 'Hide' : 'Show'}
                        </Button>
                    </InputRightElement>
                </InputGroup>
            </FormControl>
            <Button colorScheme='purple' variant='solid' w="50%">
                Sign In
            </Button>
        </VStack>
    );
}

export default Signup