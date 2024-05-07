"use client";
import { Map } from "./components/Map";
import { useEffect, useRef, useState } from "react";
import { Coordinates, EventData } from "./types";
import SwiperCore from "swiper";
import { Scrollview } from "./components/Scrollview";
import moment from "moment";
import { BASE_URL } from "./constants";
import { distance } from "./utils";
import { DEFAULT_DET_COORDS } from "./components/Map/constants";
import { DateTab } from "./components/DateTab";

export default function Home() {
  const mapRef = useRef(null);
  const [todaysEvents, setTodaysEvents] = useState<EventData[]>([]);
  const [activeEvent, setActiveEvent] = useState<EventData | null>(null);
  const [swiperInstance, setSwiperInstance] = useState<SwiperCore>();
  const [selectedDate, setSelectedDate] = useState(moment());
  const [allEvents, setAllEvents] = useState<EventData[]>([]);
  const [location, setLocation] = useState<Coordinates | null>(null);

  useEffect(() => {
    if ("geolocation" in navigator) {
      // Retrieve latitude & longitude coordinates from `navigator.geolocation` Web API
      navigator.geolocation.getCurrentPosition(
        ({ coords }) => {
          const { latitude, longitude } = coords;
          setLocation({ lat: latitude, lng: longitude });
        },
        (error) => {
          setLocation(DEFAULT_DET_COORDS);
        }
      );
    } else {
      setLocation(DEFAULT_DET_COORDS);
    }
  }, []);

  useEffect(() => {
    if (location) {
      const url = BASE_URL + "/events";
      fetch(url, {
        mode: "cors",
        headers: {
          "Access-Control-Allow-Origin": "*",
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
      const todaysDate = selectedDate.format("YYYY-MM-DD");
      const filteredEvents = allEvents.filter((i) => i.date === todaysDate);
      const sortedEvents = sortEventsByDistance(filteredEvents, location);
      setTodaysEvents(sortedEvents);
      setActiveEvent(sortedEvents[0]);
    }
  }, [allEvents, selectedDate]);

  const sortEventsByDistance = (
    events: EventData[],
    center: { lat: number; lng: number }
  ) => {
    const sortable: EventData[] = [...events];

    sortable.sort(function (a: EventData, b: EventData) {
      const distanceA = distance(center.lat, center.lng, a.lat, a.lng);
      const distanceB = distance(center.lat, center.lng, b.lat, b.lng);
      return distanceA - distanceB;
    });
    return sortable;
  };

  const incrementDate = () => {
    const newDate = moment(selectedDate).add(1, "days");
    setSelectedDate(newDate);
  };

  const decrementDate = () => {
    if (selectedDate.isAfter(moment())) {
      const newDate = moment(selectedDate).subtract(1, "days");
      setSelectedDate(newDate);
    }
  };

  return (
    <main
      style={{
        overflow: "hidden",
      }}
    >
      <Map
        ref={mapRef}
        todaysEvents={todaysEvents}
        activeEvent={activeEvent}
        setActiveEvent={setActiveEvent}
        slideToIndex={(idx) => swiperInstance?.slideTo(idx)}
      />
      <DateTab
        selectedDate={selectedDate}
        incrementDate={incrementDate}
        decrementDate={decrementDate}
      />
      <Scrollview
        todaysEvents={todaysEvents}
        setSwiperInstance={setSwiperInstance}
        setActiveEvent={setActiveEvent}
      />
    </main>
  );
}
