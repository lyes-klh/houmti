import React from 'react';
import { Button, Stack, Icon, useColorModeValue } from '@chakra-ui/react';
import { FiThumbsUp, FiMessageSquare } from 'react-icons/fi';

const FeedbackActions = ({ openComment }) => {
  const handleComment = () => openComment((prev) => !prev);
  return (
    <Stack direction='row' mt={2}>
      <Button
        w='50%'
        variant='ghost'
        color={useColorModeValue('gray.600', 'gray.500')}
        size='sm'
        leftIcon={<Icon as={FiThumbsUp} fontSize='xl' rotate={1} />}
      >
        Like
      </Button>
      <Button
        w='50%'
        variant='ghost'
        color={useColorModeValue('gray.600', 'gray.500')}
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
