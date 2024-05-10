import { Box, Image, Stack, HStack, useTheme } from "@chakra-ui/react";
import { H4, Paragraph } from "../../Typography";
import { Info } from "@phosphor-icons/react";
import { EventData } from "@/app/types";

export const EventCard = ({ event }: { event: EventData }) => {
  const { title, img, location, price, url } = event;

  const theme = useTheme();

  return (
    <Box height="100%" width="100%" py={".25rem"}>
      <Image
        src={img}
        height="100%"
        width="100%"
        objectFit={"cover"}
        borderRadius={"1rem"}
        shadow={"1px 1px 5px black"}
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
          <H4
            color={"white"}
            textAlign={"center"}
            fontFamily={theme.fonts.body}
            noOfLines={2}
            overflow={"hidden"}
            maxH={"4rem"}
          >
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
        <Paragraph
          opacity={1}
          color={"white"}
          backgroundColor={"black"}
          borderRadius={".25rem"}
          padding={".5rem"}
          display={"block"}
          shadow={"0px 4px 16px rgba(255, 255, 255, 0.7)"}
          maxW={"22vh"}
          noOfLines={2}
          overflow={"hidden"}
          maxH={"4rem"}
        >
          {location}
        </Paragraph>
        {price && (
          <Paragraph
            opacity={1}
            color={"white"}
            backgroundColor={"black"}
            borderRadius={".25rem"}
            padding={".5rem"}
            display={"block"}
            shadow={"0px 4px 16px rgba(255, 255, 255, 0.7)"}
            maxW={"22vh"}
            noOfLines={2}
            overflow={"hidden"}
            maxH={"4rem"}
          >
            {price}
          </Paragraph>
        )}
      </HStack>
    </Box>
  );
};
