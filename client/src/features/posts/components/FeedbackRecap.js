import React from 'react';
import { Flex, Text } from '@chakra-ui/react';

const FeedbackRecap = ({ likes, comments }) => {
  return (
    <Flex
      justify='space-between'
      align='center'
      my={2}
      fontSize='sm'
      letterSpacing='wider'
    >
      <Text color='gray.400' ml={1}>
        {likes} Likes
      </Text>

      <Text color='gray.400' ml={1}>
        {comments} Comments
      </Text>
    </Flex>
  );
};

export default FeedbackRecap;
