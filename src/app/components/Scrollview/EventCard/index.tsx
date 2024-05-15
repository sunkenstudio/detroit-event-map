import { HStack, Text, Flex, Heading, IconButton, Box } from '@chakra-ui/react';
import { ArrowSquareOut } from '@phosphor-icons/react';
import { EventData } from '@/app/types';
import { Card, CardHeader, CardBody, CardFooter } from '@chakra-ui/react';
import Link from 'next/link';

export const EventCard = ({ event }: { event: EventData }) => {
  const { title, img, location, price, url } = event;

  return (
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
              {title}
            </Heading>
          </Flex>
        </Flex>
      </CardHeader>

      <CardBody
        backgroundImage={img}
        backgroundPosition={'top'}
        minH={{ base: '10rem', md: '15rem' }}
      ></CardBody>
      <CardFooter h={'5rem'}>
        <HStack width="100%">
          <Text
            color="white"
            backgroundColor={'#9D121A'}
            padding={'.5rem'}
            borderRadius={'.25rem'}
            textOverflow={'ellipsis'}
            noOfLines={1}
            overflow={'hidden'}
            fontSize={{ base: '.8rem', md: '1rem' }}
            textAlign={'center'}
          >
            {location}
          </Text>
          {price && (
            <Text
              color="white"
              backgroundColor={'#9D121A'}
              padding={'.5rem'}
              borderRadius={'.25rem'}
              textOverflow={'ellipsis'}
              noOfLines={{ base: 1, md: 1 }}
              maxW={'50%'}
              overflow={'hidden'}
              fontSize={{ base: '.8rem', md: '1rem' }}
              textAlign={'center'}
            >
              {price}
            </Text>
          )}
        </HStack>
        <Box backgroundColor={'#282929'} borderRadius={'5rem'}>
          <Link href={url} target="_blank">
            <IconButton
              variant="ghost"
              colorScheme="gray"
              aria-label="See menu"
              icon={<ArrowSquareOut size={28} color={'#FEFEFE'} />}
            />
          </Link>
        </Box>
      </CardFooter>
    </Card>
  );
};
