import {
  Box,
  Flex,
  useMediaQuery,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
  useColorModeValue,
} from '@chakra-ui/react';

const ProfileCardSkeleton = () => {
  return (
    <Box
      padding='6'
      boxShadow='lg'
      bg={useColorModeValue('white', 'gray.900')}
      borderRadius={8}
      mb={16}
      width={{ base: '100%', sm: '35rem', md: '45rem', lg: '50rem' }}
      h='21rem'
    >
      <SkeletonCircle size='20' />
      <SkeletonText mt='4' noOfLines={6} spacing='4' />
    </Box>
  );
};

export default ProfileCardSkeleton;
