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
import { UpdateInfoForm } from '../features/settings';

const Settings = () => {
  return (
    <PageWrapper>
      <Heading size='lg' mb={4}>
        Settings
      </Heading>
      <Flex
        w='full'
        bg={useColorModeValue('white', 'gray.900')}
        borderRadius={8}
      >
        <Tabs isLazy variant='enclosed' w='full' colorScheme='green'>
          <TabList>
            <Tab>User Info</Tab>
            <Tab>Password</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <UpdateInfoForm />
            </TabPanel>
            {/* initially not mounted */}
            <TabPanel>
              <p>two!</p>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Flex>
    </PageWrapper>
  );
};

export default Settings;
