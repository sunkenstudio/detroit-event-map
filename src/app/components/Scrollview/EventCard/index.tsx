import { Box, Image, Stack, HStack } from "@chakra-ui/react";
import { H4, H5 } from "../../Typography";
import { Info } from "@phosphor-icons/react";
import { EventData } from "@/app/types";

export const EventCard = ({ event }: { event: EventData }) => {
  const { title, img, location, price, url } = event;

  return (
    <Box height="100%" width="100%">
      <Image
        src={img}
        height="100%"
        width="100%"
        objectFit={"cover"}
        borderRadius={"1rem"}
      />
      <Stack zIndex={99} position={"absolute"} top={0} left={0} right={0}>
        <Box
          height={"5rem"}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          backgroundColor={"black"}
          shadow={"0px 4px 16px rgba(255, 255, 255, 0.7)"}
          overflow={"hidden"}
          textOverflow={"ellipsis"}
          p=".5rem"
          borderTopRadius={"1rem"}
        >
          <H4 color={"white"} textAlign={"center"}>
            {title}
          </H4>
        </Box>
        <Box
          backgroundColor={"black"}
          maxW={"48px"}
          p={".5rem"}
          borderRadius={".25rem"}
          shadow={"0px 4px 16px rgba(255, 255, 255, 0.7)"}
          m={".5rem"}
        >
          <a href={url} target="_blank" rel="noopener noreferrer">
            <Info color={"white"} size={32} />
          </a>
        </Box>
      </Stack>
      <HStack position={"absolute"} bottom={".5rem"} zIndex={99} left={".5rem"}>
        <H5
          opacity={1}
          color={"white"}
          backgroundColor={"black"}
          borderRadius={".25rem"}
          padding={".5rem"}
          display={"block"}
          shadow={"0px 4px 16px rgba(255, 255, 255, 0.7)"}
          maxW={"22vh"}
        >
          {location}
        </H5>
        {price && (
          <H5
            opacity={1}
            color={"white"}
            backgroundColor={"black"}
            borderRadius={".25rem"}
            padding={".5rem"}
            display={"block"}
            shadow={"0px 4px 16px rgba(255, 255, 255, 0.7)"}
            maxW={"22vh"}
          >
            {price}
          </H5>
        )}
      </HStack>
    </Box>
  );
};
