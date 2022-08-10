import React from 'react';
import { Box } from '@chakra-ui/react';
import VerticalNavLink from './VerticalNavLink';

import { BiHomeAlt, BiUser, BiCog, BiLogOut } from 'react-icons/bi';

const VerticalNavbar = () => {
  return (
    <Box
      position='sticky'
      top={24}
      left={8}
      mr={8}
      h='fit'
      w={{ md: 64 }}
      bg='gray.900'
      borderRadius={4}
      py={4}
      px={4}
      pb={8}
    >
      <VerticalNavLink active={true} icon={BiHomeAlt}>
        Home
      </VerticalNavLink>
      <VerticalNavLink icon={BiUser}>Profile</VerticalNavLink>
      <VerticalNavLink icon={BiCog}>Settings</VerticalNavLink>
      <VerticalNavLink icon={BiLogOut}>Log out</VerticalNavLink>
    </Box>
  );
};

export default VerticalNavbar;
