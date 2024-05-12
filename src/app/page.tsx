'use client';
import { Map } from './components/Map';
import { useEffect, useRef, useState } from 'react';
import { Coordinates, EventData } from './types';
import SwiperCore from 'swiper';
import { Scrollview } from './components/Scrollview';
import moment from 'moment';
import { BASE_URL, sortEventsByDistance } from './utils';
import { DEFAULT_DET_COORDS } from './components/Map/constants';
import { DateTab } from './components/DateTab';
import { Box, Button } from '@chakra-ui/react';
import { ArrowCircleDown, ArrowCircleUp } from '@phosphor-icons/react';
import { Header } from './components/Header';

export default function Home() {
  const mapRef = useRef(null);
  const [todaysEvents, setTodaysEvents] = useState<EventData[]>([]);
  const [activeEvent, setActiveEvent] = useState<EventData | null>(null);
  const [swiperInstance, setSwiperInstance] = useState<SwiperCore>();
  const [selectedDate, setSelectedDate] = useState(moment());
  const [allEvents, setAllEvents] = useState<EventData[]>([]);
  const [location, setLocation] = useState<Coordinates | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [initialExpand, setInitialExpand] = useState(false);
  useEffect(() => {
    if ('geolocation' in navigator) {
      // Retrieve latitude & longitude coordinates from `navigator.geolocation` Web API
      navigator.geolocation.getCurrentPosition(
        ({ coords }) => {
          const { latitude, longitude } = coords;
          setLocation({ lat: latitude, lng: longitude });
        },
        (error) => {
          console.log(error);
          setLocation(DEFAULT_DET_COORDS);
        }
      );
    } else {
      setLocation(DEFAULT_DET_COORDS);
    }
  }, []);

  useEffect(() => {
    if (location) {
      const url = BASE_URL + '/events';
      fetch(url, {
        mode: 'cors',
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
      })
        .then((res) => {
          return res.json();
        })
        .then((events: EventData[]) => {
          setAllEvents(events);
          // setIsLoading(false);
        })
        .catch((err) => console.log(err));
    }
  }, [location]);

  useEffect(() => {
    if (allEvents.length > 0 && location) {
      const todaysDate = selectedDate.format('YYYY-MM-DD');
      const filteredEvents = allEvents.filter((i) => i.date === todaysDate);
      const sortedEvents = sortEventsByDistance(filteredEvents, location);
      setTodaysEvents(sortedEvents);
      if (sortedEvents.length > 0) {
        setActiveEvent(sortedEvents[0]);
        swiperInstance?.slideTo(0);
        const { lat, lng } = sortedEvents[0];
        //@ts-ignore
        mapRef.current?.flyTo({
          center: [lng, lat],
          zoom: 15,
        });
      }
      if (!initialExpand) {
        setTimeout(() => setIsExpanded(true), 1500);
        setInitialExpand(true);
      }
    }
  }, [allEvents, selectedDate]);

  const incrementDate = () => {
    const newDate = moment(selectedDate).add(1, 'days');
    setSelectedDate(newDate);
  };

  const decrementDate = () => {
    if (selectedDate.isAfter(moment())) {
      const newDate = moment(selectedDate).subtract(1, 'days');
      setSelectedDate(newDate);
    }
  };

  return (
    <main style={{ height: '100dvh', width: '100vw', overflow: 'hidden' }}>
      <Map
        ref={mapRef}
        todaysEvents={todaysEvents}
        activeEvent={activeEvent}
        setActiveEvent={setActiveEvent}
        slideToIndex={(idx) => swiperInstance?.slideTo(idx)}
      />
      <Header />
      <DateTab
        selectedDate={selectedDate}
        incrementDate={incrementDate}
        decrementDate={decrementDate}
      />
      {todaysEvents.length > 0 && (
        <Box
          position={'absolute'}
          bottom={'48dvh'}
          style={{
            transform: isExpanded ? 'translateY(0)' : 'translateY(30dvh)',
            transition: 'transform 0.3s ease',
          }}
        >
          <Button
            onClick={() => setIsExpanded(!isExpanded)}
            p={'.5rem'}
            borderRadius={'.25rem'}
            ml={'.25rem'}
            backgroundColor={'transparent'}
          >
            {isExpanded ? (
              <ArrowCircleDown size={48} />
            ) : (
              <ArrowCircleUp size={48} />
            )}
          </Button>
        </Box>
      )}
      <Scrollview
        todaysEvents={todaysEvents}
        isExpanded={isExpanded}
        setSwiperInstance={setSwiperInstance}
        setActiveEvent={setActiveEvent}
      />
    </main>
  );
}
