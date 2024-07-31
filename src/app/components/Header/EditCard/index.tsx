import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Flex,
  Heading,
  HStack,
  IconButton,
  Stack,
  Text,
} from '@chakra-ui/react';
import React from 'react';
import { H5 } from '../../Typography';
import { MapPin } from '@phosphor-icons/react';
import Link from 'next/link';
import { Link as LinkIcon } from '@phosphor-icons/react';
import { EventData } from '@/app/types';

interface EditCardProps {
  event: EventData;
  handleEdit: () => void;
}

export const EditCard = ({ event, handleEdit }: EditCardProps) => {
  function isFirstCharNumber(str: string) {
    if (!str) return str; // Check if the string is empty
    const firstChar = str.charAt(0);
    if (!isNaN(Number(firstChar))) {
      return `$${str}`;
    }
    return str;
  }
  return (
    <Stack key={event._id}>
      <H5>{event.date}</H5>
      <HStack>
        <MapPin color={'red'} weight="fill" size={32} />
        <Text
          backgroundColor={'#9D121A'}
          color="white"
          padding={'.5rem'}
          border={'.1rem solid white'}
          borderRadius={'.5rem'}
          fontWeight={'bold'}
        >
          {event.location.toUpperCase()}
        </Text>
      </HStack>
      <Card size={'md'} backgroundColor={'#FEFEFE'}>
        <CardHeader
          h={'4rem'}
          paddingTop={0}
          backgroundColor={'#9D121A'}
          color="#FEFEFE"
          borderTopRadius={'inherit'}
        >
          <Flex alignItems="center" height={'4rem'} w="100%">
            <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
              <Heading size="md" textOverflow={'ellipsis'} noOfLines={2}>
                {event.title}
              </Heading>
            </Flex>
          </Flex>
        </CardHeader>
        <CardBody
          backgroundImage={event.img}
          backgroundRepeat={'no-repeat'}
          backgroundSize={'cover'}
          backgroundPosition={'top'}
          minH={{ base: '10rem', md: '15rem' }}
        ></CardBody>
        <CardFooter padding={'.5rem'} overflow={'hidden'}>
          <HStack w={'100%'} justifyContent={'space-between'}>
            <Text
              color="white"
              backgroundColor={'#9D121A'}
              padding={'.5rem'}
              borderRadius={'.25rem'}
              fontSize={{ base: '.8rem', md: '1rem' }}
              textAlign={'center'}
              noOfLines={1}
              overflow="hidden"
              textOverflow="ellipsis"
              whiteSpace="nowrap"
              minW="25%"
            >
              {isFirstCharNumber(event.price || '') ||
                'Price not found. See link for details'}
            </Text>
            <Box backgroundColor={'#282929'} borderRadius={'5rem'}>
              <Link href={event.url} target="_blank">
                <IconButton
                  variant="ghost"
                  colorScheme="gray"
                  aria-label="See menu"
                  icon={<LinkIcon size={28} color={'#FEFEFE'} />}
                />
              </Link>
            </Box>
          </HStack>
        </CardFooter>
      </Card>
      <HStack>
        <Button onClick={handleEdit}>EDIT</Button>
        <Button>DELETE</Button>
      </HStack>
    </Stack>
  );
};
