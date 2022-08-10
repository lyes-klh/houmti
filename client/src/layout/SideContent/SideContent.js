import React from 'react';
import { Flex, Box } from '@chakra-ui/react';

const SideContent = () => {
  return (
    <Flex direction='column' mt={24} ml={8}>
      <Box borderRadius={4} bg='green.800' w='20rem' height='5rem'></Box>
      <Box borderRadius={4} mt={6} bg='green.800' w='20rem' height='5rem'></Box>
      <Box borderRadius={4} mt={6} bg='green.800' w='20rem' height='5rem'></Box>
    </Flex>
  );
};

export default SideContent;
