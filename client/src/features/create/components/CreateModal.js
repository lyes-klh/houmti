import React from 'react';
import {
  Button,
  Icon,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from '@chakra-ui/react';
import { FiPlus } from 'react-icons/fi';
import CreateTabs from './CreateTabs';

const CreateModal = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size='lg'>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <CreateTabs />
        </ModalBody>

        <ModalFooter>
          <Button leftIcon={<Icon as={FiPlus} />} colorScheme='green' mr={3}>
            Create
          </Button>
          <Button variant='ghost' onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CreateModal;
