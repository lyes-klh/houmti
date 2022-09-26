import React, { useState, useEffect, useRef } from 'react';
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
import { getUserInfo } from '../profileActions';
import { getUserProfile } from '../profilesSlice';
import ProfileCardSkeleton from '../components/ProfileCardSkeleton';

const ProfileCard = ({ userId }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const dispatch = useDispatch();

  const currentUser = useSelector((state) => state.auth.currentUser);
  const user = useSelector((state) => state.profiles.userProfile);

  // const user = useRef(currentUser);

  const bgColor = useColorModeValue('white', 'gray.900');
  const color = useColorModeValue('gray.600', 'gray.400');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setIsLoading(true);
        const res = await getUserInfo(userId);
        dispatch(getUserProfile(res.data.user));
        setIsLoading(false);
      } catch (e) {
        setError(e.response.data.message);
        setIsLoading(false);
      }
    };

    fetchUser();
  }, [dispatch, userId]);

  return isLoading ? (
    <ProfileCardSkeleton />
  ) : (
    <Flex
      // justify='center'
      align='center'
      justify='center'
      direction='column'
      width={{ base: '100%', sm: '35rem', md: '45rem', lg: '50rem' }}
      mb={16}
      borderRadius={8}
      overflow='hidden'
      bg={bgColor}
      w='full'
      h='21rem'
      boxShadow='lg'
      p={4}
    >
      <Avatar
        size='2xl'
        name={user.firstname + ' ' + user.lastname}
        src={process.env.REACT_APP_BACKEND + '/img/users/' + user.avatar}
      ></Avatar>
      <Heading size='lg' mt={2}>
        {user.firstname + ' ' + user.lastname}
      </Heading>
      <Text
        color={color}
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
        {user.city.cityName} &bull; {user.neighborhood.neighborhoodName}
      </Text>
      <Flex mt={6} gap={8}>
        <Text>{user.postsCount} Posts</Text>
      </Flex>
      {currentUser._id === user._id && (
        <Link to='/settings'>
          <Button colorScheme='green' mt={6} leftIcon={<Icon as={FiEdit} />}>
            Edit Profile
          </Button>
        </Link>
      )}
    </Flex>
  );
};

export default ProfileCard;
