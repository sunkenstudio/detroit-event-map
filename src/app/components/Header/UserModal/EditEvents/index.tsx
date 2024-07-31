import { Paragraph } from '@/app/components/Typography';
import { Button, Divider, Stack, TabPanel } from '@chakra-ui/react';
import { isEmpty } from 'lodash';
import moment from 'moment';
import React, { useState } from 'react';
import { EditCard } from './EditCard';
import { ArrowLeft } from '@phosphor-icons/react';
import { EditEventForm } from './EditEventForm';
import { EventData } from '@/app/types';

interface EditEventsProps {
  userId: string;
  userEvents: EventData[];
}

export const EditEvents = ({ userId, userEvents }: EditEventsProps) => {
  const [selectedEvent, setSelectedEvent] = useState<
    EventData | Record<string, never>
  >({});

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

  const renderEditEvents = () => (
    <>
      <Button
        backgroundColor={'transparent'}
        onClick={() => setSelectedEvent({})}
        mb={'1rem'}
      >
        <ArrowLeft size="32" />
      </Button>
      <EditEventForm userId={userId} event={selectedEvent as EventData} />
    </>
  );

  return (
    <TabPanel>
      {isEmpty(selectedEvent) ? renderMyEvents() : renderEditEvents()}
    </TabPanel>
  );
};
