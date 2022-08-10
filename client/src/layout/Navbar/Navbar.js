import React from 'react';

import {
  useDisclosure,
  useColorMode,
  useMediaQuery,
  useColorModeValue,
} from '@chakra-ui/react';
import {
  Box,
  Flex,
  IconButton,
  Icon,
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
} from '@chakra-ui/react';
import {
  FiHome,
  FiUser,
  FiSettings,
  FiSun,
  FiMoon,
  FiLogOut,
  FiMenu,
  FiBell,
  FiX,
} from 'react-icons/fi';
import NavLink from './NavLink';
import Notification from './Notification';
import avatar from '../../assets/images/avatar.jpg';

const Navbar = () => {
  const { isOpen, onOpen, onClose, onToggle } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();
  const [isMedium] = useMediaQuery('(min-width: 48rem)');

  return (
    <Box
      as='nav'
      minH={20}
      position='fixed'
      top={0}
      left={0}
      w='100%'
      bg={useColorModeValue('white', 'gray.900')}
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
              <Icon as={FiX} fontSize='2xl' />
            ) : (
              <Icon as={FiMenu} fontSize='2xl' />
            )
          }
        />
        <Heading size='lg'>H</Heading>
        {/* Navigation - Large */}
        {isMedium && (
          <HStack>
            <IconButton
              aria-label='Home'
              colorScheme='green'
              variant='ghost'
              size='lg'
              icon={<Icon as={FiHome} fontSize='xl' />}
            />
            <IconButton
              aria-label='Profile'
              colorScheme='green'
              variant='ghost'
              size='lg'
              icon={<Icon as={FiUser} fontSize='xl' />}
            />
            <IconButton
              aria-label='Home'
              colorScheme='green'
              variant='ghost'
              size='lg'
              icon={<Icon as={FiSettings} fontSize='xl' />}
            />
            <IconButton
              aria-label='Color mode'
              colorScheme='green'
              variant='ghost'
              size='lg'
              onClick={toggleColorMode}
              icon={
                <Icon
                  as={colorMode === 'dark' ? FiSun : FiMoon}
                  fontSize='xl'
                />
              }
            />
          </HStack>
        )}
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
                icon={<Icon as={FiBell} fontSize={{ base: 'xl', md: '2xl' }} />}
              />
            </PopoverTrigger>
            <PopoverContent
              bg={useColorModeValue('white', 'gray.900')}
              maxH='60vh'
              overflow='scroll'
            >
              <PopoverHeader>Notifications</PopoverHeader>
              <PopoverBody py={4}>
                <Notification
                  image={avatar}
                  content={'Lyes commented on your post'}
                />
                <Notification
                  image={avatar}
                  content={'Lyes commented on your post "This is awesome"'}
                />
              </PopoverBody>
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
            <MenuList bg={useColorModeValue('white', 'gray.900')}>
              <MenuItem>
                <Icon as={FiUser} mr={2} fontSize='lg' /> Profile
              </MenuItem>
              <MenuItem>
                <Icon as={FiSettings} mr={2} fontSize='lg' /> Settings
              </MenuItem>
              <MenuItem onClick={toggleColorMode}>
                <Icon
                  as={colorMode === 'dark' ? FiSun : FiMoon}
                  mr={2}
                  fontSize='lg'
                />{' '}
                {colorMode === 'dark' ? 'Light mode' : 'Dark Mode'}
              </MenuItem>
              <Divider />
              <MenuItem>
                <Icon as={FiLogOut} mr={2} fontSize='lg' /> Log out
              </MenuItem>
            </MenuList>
          </Menu>
        </HStack>
      </Flex>

      {isOpen && (
        <VStack mt={4} ml={2} spacing={4} alignItems='start'>
          <NavLink icon={FiHome}>Home</NavLink>
          <Divider />
          <NavLink icon={FiUser}>Profile</NavLink>
          <Divider />
          <NavLink icon={FiSettings}>Settings</NavLink>
        </VStack>
      )}
    </Box>
  );
};

export default Navbar;
