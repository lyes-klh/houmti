import React from 'react';
import { Flex, Text, useColorModeValue } from '@chakra-ui/react';

const FeedbackRecap = ({ likesCount, commentsCount }) => {
  return (
    <Flex
      justify='space-between'
      align='center'
      my={2}
      fontSize='sm'
      letterSpacing='wider'
    >
      <Text color={useColorModeValue('gray.600', 'gray.400')} ml={1}>
        {likesCount} Likes
      </Text>

      <Text color={useColorModeValue('gray.600', 'gray.400')} ml={1}>
        {commentsCount} Comments
      </Text>
    </Flex>
  );
};

export default FeedbackRecap;
