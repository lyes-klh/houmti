import React from 'react';
import { Grid, GridItem, Avatar, Text } from '@chakra-ui/react';

const Notification = ({ content, image }) => {
  return (
    <>
      <Grid
        minH={12}
        templateColumns='repeat(6, 1fr)'
        bg='gray.700'
        borderRadius='sm'
        p={4}
        mb={3}
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
