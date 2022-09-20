import React from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Button,
  Text,
  Icon,
  Heading,
  Flex,
  Avatar,
  useColorModeValue,
} from '@chakra-ui/react';
import { FiMapPin, FiEdit } from 'react-icons/fi';
import { useSelector, useDispatch } from 'react-redux';

const ProfileCard = () => {
  const currentUser = useSelector((state) => state.auth.currentUser);
  return (
    <Flex
      // justify='center'
      align='center'
      direction='column'
      width={{ base: '100%', sm: '35rem', md: '45rem', lg: '50rem' }}
      mb={16}
      borderRadius={8}
      overflow='hidden'
      bg={useColorModeValue('white', 'gray.900')}
      w='full'
      h='21rem'
      boxShadow='lg'
      p={4}
    >
      <Avatar
        size='2xl'
        name={currentUser.firstname + ' ' + currentUser.lastname}
        src={process.env.REACT_APP_BACKEND + '/img/users/' + currentUser.avatar}
      ></Avatar>
      <Heading size='lg' mt={2}>
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
      {/* <Flex mt={6} gap={8}>
        <Text>31 Posts</Text>
        <Text>20 Followers</Text>
      </Flex> */}
      <Link to='/settings'>
        <Button colorScheme='green' mt={6} leftIcon={<Icon as={FiEdit} />}>
          Edit Profile
        </Button>
      </Link>
    </Flex>
  );
};

export default ProfileCard;
