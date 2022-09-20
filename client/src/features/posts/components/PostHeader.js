import React from 'react';
import { formatRelative } from 'date-fns';
import {
  Avatar,
  Stack,
  Heading,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';

const PostHeader = ({ creator, createdAt, city, neighborhood }) => {
  return (
    <Stack direction='row' spacing={2} mb={3} px={4}>
      <Avatar
        size='md'
        name={`${creator.firstname} ${creator.lastname}`}
        src={process.env.REACT_APP_BACKEND + '/img/users/' + creator.avatar}
      />
      <Stack direction='column' spacing={0} justifyContent='center'>
        <Heading size='sm' letterSpacing='wide'>
          {`${creator.firstname} ${creator.lastname}`}
        </Heading>
        <Text
          color={useColorModeValue('gray.600', 'gray.400')}
          fontSize='xs'
          lineHeight='short'
        >
          {formatRelative(new Date(createdAt), new Date())} &bull; {city} &bull;{' '}
          {neighborhood}
        </Text>
      </Stack>
    </Stack>
  );
};

export default PostHeader;
