import React from 'react';
import { Flex, Text, useColorModeValue } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const FeedbackRecap = ({ likesCount, commentsCount, id }) => {
  return (
    <Flex
      justify='space-between'
      align='center'
      my={2}
      fontSize='sm'
      letterSpacing='wider'
    >
      <Text color={useColorModeValue('gray.600', 'gray.400')} ml={1}>
        <Link to={`/posts/${id}`}>{likesCount} Likes</Link>
      </Text>

      <Text color={useColorModeValue('gray.600', 'gray.400')} ml={1}>
        <Link to={`/posts/${id}`}>{commentsCount} Comments</Link>
      </Text>
    </Flex>
  );
};

export default FeedbackRecap;
