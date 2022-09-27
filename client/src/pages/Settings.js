import React from 'react';
import PageWrapper from './PageWrapper';
import {
  Flex,
  Tabs,
  Tab,
  TabList,
  TabPanels,
  TabPanel,
  Heading,
  useColorModeValue,
} from '@chakra-ui/react';
import { UpdateInfoForm, UpdatePasswordForm } from '../features/settings';

const Settings = () => {
  return (
    <PageWrapper>
      <Heading size='lg' mb={4}>
        Settings
      </Heading>
      <Flex
        // w='full'
        width={{ base: '100%', sm: '35rem', md: '45rem', lg: '50rem' }}
        bg={useColorModeValue('white', 'gray.900')}
        borderRadius={8}
      >
        <Tabs isLazy variant='enclosed' w='full' colorScheme='green'>
          <TabList>
            <Tab>Account</Tab>
            <Tab>Password</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <UpdateInfoForm />
            </TabPanel>
            <TabPanel>
              <UpdatePasswordForm />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Flex>
    </PageWrapper>
  );
};

export default Settings;
