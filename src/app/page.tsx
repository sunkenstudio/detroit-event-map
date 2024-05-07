"use client";
import styles from "./page.module.css";
import { Map } from "./components/Map";
import { useEffect, useRef, useState } from "react";
import { EventData } from "./types";
import SwiperCore from "swiper";
import { Scrollview } from "./components/Scrollview";
import moment from "moment";
import { BASE_URL } from "./constants";
import { Providers } from "./providers";

export default function Home() {
  const mapRef = useRef(null);
  const [todaysEvents, setTodaysEvents] = useState<EventData[]>([]);
  const [activeEvent, setActiveEvent] = useState<EventData | null>(null);
  const [swiperInstance, setSwiperInstance] = useState<SwiperCore>();
  const [selectedDate, setSelectedDate] = useState(moment().add(3, "days"));
  const [allEvents, setAllEvents] = useState<EventData[]>([]);

  useEffect(() => {
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

        const todaysDate = selectedDate.format("YYYY-MM-DD");
        const filteredEvents = events.filter((i) => i.date === todaysDate);
        setTodaysEvents(filteredEvents);
        setActiveEvent(filteredEvents[0]);

        // setIsLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

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
      <Scrollview
        todaysEvents={todaysEvents}
        setSwiperInstance={setSwiperInstance}
        setActiveEvent={setActiveEvent}
      />
    </main>
  );
}
