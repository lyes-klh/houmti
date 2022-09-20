import React from 'react';
import {
  Box,
  Divider,
  Stack,
  Avatar,
  AvatarBadge,
  Input,
} from '@chakra-ui/react';
import { useSelector } from 'react-redux';

const CommentForm = () => {
  const currentUser = useSelector((state) => state.auth.currentUser);

  return (
    <Box my={2}>
      <Divider />
      <Stack
        direction='row'
        pt={4}
        mx={3}
        justifyContent='center'
        alignItems='center'
        spacing={4}
      >
        <Avatar
          size='sm'
          name={currentUser.firstname + ' ' + currentUser.lastname}
          src={
            process.env.REACT_APP_BACKEND + '/img/users/' + currentUser.avatar
          }
        >
          <AvatarBadge boxSize='1.25em' bg='green.500' />
        </Avatar>
        <Input
          variant='filled'
          focusBorderColor='green.600'
          borderRadius='3xl'
          placeholder='Write a comment...'
        ></Input>
      </Stack>
    </Box>
  );
};

export default CommentForm;
