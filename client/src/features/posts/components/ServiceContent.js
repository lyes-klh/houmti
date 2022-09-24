import React, { useState } from 'react';
import {
  Box,
  Heading,
  Stack,
  Icon,
  Text,
  Button,
  useColorModeValue,
} from '@chakra-ui/react';
import { FiUsers, FiPhone, FiBriefcase, FiXCircle } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import {
  getFeedbackAction,
  deleteFeedbackAction,
  createFeedbackAction,
} from '../feedbackActions';
import { demandService, undemandService } from '../postsSlice';

const ServiceContent = ({ post }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth.currentUser);

  const handleDemand = async (e) => {
    try {
      setIsLoading(true);

      if (post.demanded) {
        const res = await getFeedbackAction(post._id, {
          user: currentUser._id,
          feedbackType: 'Demand',
        });

        await deleteFeedbackAction(post._id, res.data[0]._id);
        dispatch(undemandService(post._id));
      } else {
        await createFeedbackAction(post._id, {
          feedbackType: 'Demand',
        });
        dispatch(demandService(post._id));
      }

      setIsLoading(false);
    } catch (e) {
      setError(e.response.data.message);
      setIsLoading(false);
    }
  };
  return (
    <Box px={4}>
      <Heading
        size='sm'
        mb={2}
        mt={8}
        textTransform='uppercase'
        color='green.500'
      >
        Contact me
      </Heading>
      <Stack
        spacing={1}
        mb={4}
        color={useColorModeValue('gray.600', 'gray.300')}
        fontSize='sm'
      >
        <Stack direction='row' spacing={2} alignItems='center'>
          <Icon as={FiPhone} />
          <Text>{post.servicePhoneNumber}</Text>
        </Stack>
        <Stack direction='row' spacing={2} alignItems='center'>
          <Icon as={FiUsers} />
          <Text>{post.demandsCount} People demanded this service</Text>
        </Stack>
      </Stack>
      <Button
        leftIcon={<Icon as={post.demanded ? FiXCircle : FiBriefcase} />}
        colorScheme='green'
        onClick={handleDemand}
        isLoading={isLoading}
      >
        {post.demanded ? 'Cancel Demand' : 'Demand service'}
      </Button>
    </Box>
  );
};

export default ServiceContent;
