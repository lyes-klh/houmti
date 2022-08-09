import { Flex } from '@chakra-ui/react';
import { useMediaQuery } from '@chakra-ui/react';

import Navbar from './components/layout/Navbar/Navbar';
import VerticalNavbar from './components/layout/VerticalNavbar/VerticalNavbar';
import Home from './pages/Home';
import SideContent from './components/layout/SideContent/SideContent';

function App() {
  const [isMedium] = useMediaQuery('(min-width: 48rem)');
  const [isLarge] = useMediaQuery('(min-width: 80rem)');
  return (
    <>
      <Navbar />
      <Flex mx={8} justify='center' align='start'>
        {isMedium && <VerticalNavbar />}

        <Home />

        {isLarge && <SideContent />}
      </Flex>
    </>
  );
}

export default App;
