import React from 'react';
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
import planet from '../../../assets/images/planet.png';
import styles from './LoginForm.module.css';

const LoginForm = () => {
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
          <Input placeholder='email' type='email' variant='filled' />
        </FormControl>
        <FormControl>
          <FormLabel>Password</FormLabel>
          <Input placeholder='password' type='password' variant='filled' />
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
        <Button colorScheme='green'>Sign In</Button>
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
      </Stack>
    </Flex>
  );
};

export default LoginForm;
