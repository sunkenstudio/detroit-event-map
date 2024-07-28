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
} from '@chakra-ui/react';
import { H3, H4, H5, Paragraph } from '../Typography';
import React, { useState } from 'react';
import { List, UserCircle } from '@phosphor-icons/react';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { useFormik, FormikProvider } from 'formik';
import { InputField } from '../InputField';
import CreateSchema from './form.json';
import { snakeCase } from 'lodash';

export const Header = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const aboutModal = useDisclosure();
  const userModal = useDisclosure();
  const aboutButtonRef = React.useRef(null);
  const userButtonRef = React.useRef(null);

  const handleGoogleAuthResponse = (response) => {
    console.log(response);
    const decoded = jwtDecode(response.credential);
    console.log(decoded);
    setIsAuthenticated(true);
  };
  const handleGoogleAuthError = (error) => {
    console.log(error);
  };

  const formik = useFormik({
    initialValues: {} as Record<string, string>,
    onSubmit: () => {
      console.log(formik.values);
    },
  });

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
          <DrawerCloseButton size={'lg'} />
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
          <DrawerCloseButton size={'lg'} />
          {isAuthenticated ? (
            <DrawerBody
              display={'flex'}
              justifyContent={'space-between'}
              flexDirection={'column'}
            >
              <Tabs variant="soft-rounded" colorScheme="red">
                <TabList mb="1em">
                  <Tab>My Events</Tab>
                  <Tab>Create Event</Tab>
                  <Tab>Log Out</Tab>
                </TabList>
                <TabPanels>
                  <TabPanel>
                    <Paragraph>No events yet</Paragraph>
                  </TabPanel>
                  <TabPanel>
                    <FormikProvider value={formik}>
                      <form
                        onSubmit={formik.handleSubmit}
                        style={{
                          display: 'flex',
                          width: '100%',
                          justifyContent: 'center',
                        }}
                      >
                        <Stack w={'100%'}>
                          {CreateSchema.map((i) => {
                            const key = snakeCase(i.label);
                            return (
                              <InputField
                                key={key}
                                id={key}
                                //@ts-ignore
                                field={i}
                                value={formik?.values?.[key]}
                                onChange={formik.handleChange}
                              />
                            );
                          })}
                          <Paragraph>
                            {`You can use this `}
                            <Link
                              href="https://www.gps-coordinates.net/"
                              color="blue"
                            >
                              LINK
                            </Link>
                            {` to get the coordinates, I promise I will fix this next so alls you need is an address.`}
                          </Paragraph>
                          <Button
                            type="submit"
                            // isLoading={isFiring}
                            w={'100%'}
                          >
                            SUBMIT
                          </Button>
                        </Stack>
                      </form>
                    </FormikProvider>
                  </TabPanel>
                  <TabPanel>
                    <Button
                      onClick={() => {
                        setIsAuthenticated(false);
                        userModal.onClose();
                      }}
                    >
                      LOG OUT
                    </Button>
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
                <GoogleLogin
                  onSuccess={handleGoogleAuthResponse}
                  onError={handleGoogleAuthError}
                  scope={'profile email'} // Requesting profile and email scopes
                />
              </Stack>
            </DrawerBody>
          )}
        </DrawerContent>
      </Drawer>
    </Box>
  );
};
