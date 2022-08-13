import React from 'react';
import {
  Stack,
  FormControl,
  FormLabel,
  Input,
  Textarea,
} from '@chakra-ui/react';

const PostForm = () => {
  return (
    <Stack direction='column' spacing={4} mt={4}>
      <FormControl>
        <FormLabel>Title</FormLabel>
        <Input placeholder='Title' />
      </FormControl>
      <FormControl isRequired>
        <FormLabel>Content</FormLabel>
        <Textarea placeholder='Write some content...' resize='none' />
      </FormControl>
      <FormControl>
        <FormLabel>Image</FormLabel>
        <Input type='file' />
      </FormControl>
    </Stack>
  );
};

export default PostForm;
