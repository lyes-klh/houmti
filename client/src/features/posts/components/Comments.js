import React, { useState, useEffect } from 'react';
import { formatRelative } from 'date-fns';
import {
  Stack,
  Avatar,
  Box,
  Text,
  Heading,
  Flex,
  useColorModeValue,
} from '@chakra-ui/react';
import { getCommentsAction } from '../feedbackActions';
import { setModePost } from '../postsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { getPostComments } from '../postsSlice';
import CommentSkeleton from './CommentSkeleton';
import { Link } from 'react-router-dom';

const Comment = ({ comment }) => {
  return (
    <Flex mx={3} my={2}>
      <Link to={`/profile/${comment.user._id}`}>
        <Avatar
          size='sm'
          mr={2}
          mt={1}
          name={comment.firstname + ' ' + comment.lastname}
          src={
            process.env.REACT_APP_BACKEND + '/img/users/' + comment.user.avatar
          }
        />
      </Link>

      <Stack
        direction='column'
        pt={4}
        spacing={1}
        p='2'
        px='4'
        boxShadow='sm'
        bg={useColorModeValue('gray.100', 'gray.700')}
        borderRadius={12}
        w='full'
      >
        <Heading size='xs'>
          <Link to={`/profile/${comment.user._id}`}>
            {comment.user.firstname} {comment.user.lastname}
          </Link>
        </Heading>

        <Box>
          <Text fontSize='sm'>{comment.commentContent}</Text>
          <Text
            color={useColorModeValue('gray.600', 'gray.400')}
            fontSize='xs'
            lineHeight='short'
            mt={2}
          >
            {formatRelative(new Date(comment.createdAt), new Date())}
          </Text>
        </Box>
      </Stack>
    </Flex>
  );
};

const Comments = ({ postId }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const dispatch = useDispatch();
  const postComments = useSelector((state) => state.posts.postComments);

  useEffect(() => {
    const fetchComments = async (postId) => {
      try {
        const res = await getCommentsAction(postId);
        dispatch(getPostComments(res.data));
        setIsLoading(false);
      } catch (error) {
        setError(error.response.data.message);
        setIsLoading(false);
      }
    };

    dispatch(setModePost());
    fetchComments(postId);
  }, [dispatch, postId]);
  return isLoading ? (
    <>
      <CommentSkeleton />
    </>
  ) : (
    postComments.map((comment) => (
      <Comment key={comment._id} comment={comment} />
    ))
  );
};

export default Comments;
