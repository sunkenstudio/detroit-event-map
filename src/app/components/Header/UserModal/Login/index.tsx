import { H3, H5 } from '@/app/components/Typography';
import { BASE_URL } from '@/app/utils';
import { DrawerBody, Stack } from '@chakra-ui/react';
import React from 'react';
import GoogleButton from 'react-google-button';

export const Login = () => {
  const createAuthUser = async () => {
    const url = BASE_URL + '/auth/google';
    window.location.href = url;
  };

  return (
    <DrawerBody>
      <Stack justifyContent={'center'} alignItems={'center'} spacing={'3rem'}>
        <H3>Login / Create Account</H3>
        <H5>This is just for artists/venues looking to create events</H5>
        <GoogleButton onClick={() => createAuthUser()} />
      </Stack>
    </DrawerBody>
  );
};
