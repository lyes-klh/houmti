import React, { useState } from 'react';
import {
  Stack,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Button,
  Image,
  Text,
  Heading,
  useColorModeValue,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import Error from '../../../components/ui/Error';
import planet from '../../../assets/images/planet.png';
import styles from './LoginForm.module.css';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../authSlice';
import { loginAction } from '../authActions';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loginHandler = async () => {
    try {
      setIsLoading(true);
      const res = await loginAction(email, password);
      dispatch(login(res.data.user));
      localStorage.setItem('currentUser', JSON.stringify(res.data.user));
      setIsLoading(false);
      navigate('/');
    } catch (e) {
      setError(e.response.data);
      setIsLoading(false);
    }
  };
  return (
    <Flex direction='column' align='center'>
      <Image w='200px' src={planet} className={styles.floating} />
      <Stack
        direction='column'
        position='relative'
        top='-50px'
        spacing={4}
        mt={4}
        px={2}
        w='20rem'
      >
        <Heading
          textAlign='center'
          color={useColorModeValue('green.500', 'green.300')}
        >
          Sign in
        </Heading>

        <FormControl>
          <FormLabel>Email</FormLabel>
          <Input
            placeholder='email'
            type='email'
            variant='filled'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Password</FormLabel>
          <Input
            placeholder='password'
            type='password'
            variant='filled'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormControl>
        <Button
          variant='link'
          alignSelf='start'
          color={useColorModeValue('gray.600', 'gray.400')}
          fontSize='sm'
          fontWeight='light'
        >
          Forgot password ?
        </Button>
        <Button
          colorScheme='green'
          onClick={loginHandler}
          isLoading={isLoading}
        >
          Sign In
        </Button>
        <Text fontSize='sm'>
          Your don't have an account ?{' '}
          <Link to='/signup'>
            <Button
              variant='link'
              alignSelf='start'
              size='sm'
              colorScheme='green'
            >
              Sign up
            </Button>
          </Link>
        </Text>
        {error && <Error message={error.message} />}
      </Stack>
    </Flex>
  );
};

export default LoginForm;
