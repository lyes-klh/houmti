import React from 'react';
import { Box, Avatar, Stack, Heading, Text } from '@chakra-ui/react';

const PostHeader = () => {
  return (
    <Stack direction='row' spacing={2} mb={3} px={4}>
      <Avatar size='md' name='Kent Dodds' src='https://bit.ly/kent-c-dodds' />
      <Stack direction='column' spacing={0} justifyContent='center'>
        <Heading size='sm' letterSpacing='wide'>
          Kent Dodds
        </Heading>
        <Text color='gray.400' fontSize='xs' lineHeight='short'>
          17h
        </Text>
      </Stack>
    </Stack>
  );
};

export default PostHeader;
