import React from 'react';
import { Box, Divider, Icon, Link } from '@chakra-ui/react';
import VerticalNavLink from './VerticalNavLink';

import {
  BiMenu,
  BiHomeAlt,
  BiUser,
  BiCog,
  BiLogOut,
  BiBell,
  BiX,
} from 'react-icons/bi';

const VerticalNavbar = () => {
  return (
    <Box
      position='sticky'
      top={24}
      left={8}
      mr={8}
      h='100%'
      w={{ md: 64, lg: 72 }}
      bg='gray.900'
      borderRadius={4}
      py={4}
      px={6}
      pb={8}
    >
      <VerticalNavLink icon={BiHomeAlt}>Home</VerticalNavLink>
      <VerticalNavLink icon={BiUser}>Profile</VerticalNavLink>
      <VerticalNavLink icon={BiCog}>Settings</VerticalNavLink>
      <VerticalNavLink icon={BiLogOut}>Log out</VerticalNavLink>
    </Box>
  );
};

export default VerticalNavbar;
