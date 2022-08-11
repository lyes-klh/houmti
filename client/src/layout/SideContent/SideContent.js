import React from 'react';
import {
  Flex,
  Stack,
  Box,
  Avatar,
  Heading,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { Icon } from '@chakra-ui/react';
import { FiMapPin } from 'react-icons/fi';
import image from '../../assets/images/avatar.jpg';

const SideContent = () => {
  return (
    <Flex direction='column' mt={24} ml={{ base: 6, lg: 16 }}>
      <Stack
        borderRadius={4}
        w={{ base: '12rem', lg: '18rem' }}
        height='fit'
        py={4}
        px={3}
        bg={useColorModeValue('white', 'gray.900')}
        direction={{ base: 'column', lg: 'row' }}
        spacing={2}
        alignItems='center'
      >
        <Avatar name='Avatar' src={image} />
        <Stack
          direction='column'
          spacing={1}
          alignItems={{ base: 'center', lg: 'start' }}
        >
          <Heading
            size='sm'
            letterSpacing='wide'
            textAlign={{ base: 'center', lg: 'left' }}
          >
            {`Lyes Kellouche`}
          </Heading>
          <Text
            color={useColorModeValue('gray.600', 'gray.400')}
            fontSize='xs'
            lineHeight='short'
            textAlign={{ base: 'center', lg: 'left' }}
          >
            <Icon
              as={FiMapPin}
              fontSize='sm'
              mr={1}
              position='relative'
              top='3px'
            />
            Baghlia &bull; Colonel Amirouche
          </Text>
        </Stack>
      </Stack>
    </Flex>
  );
};

export default SideContent;
