import React from 'react';
import { Button, Icon, Divider } from '@chakra-ui/react';

const NavLink = ({ children, icon, active }) => {
  return (
    <>
      <Button
        leftIcon={<Icon as={icon} fontSize='lg' />}
        // variant='filled'
        w='full'
        fontWeight='normal'
        colorScheme='green'
        mt={4}
      >
        {children}
      </Button>
      <Divider mt={1} />
    </>
  );
};

export default NavLink;
