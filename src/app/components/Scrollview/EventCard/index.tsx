import { EventData } from "@/app/types";
import { Box, Image, Stack, HStack } from "@chakra-ui/react";
import { H4, H5 } from "../../Typography";
import { Info } from "@phosphor-icons/react";

export const EventCard = ({ event }: { event: EventData }) => {
  const { title, img, location, price, url } = event;
  return (
    <Box
      height={"45vh"}
      maxW={"45vh"}
      zIndex={10}
      display={"flex"}
      alignItems={"center"}
      justifyContent={"center"}
      position={"relative"}
      margin={".5rem"}
    >
      <Image top={0} src={img} height="45vh" width="45vh" objectFit={"cover"} />
      <Stack
        position={"absolute"}
        top={0}
        zIndex={99}
        left={0}
        right={0}
        gap={0}
      >
        <H4
          opacity={1}
          color={"white"}
          backgroundColor={"black"}
          w="100%"
          padding={"1rem"}
          textAlign={"center"}
          borderBottom={"1px solid white"}
        >
          {title}
        </H4>
        <Box
          backgroundColor={"black"}
          maxW={"48px"}
          margin={".75rem"}
          p={".5rem"}
          borderRadius={".5rem"}
          boxShadow={"1px 1px 3px white"}
        >
          <a href={url} target="_blank">
            <Info color={"white"} size={32} />
          </a>
        </Box>
      </Stack>
      <HStack
        position={"absolute"}
        bottom={0}
        zIndex={99}
        left={0}
        margin={"1rem"}
      >
        <H5
          opacity={1}
          color={"white"}
          backgroundColor={"black"}
          borderRadius={".5rem"}
          padding={".5rem"}
          display={"block"}
          boxShadow={"1px 1px 3px white"}
        >
          {location}
        </H5>
        {price && (
          <H5
            opacity={1}
            color={"white"}
            backgroundColor={"black"}
            borderRadius={".5rem"}
            padding={".5rem"}
            display={"block"}
            boxShadow={"1px 1px 3px white"}
            css={{ width: "unset" }}
          >
            {price}
          </H5>
        )}
      </HStack>
    </Box>
  );
};
