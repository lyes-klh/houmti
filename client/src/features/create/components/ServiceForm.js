import React from 'react';
import {
  Stack,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  InputGroup,
  InputLeftElement,
  Icon,
} from '@chakra-ui/react';
import { FiPhone } from 'react-icons/fi';

const ServiceForm = () => {
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
      <FormControl isRequired>
        <FormLabel>Phone number</FormLabel>
        <InputGroup>
          <InputLeftElement
            pointerEvents='none'
            children={<Icon as={FiPhone} color='gray.300' />}
          />
          <Input type='tel' placeholder='Phone number' />
        </InputGroup>
      </FormControl>
    </Stack>
  );
};

export default ServiceForm;
