import React, {useState} from 'react';
import {Form} from "@chakra-ui/theme/dist/components";
import {
  Button,
  ChakraProvider,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  InputGroup, InputRightElement,
  Stack
} from "@chakra-ui/react";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [show, setShow] = React.useState(false)
  const handleClick = () => setShow(!show)

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (response.status === 200) {
        setLoading(false);
        window.location.href = '/';
      } else {
        setLoading(false);
        setError('Invalid credentials');
      }
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  return (
    <>
      <Stack spacing={4}>
        <FormControl isRequired>
          <FormLabel>User name</FormLabel>
          <Input type='text'/>
        </FormControl>
        <InputGroup size='md'>
          <Input
            pr='4.5rem'
            type={show ? 'text' : 'password'}
            placeholder='Enter password'
          />
          <InputRightElement width='4.5rem'>
            <Button h='1.75rem' size='sm' onClick={handleClick}>
              {show ? 'Hide' : 'Show'}
            </Button>
          </InputRightElement>
        </InputGroup>
        <Button colorScheme='blue' onClick={handleSubmit}>Button</Button>
      </Stack>
    </>
  );
};

export default Login;
