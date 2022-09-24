import React from 'react';
import { formatRelative } from 'date-fns';
import {
  Avatar,
  Stack,
  Heading,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const PostHeader = ({ creator, createdAt, city, neighborhood, id }) => {
  return (
    <Stack direction='row' spacing={2} mb={3} px={4}>
      <Link to={`/profile/${creator._id}`}>
        <Avatar
          size='md'
          name={`${creator.firstname} ${creator.lastname}`}
          src={process.env.REACT_APP_BACKEND + '/img/users/' + creator.avatar}
        />
      </Link>

      <Stack direction='column' spacing={0} justifyContent='center'>
        <Heading size='sm' letterSpacing='wide'>
          <Link
            to={`/profile/${creator._id}`}
          >{`${creator.firstname} ${creator.lastname}`}</Link>
        </Heading>
        <Link to={`/posts/${id}`}>
          <Text
            color={useColorModeValue('gray.600', 'gray.400')}
            fontSize='xs'
            lineHeight='short'
          >
            {formatRelative(new Date(createdAt), new Date())} &bull; {city}{' '}
            &bull; {neighborhood}
          </Text>
        </Link>
      </Stack>
    </Stack>
  );
};

export default PostHeader;
