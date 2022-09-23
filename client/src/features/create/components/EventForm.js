import React, { useState } from 'react';
import {
  Box,
  Stack,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  Icon,
} from '@chakra-ui/react';
import { FiPlus } from 'react-icons/fi';
import { createEventAction } from '../createActions';
import { addPost } from '../../posts/postsSlice';
import Error from '../../../components/ui/Error';
import { useDispatch } from 'react-redux';

// eventAddress: String,
// eventDate: Date,
// eventHour: String,
// participationsCount: Number,

const EventForm = ({ onClose }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [address, setAddress] = useState('');
  const [dateHour, setDateHour] = useState('');

  const dispatch = useDispatch();

  const changeTitleHandler = (e) => {
    setTitle(e.target.value);
    if (title) setError(null);
  };
  const changeContentHandler = (e) => {
    setContent(e.target.value);
    if (content) setError(null);
  };

  const changeAddressHandler = (e) => {
    setAddress(e.target.value);
    if (address) setError(null);
  };

  const changeDateHourHandler = (e) => {
    setDateHour(e.target.value);
    if (dateHour) setError(null);
  };

  const createEventHandler = async () => {
    try {
      setIsLoading(true);

      if (!title || !content || !address || !dateHour) {
        setError('Invalid inputs, please fill all the fields');
        setIsLoading(false);
        return;
      }

      const date = new Date(dateHour);

      const event = {
        title,
        content,
        eventAddress: address,
        eventDate: date,
        eventHour: date.toLocaleTimeString(),
      };
      const res = await createEventAction(event);
      dispatch(addPost(res.data));
      setIsLoading(false);
      onClose();
    } catch (error) {
      setError(error.response.data.message);
      setIsLoading(false);
    }
  };
  return (
    <Stack direction='column' spacing={2} mt={2}>
      <FormControl>
        <FormLabel>Title</FormLabel>
        <Input placeholder='Title' size='sm' onChange={changeTitleHandler} />
      </FormControl>
      <FormControl isRequired>
        <FormLabel>Content</FormLabel>
        <Textarea
          placeholder='Write some content...'
          resize='none'
          size='sm'
          onChange={changeContentHandler}
        />
      </FormControl>
      <FormControl isRequired>
        <FormLabel>Address</FormLabel>
        <Input
          placeholder='Where ?'
          size='sm'
          onChange={changeAddressHandler}
        />
      </FormControl>
      <FormControl isRequired>
        <FormLabel>Date & Time</FormLabel>
        <Input
          type='datetime-local'
          size='sm'
          onChange={changeDateHourHandler}
        />
      </FormControl>
      {error && <Error message={error} />}

      <Button
        leftIcon={<Icon as={FiPlus} />}
        colorScheme='green'
        mr={3}
        onClick={createEventHandler}
        isLoading={isLoading}
      >
        Create
      </Button>
    </Stack>
  );
};

export default EventForm;
