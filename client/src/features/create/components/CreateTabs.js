import React from 'react';
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
import PostForm from './PostForm';
import EventForm from './EventForm';
import PollForm from './PollForm';
import ServiceForm from './ServiceForm';

const CreateTabs = () => {
  return (
    <Tabs colorScheme='green' isFitted isLazy variant='soft-rounded'>
      <TabList>
        <Tab>Post</Tab>
        <Tab>Event</Tab>
        <Tab>Poll</Tab>
        <Tab>Service</Tab>
      </TabList>

      <TabPanels>
        <TabPanel>
          <PostForm />
        </TabPanel>
        <TabPanel>
          <EventForm />
        </TabPanel>
        <TabPanel>
          <PollForm />
        </TabPanel>
        <TabPanel>
          <ServiceForm />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default CreateTabs;
