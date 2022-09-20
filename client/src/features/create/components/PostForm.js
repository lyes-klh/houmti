import React, { useState, useRef } from 'react';
import {
  Stack,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  Icon,
} from '@chakra-ui/react';
import { FiPlus } from 'react-icons/fi';
import { createPostAction, uploadImage } from '../createActions';
import { addPost } from '../../posts/postsSlice';
import { useDispatch } from 'react-redux';
import Error from '../../../components/ui/Error';

const PostForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const dispatch = useDispatch();
  const file = useRef(null);

  const changeTitleHandler = (e) => {
    setTitle(e.target.value);
    if (title) setError(null);
  };
  const changeContentHandler = (e) => {
    setContent(e.target.value);
    if (content) setError(null);
  };

  const createPostHandler = async () => {
    try {
      setIsLoading(true);
      const image = file.current.files[0];
      const formData = new FormData();
      if (image) formData.append('image', image);
      if (!title || !content) {
        setError('Invalid title or/and content');
        setIsLoading(false);
        return;
      }
      const post = {
        title,
        content,
        withImage: image ? true : false,
      };
      const res = await createPostAction(post);
      let createdPost = res.data;
      if (image) {
        const postWithImage = await uploadImage(formData, res.data._id);
        createdPost = postWithImage.data;
      }
      dispatch(addPost(createdPost));
      setIsLoading(false);
    } catch (error) {
      setError(error.response.data.message);
      setIsLoading(false);
    }
  };

  return (
    <Stack direction='column' spacing={4} mt={4}>
      <FormControl isRequired>
        <FormLabel>Title</FormLabel>
        <Input
          placeholder='Title'
          value={title}
          onChange={changeTitleHandler}
        />
      </FormControl>
      <FormControl isRequired>
        <FormLabel>Content</FormLabel>
        <Textarea
          placeholder='Write some content...'
          resize='none'
          value={content}
          onChange={changeContentHandler}
        />
      </FormControl>
      <FormControl>
        <FormLabel>Image</FormLabel>
        <Input type='file' ref={file} />
      </FormControl>
      {error && <Error message={error} />}
      <Button
        leftIcon={<Icon as={FiPlus} />}
        colorScheme='green'
        mr={3}
        onClick={createPostHandler}
        isLoading={isLoading}
      >
        Create
      </Button>
    </Stack>
  );
};

export default PostForm;
