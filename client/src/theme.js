import { extendTheme } from '@chakra-ui/react';

const config = {
  initialColorMode: 'dark',
  useSystemColorMode: true,
};

const semanticTokens = {
  colors: {
    'chakra-body-bg': {
      _light: 'gray.200',
      _dark: 'gray.800',
    },
  },
};

const theme = extendTheme({ config, semanticTokens });
console.log(theme);

export default theme;
