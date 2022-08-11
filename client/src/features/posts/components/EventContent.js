import React from 'react';
import { lightFormat, format } from 'date-fns';
import {
  Box,
  Heading,
  Stack,
  Icon,
  Text,
  Button,
  Flex,
  useColorModeValue,
} from '@chakra-ui/react';
import { FiMapPin, FiCalendar, FiClock, FiUsers } from 'react-icons/fi';

const EventContent = ({
  eventAddress,
  eventDate,
  eventHour,
  participationsCount,
}) => {
  const [day, month] = format(new Date(eventDate), 'do LLL').split(' ');

  return (
    <Box px={4}>
      <Flex justify='space-between' align='center'>
        <Box>
          <Heading
            size='sm'
            mb={2}
            mt={4}
            textTransform='uppercase'
            letterSpacing='wide'
            color='green.500'
          >
            Event details
          </Heading>
          <Stack
            spacing={1}
            mb={4}
            color={useColorModeValue('gray.600', 'gray.300')}
            fontSize='sm'
          >
            <Stack direction='row' spacing={2} alignItems='center'>
              <Icon as={FiMapPin} />
              <Text>{eventAddress}</Text>
            </Stack>
            <Stack direction='row' spacing={2} alignItems='center'>
              <Icon as={FiCalendar} />
              <Text>{lightFormat(new Date(eventDate), 'yyyy-MM-dd')}</Text>
            </Stack>
            <Stack direction='row' spacing={2} alignItems='center'>
              <Icon as={FiClock} />
              <Text>{eventHour}</Text>
            </Stack>
            <Stack direction='row' spacing={2} alignItems='center'>
              <Icon as={FiUsers} />
              <Text>
                {participationsCount} People will participate in this event
              </Text>
            </Stack>
          </Stack>
        </Box>

        <Flex
          width={{ base: '5rem', md: '8rem' }}
          height={{ base: '8rem', md: '10rem' }}
          borderRadius={4}
          p={4}
          fontSize='3xl'
          fontWeight='thin'
          letterSpacing='wide'
          direction='column'
          justify='center'
          align='center'
          bgGradient='linear(to-br, green.300, green.600)'
        >
          <Text>{day}</Text>
          <Text>{month}</Text>
        </Flex>
      </Flex>

      <Button leftIcon={<Icon as={FiCalendar} />} colorScheme='green'>
        Participate
      </Button>
    </Box>
  );
};

export default EventContent;
