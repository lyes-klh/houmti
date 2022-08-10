import { Flex } from '@chakra-ui/react';
import { useMediaQuery } from '@chakra-ui/react';

import Navbar from './layout/Navbar/Navbar';
import VerticalNavbar from './layout/VerticalNavbar/VerticalNavbar';
import Home from './pages/Home';
import SideContent from './layout/SideContent/SideContent';

function App() {
  const [isMedium] = useMediaQuery('(min-width: 48rem)');
  const [isLarge] = useMediaQuery('(min-width: 80rem)');
  return (
    <>
      <Navbar />
      <Flex
        mx={{ md: 4, lg: 8 }}
        justify='center'
        align='start'
        position='relative'
      >
        <Home />
        {/* {isLarge && <SideContent />} */}
      </Flex>
    </>
  );
}

export default App;
