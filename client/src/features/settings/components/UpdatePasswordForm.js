import React, { useState } from 'react';
import Error from '../../../components/ui/Error';
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  SimpleGrid,
  Button,
  Icon,
} from '@chakra-ui/react';
import { FiEdit } from 'react-icons/fi';
import { useSelector } from 'react-redux';
import { updatePassword } from '../settingsActions';
import { useDispatch } from 'react-redux';
import { login } from '../../authentication/authSlice';
import { useNavigate } from 'react-router-dom';

const UpdatePasswordForm = () => {
  const currentUser = useSelector((state) => state.auth.currentUser);
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleUpdate = async (e) => {
    try {
      setIsLoading(true);
      const res = await updatePassword({
        password,
        newPassword,
      });

      dispatch(login(res.data.user));
      localStorage.setItem('currentUser', JSON.stringify(res.data.user));
      setIsLoading(false);
      navigate(`/`);
    } catch (e) {
      setError(e.response.data.message);
      setIsLoading(false);
    }
  };

  return (
    <Box
      ml={8}
      mt={6}
      display='flex'
      alignItems='center'
      justifyContent='center'
      flexDirection='column'
    >
      <SimpleGrid mb={8} columns={2} spacingX={8} spacingY={4}>
        <FormControl>
          <FormLabel>Password</FormLabel>
          <Input
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormControl>
        <FormControl>
          <FormLabel>New Password</FormLabel>
          <Input
            type='password'
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </FormControl>
      </SimpleGrid>
      <Button
        leftIcon={<Icon as={FiEdit} />}
        colorScheme='green'
        w={32}
        onClick={handleUpdate}
        isLoading={isLoading}
        mb={4}
      >
        Update
      </Button>
      {error && <Error message={error} />}
    </Box>
  );
};

export default UpdatePasswordForm;
