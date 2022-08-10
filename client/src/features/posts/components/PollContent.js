import React from 'react';
import {
  Box,
  Stack,
  Icon,
  Text,
  Button,
  useColorModeValue,
} from '@chakra-ui/react';
import { FiUsers, FiBarChart2 } from 'react-icons/fi';
import PollOptions from './PollOptions';

const PollContent = ({ pollOptions }) => {
  const [votedOption, setvotedOption] = React.useState(null);
  let totalVotesCount = 0;
  for (let i = 0; i < pollOptions.length; i++) {
    totalVotesCount += pollOptions[i].votesCount;
  }

  return (
    <Box px={4}>
      {/* <Heading
        size='sm'
        mb={2}
        mt={4}
        textTransform='uppercase'
        letterSpacing='wide'
        color='green.500'
      >
        Vote
      </Heading> */}

      <PollOptions
        pollOptions={pollOptions}
        votedOption={votedOption}
        vote={setvotedOption}
        totalVotesCount={totalVotesCount}
      />

      <Stack
        direction='row'
        spacing={2}
        alignItems='center'
        mt={2}
        mb={4}
        color={useColorModeValue('gray.600', 'gray.300')}
        fontSize='sm'
      >
        <Icon as={FiUsers} />
        <Text>{totalVotesCount} People voted in this poll</Text>
      </Stack>

      <Button leftIcon={<Icon as={FiBarChart2} />} colorScheme='green'>
        Vote now
      </Button>
    </Box>
  );
};

export default PollContent;
