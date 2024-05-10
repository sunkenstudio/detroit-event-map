import React from "react";
import moment, { Moment } from "moment";
import { Box, Button, HStack, Text } from "@chakra-ui/react";
import { CaretCircleRight, CaretCircleLeft } from "@phosphor-icons/react";

interface DateTabProps {
  selectedDate: Moment;
  incrementDate: Function;
  decrementDate: Function;
}

export const DateTab = ({
  selectedDate,
  incrementDate,
  decrementDate,
}: DateTabProps) => {
  const getFormattedDate = () => {
    if (selectedDate.isSame(moment(), "day")) {
      return "Today";
    }
    if (selectedDate.isSame(moment().add(1, "day"), "day")) {
      return "Tomorrow";
    }
    if (selectedDate.isSame(moment(), "month")) {
      return selectedDate.format("dddd [the] Do");
    }
    return selectedDate.format("dddd MMM Do");
  };
  const formattedDate = getFormattedDate();
  return (
    <HStack
      gap={3}
      position={"absolute"}
      top={"4.5rem"}
      justifyContent={"center"}
      alignItems={"center"}
      width={"100%"}
      textAlign={"center"}
    >
      {formattedDate !== "Today" ? (
        <Button backgroundColor="transparent" onClick={() => decrementDate()}>
          <CaretCircleLeft size={32} />
        </Button>
      ) : (
        <Box h={"32px"} w={"32px"} />
      )}
      <Text>{formattedDate}</Text>
      <Button backgroundColor="transparent" onClick={() => incrementDate()}>
        <CaretCircleRight size={32} />
      </Button>
    </HStack>
  );
};
