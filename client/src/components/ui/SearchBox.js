import React from 'react';
import { Input, InputGroup, InputLeftElement, Icon } from '@chakra-ui/react';
import { BiSearch } from 'react-icons/bi';

const SearchBox = () => {
  return (
    <InputGroup>
      <InputLeftElement
        pointerEvents='none'
        children={<Icon as={BiSearch} />}
      />
      <Input variant='filled' width='10rem' size={'sm'} placeholder='Search' />
    </InputGroup>
  );
};

export default SearchBox;
