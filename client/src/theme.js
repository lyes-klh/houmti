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

const fonts = {
  heading: `'Roboto', sans-serif`,
  body: `'Roboto', sans-serif`,
};

const theme = extendTheme({ config, semanticTokens, fonts });
console.log(theme);

export default theme;
