import React, { Dispatch, SetStateAction } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import { EventData } from "@/app/types";
import { Box } from "@chakra-ui/react";
import { EventCard } from "./EventCard";

interface ScrollviewProps {
  todaysEvents: EventData[];
  setActiveEvent: Dispatch<SetStateAction<EventData | null>>;
  setSwiperInstance: Dispatch<SetStateAction<any>>;
}
export const Scrollview = ({
  todaysEvents,
  setActiveEvent,
  setSwiperInstance,
}: ScrollviewProps) => {
  const renderCards = () => {
    return todaysEvents.map((i) => (
      <SwiperSlide key={`card-${i._id}`}>
        <EventCard event={i} />
      </SwiperSlide>
    ));
  };

  if (todaysEvents.length > 0) {
    return (
      <Box
        overflow={"hidden"}
        zIndex={999}
        position={"absolute"}
        bottom={0}
        left={0}
        right={0}
        height={"45vh"}
      >
        <Swiper
          onSwiper={setSwiperInstance}
          slidesPerView={1}
          spaceBetween={10}
          centeredSlides={true}
          onSlideChange={(swiperCore) => {
            const { activeIndex } = swiperCore;
            setActiveEvent(todaysEvents[activeIndex]);
          }}
          breakpoints={{
            1024: {
              slidesPerView: 3,
              spaceBetween: 50,
            },
          }}
        >
          {renderCards()}
        </Swiper>
      </Box>
    );
  }
  return null;
};
