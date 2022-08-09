import React from 'react';
import { Button, Icon, Divider } from '@chakra-ui/react';

const NavLink = ({ children, icon }) => {
  return (
    <>
      <Button
        leftIcon={<Icon as={icon} fontSize='lg' />}
        variant='link'
        fontWeight='normal'
        colorScheme='green'
        mt={4}
      >
        {children}
      </Button>
      <Divider mt={3} />
    </>
  );
};

export default NavLink;
