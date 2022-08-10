import React from 'react';
import {
  Box,
  Divider,
  Stack,
  Avatar,
  AvatarBadge,
  Input,
} from '@chakra-ui/react';

import avatar from '../../assets/images/avatar.jpg';

const CommentForm = () => {
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
        <Avatar name='avatar' size='sm' src={avatar}>
          <AvatarBadge boxSize='1.25em' bg='green.500' />
        </Avatar>
        <Input
          variant='filled'
          borderRadius='3xl'
          placeholder='Write a comment...'
        ></Input>
      </Stack>
    </Box>
  );
};

export default CommentForm;
