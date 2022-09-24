import React, { useState } from 'react';
import { lightFormat, format } from 'date-fns';
import {
  Box,
  Heading,
  Stack,
  Icon,
  Text,
  Button,
  Flex,
  useColorModeValue,
} from '@chakra-ui/react';
import {
  FiMapPin,
  FiCalendar,
  FiClock,
  FiUsers,
  FiXCircle,
} from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import {
  getFeedbackAction,
  deleteFeedbackAction,
  createFeedbackAction,
} from '../feedbackActions';
import { participate, unparticipate } from '../postsSlice';

const EventContent = ({ post }) => {
  const [day, month] = format(new Date(post.eventDate), 'do LLL').split(' ');

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth.currentUser);

  const handleParticipation = async (e) => {
    try {
      setIsLoading(true);

      if (post.participated) {
        const res = await getFeedbackAction(post._id, {
          user: currentUser._id,
          feedbackType: 'Participate',
        });

        await deleteFeedbackAction(post._id, res.data[0]._id);
        dispatch(unparticipate(post._id));
      } else {
        await createFeedbackAction(post._id, {
          feedbackType: 'Participate',
        });
        dispatch(participate(post._id));
      }

      setIsLoading(false);
    } catch (e) {
      setError(e.response.data.message);
      setIsLoading(false);
    }
  };

  return (
    <Box px={4}>
      <Flex justify='space-between' align='center'>
        <Box>
          <Heading
            size='sm'
            mb={2}
            mt={4}
            textTransform='uppercase'
            letterSpacing='wide'
            color='green.500'
          >
            Event details
          </Heading>
          <Stack
            spacing={1}
            mb={4}
            color={useColorModeValue('gray.600', 'gray.300')}
            fontSize='sm'
          >
            <Stack direction='row' spacing={2} alignItems='center'>
              <Icon as={FiMapPin} />
              <Text>{post.eventAddress}</Text>
            </Stack>
            <Stack direction='row' spacing={2} alignItems='center'>
              <Icon as={FiCalendar} />
              <Text>{lightFormat(new Date(post.eventDate), 'yyyy-MM-dd')}</Text>
            </Stack>
            <Stack direction='row' spacing={2} alignItems='center'>
              <Icon as={FiClock} />
              <Text>{post.eventHour}</Text>
            </Stack>
            <Stack direction='row' spacing={2} alignItems='center'>
              <Icon as={FiUsers} />
              <Text>
                {post.participationsCount} People will participate in this event
              </Text>
            </Stack>
          </Stack>
        </Box>

        <Flex
          width={{ base: '5rem', md: '8rem' }}
          height={{ base: '8rem', md: '10rem' }}
          borderRadius={4}
          p={4}
          fontSize='3xl'
          fontWeight='thin'
          letterSpacing='wide'
          direction='column'
          justify='center'
          align='center'
          bgGradient='linear(to-br, green.300, green.600)'
        >
          <Text>{day}</Text>
          <Text>{month}</Text>
        </Flex>
      </Flex>

      <Button
        leftIcon={<Icon as={post.participated ? FiXCircle : FiCalendar} />}
        colorScheme='green'
        onClick={handleParticipation}
        isLoading={isLoading}
      >
        {post.participated ? 'Cancel Participation' : 'Participate'}
      </Button>
    </Box>
  );
};

export default EventContent;
