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
  Button,
  Icon,
} from '@chakra-ui/react';
import { FiPlus } from 'react-icons/fi';
import { createPollAction } from '../createActions';
import { addPost } from '../../posts/postsSlice';
import Error from '../../../components/ui/Error';
import { useDispatch } from 'react-redux';

const PollForm = ({ onClose }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const dispatch = useDispatch();

  const [optionsCount, setOptionsCount] = useState(2);
  const [optionsState, setOptionsState] = useState(
    Array.from({ length: optionsCount }, (_, i) => '')
  );

  const options = Array.from({ length: optionsCount }, (_, i) => i);
  const handleChange = (e) => {
    if (+e <= 10) {
      setOptionsCount(+e);
      const diff = +e - +optionsCount;
      if (diff > 0)
        setOptionsState((prev) => {
          return [...prev.concat(Array.from({ length: diff }, (_, i) => ''))];
        });

      if (diff < 0)
        setOptionsState((prev) => {
          return prev.filter((_, index, array) => index < array.length - -diff);
        });
    }

    if (+e === 1) {
      setOptionsCount(2);
      setOptionsState(Array.from({ length: optionsCount }, (_, i) => ''));
    }
  };

  const changeTitleHandler = (e) => {
    setTitle(e.target.value);
    if (title) setError(null);
  };
  const changeContentHandler = (e) => {
    setContent(e.target.value);
    if (content) setError(null);
  };

  const changeOptionHandler = (optionCount) => (e) => {
    // console.log('triggered')
    setOptionsState((prev) =>
      prev.map((option, i) => {
        if (optionCount === i) {
          return e.target.value;
        } else {
          return option;
        }
      })
    );
  };

  const createPollHandler = async () => {
    try {
      setIsLoading(true);

      if (
        !title ||
        !content ||
        optionsState[0] === '' ||
        optionsState[1] === ''
      ) {
        setError('Invalid inputs, please fill all the fields');
        setIsLoading(false);
        return;
      }
      const service = {
        title,
        content,
        pollOptions: optionsState,
      };
      const res = await createPollAction(service);
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
        <Input placeholder='Title' size='sm' onChange={changeTitleHandler} />
      </FormControl>
      <FormControl isRequired>
        <FormLabel>Content</FormLabel>
        <Input
          placeholder='Write some content...'
          resize='none'
          size='sm'
          onChange={changeContentHandler}
        />
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
            key={i}
            colorScheme='green'
            size='sm'
            placeholder={`option ${i + 1}`}
            onChange={changeOptionHandler(i)}
          />
        ))}
      </Grid>
      {error && <Error message={error} />}
      <Button
        leftIcon={<Icon as={FiPlus} />}
        colorScheme='green'
        mr={3}
        onClick={createPollHandler}
        isLoading={isLoading}
      >
        Create
      </Button>
    </Stack>
  );
};

export default PollForm;
