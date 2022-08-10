import React from 'react';

import { useDisclosure, useColorMode } from '@chakra-ui/react';
import {
  Box,
  Flex,
  IconButton,
  Icon,
  Button,
  VStack,
  HStack,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Avatar,
  Divider,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  Heading,
  Image,
  Text,
} from '@chakra-ui/react';
import {
  BiMenu,
  BiHomeAlt,
  BiUser,
  BiCog,
  BiLogOut,
  BiBell,
  BiX,
} from 'react-icons/bi';
import NavLink from './NavLink';
import Notification from './Notification';
import avatar from '../../../assets/images/avatar.jpg';

const Navbar = () => {
  const { isOpen, onOpen, onClose, onToggle } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Box
      as='nav'
      minH={20}
      position='fixed'
      top={0}
      left={0}
      w='100%'
      bg='gray.900'
      py={4}
      px={{ base: 4, md: 8 }}
      zIndex='sticky'
    >
      <Flex align='center' justify='space-between'>
        <IconButton
          aria-label='open menu'
          colorScheme='green'
          variant='ghost'
          size='lg'
          display={{ md: 'none' }}
          onClick={onToggle}
          icon={
            isOpen ? (
              <Icon as={BiX} fontSize='2xl' />
            ) : (
              <Icon as={BiMenu} fontSize='2xl' />
            )
          }
        />
        <Heading size='lg'>H</Heading>
        <HStack>
          {/* <Button colorSchema='green' onClick={toggleColorMode}>
            Toggle Theme {colorMode}
          </Button> */}
          <Popover>
            <PopoverTrigger>
              <IconButton
                aria-label='notifications'
                colorScheme='yellow'
                variant='ghost'
                borderRadius={'full'}
                icon={<Icon as={BiBell} fontSize={{ base: 'xl', md: '2xl' }} />}
              />
            </PopoverTrigger>
            <PopoverContent bg='gray.900'>
              <PopoverHeader>Notifications</PopoverHeader>
              <PopoverBody py={4}>{/* Notifications goes here */}</PopoverBody>
            </PopoverContent>
          </Popover>
          <Menu>
            <MenuButton borderRadius='full'>
              <Avatar
                name='avatar'
                size={{ base: 'sm', md: 'md' }}
                src={avatar}
              />
            </MenuButton>
            <MenuList bg='gray.900'>
              <MenuItem>
                <Icon as={BiUser} mr={2} fontSize='lg' /> Profile
              </MenuItem>
              <MenuItem>
                <Icon as={BiCog} mr={2} fontSize='lg' /> Settings
              </MenuItem>
              <Divider />
              <MenuItem>
                <Icon as={BiLogOut} mr={2} fontSize='lg' /> Log out
              </MenuItem>
            </MenuList>
          </Menu>
        </HStack>
      </Flex>

      {isOpen && (
        <VStack mt={4} ml={2} spacing={4} alignItems='start'>
          <NavLink icon={BiHomeAlt}>Home</NavLink>
          <Divider />
          <NavLink icon={BiUser}>Profile</NavLink>
          <Divider />
          <NavLink icon={BiCog}>Settings</NavLink>
        </VStack>
      )}
    </Box>
  );
};

export default Navbar;
