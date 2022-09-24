import React from 'react';
import {
  RadioGroup,
  Stack,
  Radio,
  Box,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';

const PollOption = ({ option, totalVotesCount, votedOption }) => {
  const width = totalVotesCount
    ? (option.votesCount / totalVotesCount) * 100
    : 0;
  return (
    <Box
      mt={4}
      bg={useColorModeValue('blackAlpha.100', 'whiteAlpha.300')}
      w='100%'
      h='2.5rem'
      p={4}
      borderRadius={4}
      overflow='hidden'
      display='flex'
      direction='row'
      justifyContent='space-between'
      alignItems='center'
      position='relative'
    >
      <Radio
        zIndex='docked'
        size='lg'
        colorScheme='green'
        value={option.option}
        isChecked={option.option === votedOption}
      >
        {option.option}
      </Radio>
      <Text zIndex='docked'>{Math.floor(width)}%</Text>
      <Box
        bg={useColorModeValue('green.400', 'green.600')}
        w={`${width}%`}
        h='full'
        position='absolute'
        top={0}
        left={0}
      ></Box>
    </Box>
  );
};

const PollOptions = ({ pollOptions, votedOption, vote, totalVotesCount }) => {
  return (
    <RadioGroup onChange={vote} value={votedOption}>
      <Stack direction='column' spacing={4}>
        {pollOptions.map((option) => (
          <PollOption
            key={option._id}
            option={option}
            totalVotesCount={totalVotesCount}
            votedOption={votedOption}
          />
        ))}
      </Stack>
    </RadioGroup>
  );
};

export default PollOptions;
