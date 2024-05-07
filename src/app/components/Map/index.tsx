"use client";
import React, { useEffect, forwardRef } from "react";
import { Map as MapboxMap, Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { EventData } from "@/app/types";
import { MapPin } from "@phosphor-icons/react";
import { DEFAULT_DET_COORDS } from "./constants";
import { Box } from "@chakra-ui/react";

// import the mapbox-gl styles so that the map is displayed correctly

interface MapProps {
  todaysEvents: EventData[];
  activeEvent: EventData | null;
  setActiveEvent: (event: EventData) => void;
  slideToIndex: (idx: number) => void;
}

export const Map = forwardRef(
  (
    { todaysEvents, activeEvent, setActiveEvent, slideToIndex }: MapProps,
    ref
  ) => {
    useEffect(() => {
      //@ts-ignore
      if (ref && ref.current && activeEvent) {
        const { lat, lng } = activeEvent;
        //@ts-ignore
        ref.current.flyTo({
          center: [lng, lat],
          zoom: 15,
        });
      }
    }, [activeEvent]);

    const handleMarkerOnClick = (id: string) => {
      const selectedIndex = todaysEvents.findIndex((i) => i._id === id);
      setActiveEvent(todaysEvents[selectedIndex]);
      slideToIndex(selectedIndex);
    };

    const renderMarkers = () => {
      return todaysEvents.map((i) => {
        const isActive = activeEvent && activeEvent?._id === i._id;
        return (
          <Marker
            key={`marker-${i._id}`}
            longitude={i.lng}
            latitude={i.lat}
            anchor="bottom"
            onClick={() => handleMarkerOnClick(i._id)}
            style={{ zIndex: isActive ? 1 : 0 }}
          >
            <MapPin
              color={isActive ? "red" : "black"}
              weight="fill"
              size={32}
            />
          </Marker>
        );
      });
    };

    return (
      <Box
        overflow={"hidden"}
        position={"absolute"}
        top={0}
        bottom={0}
        left={0}
        right={0}
        zIndex={0}
      >
        <MapboxMap
          mapboxAccessToken="pk.eyJ1IjoiZGFuaWVsd2FycmljayIsImEiOiJjbGk1YmhiNWIwcjlwM2dxcDY4OW81c2tkIn0.oqnbYny0_jq4AObxrCc04Q"
          initialViewState={{
            longitude: activeEvent?.lng || DEFAULT_DET_COORDS.lng,
            latitude: activeEvent?.lat || DEFAULT_DET_COORDS.lat,
            zoom: 11,
          }}
          mapStyle="mapbox://styles/mapbox/light-v11"
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 0,
          }}
          onLoad={(event) => {
            //@ts-ignore
            ref.current = event.target;
          }}
        >
          {renderMarkers()}
        </MapboxMap>
      </Box>
    );
  }
);
