import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  Stack,
} from '@chakra-ui/react';
import React from 'react';
import { H3, Paragraph } from '../../Typography';
import Link from 'next/link';
import { ChakraDisclosureProps } from '@/app/types';

interface AboutModalProps {
  buttonRef: React.MutableRefObject<null>;
  modalProps: ChakraDisclosureProps;
}
export const AboutModal = ({ buttonRef, modalProps }: AboutModalProps) => {
  return (
    <Drawer
      isOpen={modalProps.isOpen}
      placement="right"
      onClose={modalProps.onClose}
      finalFocusRef={buttonRef}
      size={{ base: 'full', md: 'lg' }}
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton size={'lg'} zIndex={99} />
        <DrawerBody>
          <Stack gap={3}>
            <H3>ABOUT</H3>
            <Paragraph>
              {`I originally made this site to make it easier to see nearby stuff without
                having to dig through social media but times have changed and it's not as easy
                to aggregate public event data these days.`}
            </Paragraph>
            <Paragraph>
              {`That said, I'll still be keeping this site live for people/artists/venues to submit their 
              own events if they'd rather not use one of the bigger companies`}
            </Paragraph>
            <H3>Uploading Events</H3>
            <Paragraph>
              {`If you've got an event you're looking to promote, you can create an account with a gmail and post away!`}
            </Paragraph>
            <H3>COVERING MY ASS</H3>
            <Paragraph>
              <strong>IMPORTANT!</strong>
              <br />
              {`All these events are now user submitted, so please
                don't show up if it looks like it could be some sketchy shit.`}
            </Paragraph>
            <Paragraph>
              {`I do not claim ownership of any content you see in these events
                and I am not currently monetizing this site in any way.`}
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
              {`That said, I'm setting things up the best I can to keep that data safe from aforementioned assholes.`}
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
  );
};
