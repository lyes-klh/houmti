import React from 'react';
import { Box, Container } from '@chakra-ui/react';

const Home = () => {
  return (
    <Box
      as='main'
      mt={24}
      width={{ base: '100%', sm: '30rem', md: '35rem', lg: '40rem' }}
      minH='100vh'
      bg='gray.900'
      borderRadius={4}
    >
      <p>HOME</p>
    </Box>
  );
};

export default Home;
