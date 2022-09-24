import React from 'react';
import { Box, Icon, Text } from '@chakra-ui/react';
import { FiXCircle } from 'react-icons/fi';

const Error = ({ message }) => {
  return (
    <Box
      display='flex'
      justifyContent='center'
      alignItems='center'
      color='red.800'
      backgroundColor='red.100'
      p={2}
      borderRadius='md'
      fontWeight='bold'
      position='fixed'
      left={4}
      buttom={4}
    >
      <Icon as={FiXCircle} fontSize='xl' mr={2} />
      <Text>{message}</Text>
    </Box>
  );
};

export default Error;
