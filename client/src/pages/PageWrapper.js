import React from "react";
import { Flex } from "@chakra-ui/react";

const PageWrapper = ({ children, mt = 24 }) => {
  return (
    <Flex
      mx={{ md: 4, lg: 8 }}
      direction="column"
      justify="start"
      align="center"
      position="relative"
      mt={mt}
    >
      {children}
    </Flex>
  );
};

export default PageWrapper;
