import React from 'react';
import { Link } from 'react-router-dom';

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
  const { isOpen, onToggle } = useDisclosure();
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
            <Link to='/'>
              <IconButton
                aria-label='Home'
                colorScheme='green'
                variant='ghost'
                size='lg'
                icon={<Icon as={FiHome} fontSize='xl' />}
              />
            </Link>

            <Link to='/profile'>
              <IconButton
                aria-label='Profile'
                colorScheme='green'
                variant='ghost'
                size='lg'
                icon={<Icon as={FiUser} fontSize='xl' />}
              />
            </Link>

            <Link to='/settings'>
              <IconButton
                aria-label='Settings'
                colorScheme='green'
                variant='ghost'
                size='lg'
                icon={<Icon as={FiSettings} fontSize='xl' />}
              />
            </Link>

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
              overflow='auto'
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
          <Menu autoSelect={false}>
            <MenuButton borderRadius='full'>
              <Avatar
                name='avatar'
                size={{ base: 'sm', md: 'md' }}
                src={avatar}
              />
            </MenuButton>
            <MenuList bg={useColorModeValue('white', 'gray.900')}>
              <Link to='/profile'>
                <MenuItem icon={<Icon as={FiUser} mr={2} fontSize='lg' />}>
                  Profile
                </MenuItem>
              </Link>
              <Link to='/settings'>
                <MenuItem icon={<Icon as={FiSettings} mr={2} fontSize='lg' />}>
                  Settings
                </MenuItem>
              </Link>
              <MenuItem
                icon={
                  <Icon
                    as={colorMode === 'dark' ? FiSun : FiMoon}
                    mr={2}
                    fontSize='lg'
                  />
                }
                onClick={toggleColorMode}
              >
                {colorMode === 'dark' ? 'Light mode' : 'Dark Mode'}
              </MenuItem>
              <Divider />
              <MenuItem icon={<Icon as={FiLogOut} mr={2} fontSize='lg' />}>
                Logout
              </MenuItem>
            </MenuList>
          </Menu>
        </HStack>
      </Flex>

      {isOpen && (
        <VStack mt={4} ml={2} spacing={4} alignItems='start'>
          <NavLink link='/' icon={FiHome}>
            Home
          </NavLink>
          <Divider />
          <NavLink link='profile' icon={FiUser}>
            Profile
          </NavLink>
          <Divider />
          <NavLink link='settings' icon={FiSettings}>
            Settings
          </NavLink>
        </VStack>
      )}
    </Box>
  );
};

export default Navbar;
