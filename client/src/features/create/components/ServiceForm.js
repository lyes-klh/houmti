import React from 'react';
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
      <Button leftIcon={<Icon as={FiPlus} />} colorScheme='green' mr={3}>
        Create
      </Button>
    </Stack>
  );
};

export default ServiceForm;
