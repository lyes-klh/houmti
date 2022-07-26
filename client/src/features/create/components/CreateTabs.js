import React from 'react';
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
import PostForm from './PostForm';
import EventForm from './EventForm';
import PollForm from './PollForm';
import ServiceForm from './ServiceForm';

const CreateTabs = ({ tabIndex, handleTabsChange, onClose }) => {
  return (
    <Tabs
      colorScheme='green'
      isFitted
      isLazy
      variant='soft-rounded'
      index={tabIndex}
      onChange={handleTabsChange}
    >
      <TabList>
        <Tab>Post</Tab>
        <Tab>Event</Tab>
        <Tab>Poll</Tab>
        <Tab>Service</Tab>
      </TabList>

      <TabPanels>
        <TabPanel>
          <PostForm onClose={onClose} />
        </TabPanel>
        <TabPanel>
          <EventForm onClose={onClose} />
        </TabPanel>
        <TabPanel>
          <PollForm onClose={onClose} />
        </TabPanel>
        <TabPanel>
          <ServiceForm onClose={onClose} />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default CreateTabs;
