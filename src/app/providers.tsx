"use client";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "./styles/theme";
import React from "react";

export function Providers({ children }: { children: React.ReactNode }) {
  console.log({ theme, children });
  return <ChakraProvider theme={theme}>{children}</ChakraProvider>;
}
