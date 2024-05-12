import React, { Dispatch, SetStateAction } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';

import 'swiper/css';
import 'swiper/css/pagination';
import { EventData } from '@/app/types';
import { Box } from '@chakra-ui/react';
import { EventCard } from './EventCard';

interface ScrollviewProps {
  todaysEvents: EventData[];
  isExpanded: boolean;
  setActiveEvent: Dispatch<SetStateAction<EventData | null>>;
  setSwiperInstance: Dispatch<SetStateAction<SwiperCore>>;
}

export const Scrollview = ({
  todaysEvents,
  isExpanded,
  setActiveEvent,
  setSwiperInstance,
}: ScrollviewProps) => {
  const transformStyle = isExpanded ? 'translateY(0)' : 'translateY(30dvh)';

  const renderCards = () => {
    return todaysEvents.map((i) => (
      <SwiperSlide
        key={`card-${i._id}`}
        style={{ width: '45dvh', height: '45dvh' }}
      >
        <EventCard event={i} />
      </SwiperSlide>
    ));
  };

  if (todaysEvents.length > 0) {
    return (
      <Box
        zIndex={999}
        position={'absolute'}
        bottom={'1rem'}
        left={0}
        right={0}
        height={'45dvh'}
        style={{ transform: transformStyle, transition: 'transform 0.3s ease' }}
      >
        <Swiper
          onSwiper={setSwiperInstance}
          slidesPerView={1.25}
          spaceBetween={20}
          centeredSlides={true}
          onSlideChange={(swiperCore) => {
            const { activeIndex } = swiperCore;
            setActiveEvent(todaysEvents[activeIndex]);
          }}
          breakpoints={{
            1024: {
              slidesPerView: 3.5,
              spaceBetween: 10,
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
