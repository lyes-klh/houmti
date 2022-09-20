import React from 'react';
import {
  Flex,
  Stack,
  Box,
  Icon,
  Avatar,
  Heading,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { FiMapPin } from 'react-icons/fi';
import image from '../../assets/images/avatar.jpg';
import { useSelector } from 'react-redux';

const SideContent = () => {
  const currentUser = useSelector((state) => state.auth.currentUser);
  return (
    <Flex
      direction='column'
      ml={{ base: 6, lg: 16 }}
      // position='absolute'
      // top={0}
      // left='70%'
    >
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
        <Avatar
          name={currentUser.firstname + ' ' + currentUser.lastname}
          src={
            process.env.REACT_APP_BACKEND + '/img/users/' + currentUser.avatar
          }
        />
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
            {currentUser.firstname + ' ' + currentUser.lastname}
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
            {currentUser.city.cityName} &bull;{' '}
            {currentUser.neighborhood.neighborhoodName}
          </Text>
        </Stack>
      </Stack>
    </Flex>
  );
};

export default SideContent;
