import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  Stack,
  useDisclosure,
  Link,
  HStack,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Flex,
  Heading,
  Text,
  IconButton,
  Divider,
} from '@chakra-ui/react';
import { H3, H4, H5, Paragraph } from '../Typography';
import React, { useEffect, useState } from 'react';
import { List, UserCircle, MapPin, ArrowLeft } from '@phosphor-icons/react';
import { useFormik, FormikProvider } from 'formik';
import { InputField } from '../InputField';
import CreateSchema from './form.json';
import { isEmpty, snakeCase } from 'lodash';
import { EventData } from '@/app/types';
import { BASE_URL } from '@/app/utils';
import GoogleButton from 'react-google-button';
import { Link as LinkIcon } from '@phosphor-icons/react';
import moment from 'moment';
import { CreateEventForm } from './CreateEventForm';
import { EditEventForm } from './EditEventForm';

export const Header = () => {
  const [userId, setUserId] = useState<string>('');
  const [userEvents, setUserEvents] = useState<EventData[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<
    EventData | Record<string, never>
  >({});
  const aboutModal = useDisclosure();
  const userModal = useDisclosure();
  const aboutButtonRef = React.useRef(null);
  const userButtonRef = React.useRef(null);

  useEffect(() => {
    const searchString = window.location.search;
    const params = new URLSearchParams(searchString);
    const id = params.get('id');
    if (id) {
      setUserId(id);
    }
  }, []);

  useEffect(() => {
    if (userId) {
      // get user events
      const url = `${BASE_URL}/events/user/${userId}`;
      fetch(url, {
        mode: 'cors',
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
      })
        .then((res) => {
          return res.json();
        })
        .then((json: { events: EventData[] }) => {
          setUserEvents(json.events);
        })
        .catch((err) => console.log(err));
    }
  }, [userId]);

  const createAuthUser = async () => {
    const url = BASE_URL + '/auth/google';
    window.location.href = url;
  };

  function isFirstCharNumber(str: string) {
    if (!str) return str; // Check if the string is empty
    const firstChar = str.charAt(0);
    if (!isNaN(Number(firstChar))) {
      return `$${str}`;
    }
    return str;
  }

  const renderMyEvents = () => {
    const events = userEvents.filter((i) =>
      moment(i.date, 'YYYY-MM-DD').isSameOrAfter(moment(), 'day')
    );

    if (events.length === 0) {
      return <Paragraph>No events yet</Paragraph>;
    }
    return (
      <Stack spacing={'2rem'} divider={<Divider />}>
        {events.map((i) => (
          <Stack key={i._id}>
            <H5>{i.date}</H5>
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
                {i.location.toUpperCase()}
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
                      {i.title}
                    </Heading>
                  </Flex>
                </Flex>
              </CardHeader>
              <CardBody
                backgroundImage={i.img}
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
                    {isFirstCharNumber(i.price || '') ||
                      'Price not found. See link for details'}
                  </Text>
                  <Box backgroundColor={'#282929'} borderRadius={'5rem'}>
                    <Link href={i.url} target="_blank">
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
              <Button onClick={() => setSelectedEvent(i)}>EDIT</Button>
              <Button>DELETE</Button>
            </HStack>
          </Stack>
        ))}
      </Stack>
    );
  };

  return (
    <Box
      position={'absolute'}
      top={0}
      backgroundColor={'#000000e6'}
      color="white"
      h={'4rem'}
      display={'flex'}
      alignItems={'center'}
      justifyContent={'space-between'}
      width={'100vw'}
      px="1rem"
      shadow={'1px 1px 5px black'}
      whiteSpace={'nowrap'}
    >
      <H4 fontWeight={'bold'}>DETROIT EVENT MAP</H4>
      <HStack>
        <Button
          ref={userButtonRef}
          backgroundColor={'transparent'}
          onClick={userModal.onOpen}
        >
          <UserCircle size="32" color="white" />
        </Button>

        <Button
          ref={aboutButtonRef}
          backgroundColor={'transparent'}
          onClick={aboutModal.onOpen}
        >
          <List size="32" color="white" />
        </Button>
      </HStack>
      <Drawer
        isOpen={aboutModal.isOpen}
        placement="right"
        onClose={aboutModal.onClose}
        finalFocusRef={aboutButtonRef}
        size={{ base: 'full', md: 'lg' }}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton size={'lg'} zIndex={99} />
          <DrawerBody>
            <Stack gap={3}>
              <H3>ABOUT</H3>
              <Paragraph>
                {`I made this site to make it easier to see nearby stuff without
                having to dig through social media and tbh I've been spending
                too much time at home lately.`}
              </Paragraph>
              <Paragraph>
                {`Currently the app only tracks what's going on this week with `}
                <strong>
                  {`new events getting added every Sunday @ 9:00am`}
                </strong>
                {`. Could probably expand that out to a month if people wanted,
                but personally, I'm not that much of a planner.`}
              </Paragraph>
              <H3>SOURCES</H3>
              <ul>
                <li>
                  <Link href="https://www.metrotimes.com/" target="_blank">
                    Metro Times
                  </Link>
                </li>
                <li>More coming soon...</li>
              </ul>
              <Paragraph>
                {`Anything you see on this site is public data pulled from somewhere else. Please consider
                subscribing to the actual sources doing the real work. If you
                happen to meet anyone working for these sources, please buy them
                many beers.`}
              </Paragraph>
              <H3>COVERING MY ASS</H3>
              <Paragraph>
                <strong>IMPORTANT!</strong>
                {` All these events are just being
                pulled off the internet, so please
                don't show up if it looks like it could be some sketchy shit.`}
              </Paragraph>
              <Paragraph>
                {`I do not claim ownership of any content you see in these events
                and I am not currently monetizing this site in any way. You can
                find a link to the original sources by clicking the information
                icon on each event.`}
              </Paragraph>
              <H3>YOUR PRIVACY</H3>
              <Paragraph>
                <strong>{`I don't want your data. `}</strong>
                {`It's yours and it should stay that way. 
                When the site asks for your location, it's not storing that information anywhere. 
                It's just used to sort the events by distance from you. `}
                <strong>
                  The site is fully usable for finding events without enabling
                  location services
                </strong>
                {`, it'll just set your location to downtown.`}
                <br />
                <br />
                <strong>
                  For those of you looking to upload events, I need to keep an
                  email
                </strong>
                {` to make it possible to 
                edit and remove those events. Otherwise, I have no way of telling which events belong to which user.
                This is also gonna let us do some quality control and potentially block any spam or hateful events. 
                God knows the internet is full of assholes these days.`}
                <br />
                <br />
                {` That said, `}
                <strong>{`I'm encrypting everything`}</strong>
                {` and setting things up the best I can to keep that data safe from aforementioned assholes.`}
              </Paragraph>
              <H3>THANKS AGAIN</H3>
              <Paragraph>
                {`That's everything! Thanks for using Detroit Event Map and feel
                free to drop me a message at `}
                <Link href="mailto:dan@sunkenstudio.com">
                  dan@sunkenstudio.com
                </Link>
                {` with any questions, comments, concerns.`}
              </Paragraph>
              <Paragraph>Much love,</Paragraph>
              <Paragraph>- D.</Paragraph>
            </Stack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
      <Drawer
        isOpen={userModal.isOpen}
        placement="right"
        onClose={userModal.onClose}
        finalFocusRef={userButtonRef}
        size={{ base: 'full', md: 'lg' }}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton size={'lg'} zIndex={99} />
          {userId ? (
            <DrawerBody
              display={'flex'}
              justifyContent={'space-between'}
              flexDirection={'column'}
            >
              <Tabs variant="soft-rounded" colorScheme="red">
                <TabList mb="1em">
                  <Tab>My Events</Tab>
                  <Tab>Create Event</Tab>
                  <Button
                    onClick={() => {
                      setUserId('');
                      userModal.onClose();
                    }}
                    backgroundColor={'transparent'}
                  >
                    Log Out
                  </Button>
                </TabList>
                <Divider />
                <TabPanels>
                  <TabPanel>
                    {isEmpty(selectedEvent) ? (
                      renderMyEvents()
                    ) : (
                      <>
                        <Button
                          backgroundColor={'transparent'}
                          onClick={() => setSelectedEvent({})}
                          mb={'1rem'}
                        >
                          <ArrowLeft size="32" />
                        </Button>
                        <EditEventForm event={selectedEvent as EventData} />
                      </>
                    )}
                  </TabPanel>
                  <TabPanel>
                    <CreateEventForm />
                  </TabPanel>
                </TabPanels>
              </Tabs>
            </DrawerBody>
          ) : (
            <DrawerBody>
              <Stack
                justifyContent={'center'}
                alignItems={'center'}
                spacing={'3rem'}
              >
                <H3>Login / Create Account</H3>
                <H5>
                  This is just for artists/venues looking to create events
                </H5>
                <GoogleButton onClick={() => createAuthUser()} />
              </Stack>
            </DrawerBody>
          )}
        </DrawerContent>
      </Drawer>
    </Box>
  );
};
