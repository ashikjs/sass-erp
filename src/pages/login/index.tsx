import React, {useState} from 'react';
import {
  Box,
  Button,
  Container,
  FormControl,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Stack
} from "@chakra-ui/react";
import {useRouter} from "next/router";
import Cookies from 'js-cookie';
import jwt_decode from "jwt-decode";

// @Services
import {LocalStorageService} from "src/app/utiles/localStorageService";


const Login = () => {
  console.log(process.env.API_ENDPOINT)
  // const apiEndpoint: string = 'https://smb-erp-api.mdashikjs.com/api/auth/login'
  const apiEndpoint: string = 'http://localhost:3000/api/auth/login'

  const router = useRouter();

  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [show, setShow] = React.useState(false)
  const handleClick = () => setShow(!show)

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      username: userName,
      password: password,
    }

    try {
      const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        const responseData = await response.json();
        // console.log('access_token::', responseData.access_token)
        const decodedToken = jwt_decode(responseData.access_token);
        const expireDate: number = (decodedToken.exp - decodedToken.iat)/(60*60*24)
        Cookies.set('authToken', responseData.access_token, { expires: expireDate }); // Expires in 7 days
        LocalStorageService.setItem('user', decodedToken);
        router.push('/');
        setLoading(false);
      } else {
        console.log(response)
        setLoading(false);
        setError('Invalid credentials');
      }
    } catch (error: any) {
      setLoading(false);
      console.log(error)
      setError(error?.message);
    }
  };

  return (
    <>
      <Container maxW='2xl' minHeight="100vh" centerContent justifyContent="center">
        <Box padding='8' borderRadius="5" bg='gray.300' color='black' maxW='lg' width='100%'>
          <Stack spacing={4}>
            <Heading as='h3' size='lg'
                     paddingBottom="16px"
                     style={{
                       textAlign: "center",
                     }}
            >
              Login
            </Heading>
            <FormControl isRequired>
              <Input type='text' size='lg'
                     bg='white'
                     placeholder='User name'
                     value={userName}
                     onChange={(e) => setUserName(e.target.value)}/>
            </FormControl>
            <InputGroup size='lg'>
              <Input
                pr='4.5rem'
                bg='white'
                type={show ? 'text' : 'password'}
                placeholder='Enter password'
                value={password} onChange={(e) => setPassword(e.target.value)}
              />
              <InputRightElement width='4.5rem'>
                <Button size='sm' onClick={handleClick}>
                  {show ? 'Hide' : 'Show'}
                </Button>
              </InputRightElement>
            </InputGroup>
            <Button colorScheme='blue' size='lg'
                    isLoading={loading}
                    loadingText="Logging in..."
                    isDisabled={!password || !userName}
                    onClick={handleSubmit}>Login</Button>
          </Stack>
        </Box>
      </Container>

    </>
  );
};


export default Login;
