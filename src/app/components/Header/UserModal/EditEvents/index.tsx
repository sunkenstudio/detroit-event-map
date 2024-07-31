import { Paragraph } from '@/app/components/Typography';
import { Button, Divider, Stack, TabPanel } from '@chakra-ui/react';
import { isEmpty } from 'lodash';
import moment from 'moment';
import React, { useState } from 'react';
import { EditCard } from './EditCard';
import { ArrowLeft } from '@phosphor-icons/react';
import { EditEventForm } from './EditEventForm';
import { EventData } from '@/app/types';
import axios from 'axios';
import { BASE_URL } from '@/app/utils';
import { toast } from 'react-toastify';

interface EditEventsProps {
  userId: string;
  userEvents: EventData[];
  getUserEvents: () => void;
}

export const EditEvents = ({
  userId,
  userEvents,
  getUserEvents,
}: EditEventsProps) => {
  const [selectedEvent, setSelectedEvent] = useState<
    EventData | Record<string, never>
  >({});
  const [isFiring, setIsFiring] = useState(false);

  const deleteEvent = (eventId: string) => {
    setIsFiring(true);
    axios
      .delete(`${BASE_URL}/events/${eventId}`, { data: { userId } })
      .then(() => {
        setTimeout(() => {
          setIsFiring(false);
          toast.success('Event Removed!', {
            position: 'top-center',
          });
          getUserEvents();
        }, 1500);
      })
      .catch((err) => {
        setTimeout(() => {
          toast.error('Failed to Remove', {
            position: 'top-center',
          });
          console.log(err);
          setIsFiring(false);
        }, 1500);
      });
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
            isFiring={isFiring}
            handleEdit={() => setSelectedEvent(i)}
            handleDelete={() => deleteEvent(i._id)}
          />
        ))}
      </Stack>
    );
  };

  const renderEditEvents = () => (
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
        getUserEvents={() => getUserEvents()}
      />
    </>
  );

  return (
    <TabPanel>
      {isEmpty(selectedEvent) ? renderMyEvents() : renderEditEvents()}
    </TabPanel>
  );
};
