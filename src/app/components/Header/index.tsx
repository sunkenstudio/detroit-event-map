import { Box, Button, useDisclosure, HStack } from '@chakra-ui/react';
import { H4 } from '../Typography';
import React from 'react';
import { List, UserCircle } from '@phosphor-icons/react';
import { AboutModal } from './AboutModal';
import { UserModal } from './UserModal';

export const Header = () => {
  const aboutModal = useDisclosure();
  const userModal = useDisclosure();
  const aboutButtonRef = React.useRef(null);
  const userButtonRef = React.useRef(null);

  return (
    <Box
      position={'absolute'}
      top={0}
      backgroundColor={'#000000e6'}
      color="white"
      h={'4rem'}
      display={'flex'}
      alignItems={'center'}
      justifyContent={'space-between'}
      width={'100vw'}
      px="1rem"
      shadow={'1px 1px 5px black'}
      whiteSpace={'nowrap'}
    >
      <H4 fontWeight={'bold'}>DETROIT EVENT MAP</H4>
      <HStack>
        <Button
          ref={userButtonRef}
          backgroundColor={'transparent'}
          onClick={userModal.onOpen}
        >
          <UserCircle size="32" color="white" />
        </Button>

        <Button
          ref={aboutButtonRef}
          backgroundColor={'transparent'}
          onClick={aboutModal.onOpen}
        >
          <List size="32" color="white" />
        </Button>
      </HStack>
      <AboutModal buttonRef={aboutButtonRef} modalProps={aboutModal} />
      <UserModal buttonRef={userButtonRef} modalProps={userModal} />
    </Box>
  );
};
