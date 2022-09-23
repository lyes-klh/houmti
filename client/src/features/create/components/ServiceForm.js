import React, { useState } from 'react';
import {
  Stack,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  InputGroup,
  InputLeftElement,
  Button,
  Icon,
} from '@chakra-ui/react';
import { FiPhone, FiPlus } from 'react-icons/fi';
import { useDispatch } from 'react-redux';
import { createServiceAction } from '../createActions';
import { addPost } from '../../posts/postsSlice';
import Error from '../../../components/ui/Error';

const ServiceForm = ({ onClose }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [phone, setPhone] = useState('');

  const dispatch = useDispatch();

  const changeTitleHandler = (e) => {
    setTitle(e.target.value);
    if (title) setError(null);
  };
  const changeContentHandler = (e) => {
    setContent(e.target.value);
    if (content) setError(null);
  };

  const changePhoneHandler = (e) => {
    setPhone(e.target.value);
    if (phone) setError(null);
  };

  const createServiceHandler = async () => {
    try {
      setIsLoading(true);

      if (!title || !content || !phone) {
        setError('Invalid inputs, please fill all the fields');
        setIsLoading(false);
        return;
      }
      const service = {
        title,
        content,
        servicePhoneNumber: phone,
      };
      const res = await createServiceAction(service);
      dispatch(addPost(res.data));
      setIsLoading(false);
      onClose();
    } catch (error) {
      setError(error.response.data.message);
      setIsLoading(false);
    }
  };

  return (
    <Stack direction='column' spacing={4} mt={4}>
      <FormControl>
        <FormLabel>Title</FormLabel>
        <Input placeholder='Title' onChange={changeTitleHandler} />
      </FormControl>
      <FormControl isRequired>
        <FormLabel>Content</FormLabel>
        <Textarea
          placeholder='Write some content...'
          resize='none'
          onChange={changeContentHandler}
        />
      </FormControl>
      <FormControl isRequired>
        <FormLabel>Phone number</FormLabel>
        <InputGroup>
          <InputLeftElement
            pointerEvents='none'
            children={<Icon as={FiPhone} color='gray.300' />}
          />
          <Input
            type='tel'
            placeholder='Phone number'
            onChange={changePhoneHandler}
          />
        </InputGroup>
      </FormControl>
      {error && <Error message={error} />}
      <Button
        leftIcon={<Icon as={FiPlus} />}
        colorScheme='green'
        mr={3}
        onClick={createServiceHandler}
        isLoading={isLoading}
      >
        Create
      </Button>
    </Stack>
  );
};

export default ServiceForm;
