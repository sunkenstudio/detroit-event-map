import {
  Button,
  Divider,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  Tab,
  TabList,
  TabPanels,
  Tabs,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { ChakraDisclosureProps, EventData } from '@/app/types';
import { CreateEvents } from './CreateEvents';
import { BASE_URL } from '@/app/utils';
import { Login } from './Login';
import { EditEvents } from './EditEvents';

interface UserModalProps {
  buttonRef: React.MutableRefObject<null>;
  modalProps: ChakraDisclosureProps;
}

export const UserModal = ({ buttonRef, modalProps }: UserModalProps) => {
  const [userId, setUserId] = useState<string>('');
  const [userEvents, setUserEvents] = useState<EventData[]>([]);

  useEffect(() => {
    const searchString = window.location.search;
    const params = new URLSearchParams(searchString);
    const id = params.get('id');
    if (id) {
      setUserId(id);
    }
  }, []);

  useEffect(() => {
    if (userId) {
      getUserEvents();
    }
  }, [userId]);

  const getUserEvents = () => {
    console.log('getUserEvents');
    // get user events
    const url = `${BASE_URL}/events/user/${userId}`;
    fetch(url, {
      mode: 'cors',
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((json: { events: EventData[] }) => {
        setUserEvents(json.events);
      })
      .catch((err) => console.log(err));
  };

  const renderEventsPage = () => (
    <DrawerBody
      display={'flex'}
      justifyContent={'space-between'}
      flexDirection={'column'}
    >
      <Tabs variant="soft-rounded" colorScheme="red">
        <TabList mb="1em">
          <Tab>My Events</Tab>
          <Tab>Create Event</Tab>
          <Button
            onClick={() => {
              setUserId('');
              modalProps.onClose();
            }}
            backgroundColor={'transparent'}
          >
            Log Out
          </Button>
        </TabList>
        <Divider />
        <TabPanels>
          <EditEvents
            userId={userId}
            userEvents={userEvents}
            getUserEvents={() => getUserEvents()}
          />
          <CreateEvents getUserEvents={() => getUserEvents()} />
        </TabPanels>
      </Tabs>
    </DrawerBody>
  );

  return (
    <Drawer
      isOpen={modalProps.isOpen}
      placement="right"
      onClose={modalProps.onClose}
      finalFocusRef={buttonRef}
      size={{ base: 'full', md: 'lg' }}
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton size={'lg'} zIndex={99} />
        {!userId ? <Login /> : renderEventsPage()}
      </DrawerContent>
    </Drawer>
  );
};
