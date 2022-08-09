import React from 'react';
import { Button, Icon } from '@chakra-ui/react';

const NavLink = ({ children, icon }) => {
  return (
    <Button
      leftIcon={<Icon as={icon} fontSize='lg' />}
      colorScheme='green'
      variant='link'
      fontWeight='normal'
    >
      {children}
    </Button>
  );
};

export default NavLink;
