import React, { useState } from 'react';
import {
  Box,
  Divider,
  Stack,
  Avatar,
  AvatarBadge,
  Input,
} from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { createFeedbackAction } from '../feedbackActions';
import { addComment } from '../postsSlice';
import { useDispatch } from 'react-redux';

const CommentForm = ({ postId }) => {
  const currentUser = useSelector((state) => state.auth.currentUser);
  const [commentContent, setCommentContent] = useState('');

  const dispatch = useDispatch();

  const changeComment = (e) => {
    setCommentContent(e.target.value);
  };

  const commentHandler = async (e) => {
    try {
      if (e.key === 'Enter') {
        const res = await createFeedbackAction(postId, {
          feedbackType: 'Comment',
          commentContent,
        });

        dispatch(addComment({ comment: res.data, id: postId }));
        setCommentContent('');
      }
    } catch (error) {}
  };

  return (
    <Box my={2}>
      <Divider />
      <Stack
        direction='row'
        pt={4}
        mx={3}
        justifyContent='center'
        alignItems='center'
        spacing={4}
      >
        <Avatar
          size='sm'
          name={currentUser.firstname + ' ' + currentUser.lastname}
          src={
            process.env.REACT_APP_BACKEND + '/img/users/' + currentUser.avatar
          }
        >
          <AvatarBadge boxSize='1.25em' bg='green.500' />
        </Avatar>
        <Input
          variant='filled'
          focusBorderColor='green.600'
          borderRadius='3xl'
          placeholder='Write a comment...'
          value={commentContent}
          onChange={changeComment}
          onKeyDown={commentHandler}
        ></Input>
      </Stack>
    </Box>
  );
};

export default CommentForm;
