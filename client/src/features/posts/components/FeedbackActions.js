import React from 'react';
import { Box, Button, Stack, Icon } from '@chakra-ui/react';
import { BiLike, BiComment } from 'react-icons/bi';
import { FiThumbsUp, FiMessageSquare } from 'react-icons/fi';

const FeedbackActions = ({ openComment }) => {
  const handleComment = () => openComment((prev) => !prev);
  return (
    <Stack direction='row' mt={2}>
      <Button
        w='50%'
        variant='ghost'
        color='gray.500'
        size='sm'
        leftIcon={<Icon as={FiThumbsUp} fontSize='xl' />}
      >
        Like
      </Button>
      <Button
        w='50%'
        variant='ghost'
        color='gray.500'
        size='sm'
        onClick={handleComment}
        leftIcon={
          <Icon
            as={FiMessageSquare}
            fontSize='xl'
            position='relative'
            top={0.5}
          />
        }
      >
        Comment
      </Button>
    </Stack>
  );
};

export default FeedbackActions;
