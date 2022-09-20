import {
  Box,
  Flex,
  useMediaQuery,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
  useColorModeValue,
} from '@chakra-ui/react';

const PostSkeleton = () => {
  return (
    <Box
      padding='6'
      boxShadow='lg'
      bg={useColorModeValue('white', 'gray.900')}
      borderRadius={4}
      mb={8}
    >
      <SkeletonCircle size='10' />
      <SkeletonText mt='4' noOfLines={4} spacing='4' />
    </Box>
  );
};

export default PostSkeleton;
