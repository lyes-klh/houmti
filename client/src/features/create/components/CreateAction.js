import React from 'react';
import {
  Flex,
  Box,
  Avatar,
  AvatarBadge,
  useColorModeValue,
  Text,
} from '@chakra-ui/react';
import avatar from '../../../assets/images/avatar.jpg';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const CreateAction = ({ onOpen, userId }) => {
  const currentUser = useSelector((state) => state.auth.currentUser);
  return (
    <Flex gap={4} justify='center' align='center'>
      <Link to={`/profile/${userId}`}>
        <Avatar
          name={currentUser.firstname + ' ' + currentUser.lastname}
          size='sm'
          src={
            process.env.REACT_APP_BACKEND + '/img/users/' + currentUser.avatar
          }
        >
          <AvatarBadge boxSize='1.25em' bg='green.500' />
        </Avatar>
      </Link>

      <Box
        borderRadius={24}
        bg={useColorModeValue('gray.200', 'gray.700')}
        w='full'
        py={2}
        px={4}
        cursor='pointer'
        transitionProperty='common'
        transitionDuration='fast'
        onClick={onOpen}
        _hover={{ bg: useColorModeValue('gray.300', 'gray.600') }}
      >
        <Text color={useColorModeValue('gray.600', 'gray.400')} fontSize='sm'>
          Write something...
        </Text>
      </Box>
    </Flex>
  );
};

export default CreateAction;
