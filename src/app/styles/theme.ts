import { extendTheme, type ThemeConfig } from '@chakra-ui/react';
import { Montserrat, IBM_Plex_Serif } from 'next/font/google';

const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false,
};

// Import the weights and subsets, add any other config here as well
const montserrat = Montserrat({
  weight: ['400'],
  subsets: ['latin'],
});

const ibmPlexSerif = IBM_Plex_Serif({
  weight: ['400'],
  subsets: ['latin'],
});

export const breakpoints = {
  sm: '48em',
  md: '62em',
  lg: '80em',
  xl: '96em',
  '2xl': '128em',
};

// 3. extend the theme
const theme = extendTheme({
  breakpoints,
  config,
  fonts: {
    body: `${montserrat.style.fontFamily}, serif`,
    heading: `${ibmPlexSerif.style.fontFamily}, serif`,
  },
  styles: {
    global: {
      'html, body': {
        fontFamily: `${montserrat.style.fontFamily}, serif`,
      },
      '.mapboxgl-map': {
        fontFamily: `${montserrat.style.fontFamily}, sans-serif !important`,
      },
    },
  },
});

export default theme;
