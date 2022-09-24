import React, { useState } from 'react';
import {
  Box,
  Stack,
  Icon,
  Text,
  Button,
  useColorModeValue,
} from '@chakra-ui/react';
import { FiUsers, FiBarChart2, FiXCircle } from 'react-icons/fi';
import PollOptions from './PollOptions';
import { useDispatch, useSelector } from 'react-redux';
import {
  getFeedbackAction,
  deleteFeedbackAction,
  createFeedbackAction,
} from '../feedbackActions';
import { vote, unvote } from '../postsSlice';

const PollContent = ({ post }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [votedOption, setvotedOption] = useState(post.votedOption);

  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth.currentUser);

  const handleVote = async () => {
    try {
      setIsLoading(true);

      if (post.voted) {
        const res = await getFeedbackAction(post._id, {
          user: currentUser._id,
          feedbackType: 'Vote',
        });

        await deleteFeedbackAction(post._id, res.data[0]._id);
        dispatch(unvote(post._id));
        setvotedOption('');
      } else {
        if (!votedOption) {
          setIsLoading(false);
          return;
        }
        await createFeedbackAction(post._id, {
          feedbackType: 'Vote',
          voteOption: votedOption,
        });
        dispatch(vote({ id: post._id, votedOption }));
      }

      setIsLoading(false);
    } catch (e) {
      setError(e.response.data.message);
      setIsLoading(false);
    }
  };

  return (
    <Box px={4}>
      <PollOptions
        pollOptions={post.pollOptions}
        votedOption={votedOption}
        vote={setvotedOption}
        totalVotesCount={post.totalVotesCount}
      />

      <Stack
        direction='row'
        spacing={2}
        alignItems='center'
        mt={2}
        mb={4}
        color={useColorModeValue('gray.600', 'gray.300')}
        fontSize='sm'
      >
        <Icon as={FiUsers} />
        <Text>{post.totalVotesCount} People voted in this poll</Text>
      </Stack>

      <Button
        leftIcon={<Icon as={post.voted ? FiXCircle : FiBarChart2} />}
        colorScheme='green'
        onClick={handleVote}
        isLoading={isLoading}
      >
        {post.voted ? 'Cancel Vote' : 'Vote'}
      </Button>
    </Box>
  );
};

export default PollContent;
