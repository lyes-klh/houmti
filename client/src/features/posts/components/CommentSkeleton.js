import {
  Box,
  Flex,
  useMediaQuery,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
  useColorModeValue,
} from '@chakra-ui/react';

const CommentSkeleton = () => {
  return (
    <Box
      padding='2'
      // boxShadow='md'
      bg={useColorModeValue('white', 'gray.900')}
      borderRadius={4}
      mb={2}
    >
      <SkeletonCircle size='6' />
      <SkeletonText mt='2' noOfLines={2} spacing='2' />
    </Box>
  );
};

export default CommentSkeleton;
