'use client';
import { ChakraProvider } from '@chakra-ui/react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import theme from './styles/theme';
import React from 'react';

export function Providers({ children }: { children: React.ReactNode }) {
  const googleClientId = process.env.NEXT_PUBLIC_GOOGLE_API_ID as string;
  return (
    <GoogleOAuthProvider clientId={googleClientId}>
      <ChakraProvider theme={theme}>{children}</ChakraProvider>
    </GoogleOAuthProvider>
  );
}
