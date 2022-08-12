import React from 'react';
import { Button, Icon } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const NavLink = ({ children, icon, link }) => {
  return (
    <Link to={link}>
      <Button
        leftIcon={<Icon as={icon} fontSize='lg' />}
        colorScheme='green'
        variant='link'
        fontWeight='normal'
      >
        {children}
      </Button>
    </Link>
  );
};

export default NavLink;
