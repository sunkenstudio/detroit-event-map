import { extendTheme, type ThemeConfig } from "@chakra-ui/react";
import { Montserrat } from "next/font/google";

const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

// Import the weights and subsets, add any other config here as well
const nextFont = Montserrat({
  weight: ["400"],
  subsets: ["latin"],
});

export const breakpoints = {
  sm: "48em",
  md: "62em",
  lg: "80em",
  xl: "96em",
  "2xl": "128em",
};

// 3. extend the theme
const theme = extendTheme({
  breakpoints,
  config,
  fonts: {
    body: `${nextFont.style.fontFamily}, serif`,
    heading: `${nextFont.style.fontFamily}, serif`,
  },
});

export default theme;
