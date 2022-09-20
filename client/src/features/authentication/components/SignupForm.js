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
import rocket from '../../../assets/images/rocket.png';
import styles from './LoginForm.module.css';

const LoginForm = () => {
  return (
    <Flex direction='column' align='center' justify='start'>
      <Image w='200px' src={rocket} className={styles.floating} />
      <Stack
        direction='column'
        position='relative'
        top='-25px'
        spacing={4}
        my={2}
        px={2}
        w='20rem'
      >
        <Heading
          textAlign='center'
          color={useColorModeValue('green.500', 'green.300')}
        >
          Sign up
        </Heading>

        <FormControl>
          <FormLabel>Firstname</FormLabel>
          <Input placeholder='firstname' variant='filled' />
        </FormControl>
        <FormControl>
          <FormLabel>Lastname</FormLabel>
          <Input placeholder='lastname' variant='filled' />
        </FormControl>
        <FormControl>
          <FormLabel>Email</FormLabel>
          <Input placeholder='email' type='email' variant='filled' />
        </FormControl>
        <FormControl>
          <FormLabel>Password</FormLabel>
          <Input placeholder='password' type='password' variant='filled' />
        </FormControl>
        <FormControl>
          <FormLabel>Confirm password</FormLabel>
          <Input
            placeholder='confirm password'
            type='password'
            variant='filled'
          />
        </FormControl>
        <FormControl>
          <FormLabel>City</FormLabel>
          <Input placeholder='Your city ?' variant='filled' />
        </FormControl>
        <FormControl>
          <FormLabel>Neighborhood</FormLabel>
          <Input placeholder='Your neighborhood ?' variant='filled' />
        </FormControl>

        <Button colorScheme='green'>Sign up</Button>
        <Text fontSize='sm'>
          Your already have an account ?{' '}
          <Link to='/login'>
            <Button
              variant='link'
              alignSelf='start'
              size='sm'
              colorScheme='green'
            >
              Sign in
            </Button>
          </Link>
        </Text>
      </Stack>
    </Flex>
  );
};

export default LoginForm;
