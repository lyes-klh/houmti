import React, { useState } from 'react';
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from '@chakra-ui/react';
import CreateTabs from './CreateTabs';

const CreateModal = ({ isOpen, onClose }) => {
  const [tabIndex, setTabIndex] = useState(0);

  const handleTabsChange = (index) => {
    setTabIndex(index);
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size='lg'>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <CreateTabs
            tabIndex={tabIndex}
            handleTabsChange={handleTabsChange}
            onClose={onClose}
          />
        </ModalBody>

        <ModalFooter>
          <Button variant='ghost' onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CreateModal;
