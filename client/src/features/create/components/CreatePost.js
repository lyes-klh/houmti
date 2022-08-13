import React from 'react';
import { Box, useColorModeValue, useDisclosure } from '@chakra-ui/react';
import CreateAction from './CreateAction';
import CreateModal from './CreateModal';

const CreatePost = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box
      p={4}
      bg={useColorModeValue('white', 'gray.900')}
      borderRadius={4}
      mb={8}
      boxShadow='lg'
    >
      <CreateAction onOpen={onOpen} />
      <CreateModal isOpen={isOpen} onClose={onClose} />
    </Box>
  );
};

export default CreatePost;
