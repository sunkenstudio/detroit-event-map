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
} from '@chakra-ui/react';
import { H3, H4, Paragraph } from '../Typography';
import React from 'react';
import { List } from '@phosphor-icons/react';

export const Header = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef(null);

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
      <Button ref={btnRef} backgroundColor={'transparent'} onClick={onOpen}>
        <List size="32" color="white" />
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
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
                <strong>I don't want your data. </strong>
                {`It's yours and it should stay that way. 
                When the site asks for your location, it's not storing that information anywhere. 
                It's just used to sort the events by distance from you. `}
                <strong>
                  The site is fully usable without enabling location services
                </strong>
                {`, it'll just set your location to downtown.`}
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
    </Box>
  );
};
