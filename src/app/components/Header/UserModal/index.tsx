import {
  Button,
  Divider,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from '@chakra-ui/react';
import { ArrowLeft } from '@phosphor-icons/react';
import { isEmpty } from 'lodash';
import React, { useEffect, useState } from 'react';
import { EditEventForm } from './EditEventForm';
import { EventData } from '@/app/types';
import { CreateEventForm } from './CreateEventForm';
import { H3, H5, Paragraph } from '../../Typography';
import GoogleButton from 'react-google-button';
import { BASE_URL } from '@/app/utils';
import moment from 'moment';
import { EditCard } from './EditCard';

interface UserModalProps {
  buttonRef: React.MutableRefObject<null>;
  modalProps: {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
    onToggle: () => void;
    isControlled: boolean;
    getButtonProps: (props?: any) => any;
    getDisclosureProps: (props?: any) => any;
  };
}
export const UserModal = ({ buttonRef, modalProps }: UserModalProps) => {
  const [userId, setUserId] = useState<string>('');
  const [userEvents, setUserEvents] = useState<EventData[]>([]);

  const [selectedEvent, setSelectedEvent] = useState<
    EventData | Record<string, never>
  >({});

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
    }
  }, [userId]);

  const createAuthUser = async () => {
    const url = BASE_URL + '/auth/google';
    window.location.href = url;
  };

  const renderMyEvents = () => {
    const events = userEvents.filter((i) =>
      moment(i.date, 'YYYY-MM-DD').isSameOrAfter(moment(), 'day')
    );

    if (events.length === 0) {
      return <Paragraph>No events yet</Paragraph>;
    }
    return (
      <Stack spacing={'2rem'} divider={<Divider />}>
        {events.map((i) => (
          <EditCard
            key={i._id}
            event={i}
            handleEdit={() => setSelectedEvent(i)}
          />
        ))}
      </Stack>
    );
  };

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
        {userId ? (
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
                <TabPanel>
                  {isEmpty(selectedEvent) ? (
                    renderMyEvents()
                  ) : (
                    <>
                      <Button
                        backgroundColor={'transparent'}
                        onClick={() => setSelectedEvent({})}
                        mb={'1rem'}
                      >
                        <ArrowLeft size="32" />
                      </Button>
                      <EditEventForm
                        userId={userId}
                        event={selectedEvent as EventData}
                      />
                    </>
                  )}
                </TabPanel>
                <TabPanel>
                  <CreateEventForm />
                </TabPanel>
              </TabPanels>
            </Tabs>
          </DrawerBody>
        ) : (
          <DrawerBody>
            <Stack
              justifyContent={'center'}
              alignItems={'center'}
              spacing={'3rem'}
            >
              <H3>Login / Create Account</H3>
              <H5>This is just for artists/venues looking to create events</H5>
              <GoogleButton onClick={() => createAuthUser()} />
            </Stack>
          </DrawerBody>
        )}
      </DrawerContent>
    </Drawer>
  );
};
