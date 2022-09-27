import React from 'react';
import {
  Grid,
  GridItem,
  Avatar,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const Notification = ({ content, image, postId, userId }) => {
  return (
    <>
      <Grid
        minH={12}
        templateColumns='repeat(6, 1fr)'
        bg={useColorModeValue('white', 'gray.900')}
        _hover={{
          bg: useColorModeValue('gray.200', 'gray.700'),
        }}
        borderRadius='md'
        p={3}
        justifyContent='center'
        alignItems='center'
      >
        <Link to={`/profile/${userId}`}>
          <Avatar
            size='sm'
            name='avatar'
            mr={2}
            src={process.env.REACT_APP_BACKEND + '/img/users/' + image}
          />
        </Link>

        <GridItem colSpan={5}>
          <Link to={`/posts/${postId}`}>
            <Text fontSize='sm' noOfLines={2}>
              {content}
            </Text>
          </Link>
        </GridItem>
      </Grid>
    </>
  );
};

export default Notification;
