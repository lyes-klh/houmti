import React from 'react';
import {
  Grid,
  GridItem,
  Avatar,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';

const Notification = ({ content, image }) => {
  return (
    <>
      <Grid
        minH={12}
        templateColumns='repeat(6, 1fr)'
        bg={useColorModeValue('gray.100', 'gray.700')}
        borderRadius='sm'
        p={3}
        mb={2}
        justifyContent='center'
        alignItems='center'
      >
        <Avatar size='sm' name='avatar' mr={2} src={image} />
        <GridItem colSpan={5}>
          <Text fontSize='sm' noOfLines={1}>
            {content}
          </Text>
        </GridItem>
      </Grid>
    </>
  );
};

export default Notification;
