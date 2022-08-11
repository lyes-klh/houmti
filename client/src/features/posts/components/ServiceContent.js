import React from 'react';
import {
  Box,
  Heading,
  Stack,
  Icon,
  Text,
  Button,
  useColorModeValue,
} from '@chakra-ui/react';
import { FiUsers, FiPhone, FiBriefcase } from 'react-icons/fi';

const ServiceContent = ({ servicePhoneNumber, demandsCount }) => {
  return (
    <Box px={4}>
      <Heading
        size='sm'
        mb={2}
        mt={8}
        textTransform='uppercase'
        color='green.500'
      >
        Contact me
      </Heading>
      <Stack
        spacing={1}
        mb={4}
        color={useColorModeValue('gray.600', 'gray.300')}
        fontSize='sm'
      >
        <Stack direction='row' spacing={2} alignItems='center'>
          <Icon as={FiPhone} />
          <Text>{servicePhoneNumber}</Text>
        </Stack>
        <Stack direction='row' spacing={2} alignItems='center'>
          <Icon as={FiUsers} />
          <Text>{demandsCount} People demanded this service</Text>
        </Stack>
      </Stack>
      <Button leftIcon={<Icon as={FiBriefcase} />} colorScheme='green'>
        Demand service
      </Button>
    </Box>
  );
};

export default ServiceContent;
