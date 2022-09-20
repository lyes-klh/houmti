import React from 'react';
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

// eventAddress: String,
// eventDate: Date,
// eventHour: String,
// participationsCount: Number,

const EventForm = () => {
  return (
    <Stack direction='column' spacing={2} mt={2}>
      <FormControl>
        <FormLabel>Title</FormLabel>
        <Input placeholder='Title' size='sm' />
      </FormControl>
      <FormControl isRequired>
        <FormLabel>Content</FormLabel>
        <Textarea placeholder='Write some content...' resize='none' size='sm' />
      </FormControl>
      <FormControl isRequired>
        <FormLabel>Address</FormLabel>
        <Input placeholder='Where ?' size='sm' />
      </FormControl>
      <FormControl isRequired>
        <FormLabel>Date & Time</FormLabel>
        <Input type='datetime-local' size='sm' />
      </FormControl>
      <Button leftIcon={<Icon as={FiPlus} />} colorScheme='green' mr={3}>
        Create
      </Button>
    </Stack>
  );
};

export default EventForm;
