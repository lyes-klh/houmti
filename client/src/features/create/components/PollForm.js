import React, { useState } from 'react';
import {
  Stack,
  Grid,
  FormControl,
  FormLabel,
  Input,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from '@chakra-ui/react';

const PollForm = () => {
  const [optionsCount, setOptionsCount] = useState(2);
  const options = Array.from({ length: optionsCount }, (_, i) => i);
  const handleChange = (e) => {
    setOptionsCount(+e);
  };

  return (
    <Stack direction='column' spacing={4} mt={4}>
      <FormControl>
        <FormLabel>Title</FormLabel>
        <Input placeholder='Title' size='sm' />
      </FormControl>
      <FormControl isRequired>
        <FormLabel>Content</FormLabel>
        <Input placeholder='Write some content...' resize='none' size='sm' />
      </FormControl>
      <FormControl>
        <FormLabel>Number of options</FormLabel>
        <NumberInput
          size='sm'
          min={2}
          max={10}
          value={optionsCount}
          onChange={handleChange}
        >
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      </FormControl>
      <FormControl>
        <FormLabel>Options</FormLabel>
      </FormControl>
      <Grid
        gap={2}
        height='5rem'
        templateColumns='repeat(2, 1fr)'
        overflow='auto'
      >
        {options.map((_, i) => (
          <Input
            colorScheme='green'
            size='sm'
            placeholder={`option ${i + 1}`}
          />
        ))}
      </Grid>
    </Stack>
  );
};

export default PollForm;
