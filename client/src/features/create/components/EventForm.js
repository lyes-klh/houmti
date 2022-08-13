import React from 'react';
import {
  Box,
  Stack,
  FormControl,
  FormLabel,
  Input,
  Textarea,
} from '@chakra-ui/react';

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
    </Stack>
  );
};

export default EventForm;
