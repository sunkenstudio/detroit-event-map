import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  TabPanel,
} from '@chakra-ui/react';
import { FormikProvider, useFormik } from 'formik';
import React, { useState } from 'react';
import { Paragraph } from '../../../Typography';
import Link from 'next/link';
import axios from 'axios';
import { BASE_URL } from '@/app/utils';
import { toast } from 'react-toastify';

interface CreateEventsProps {
  userId: string;
  getUserEvents: () => void;
}
export const CreateEvents = ({ userId, getUserEvents }: CreateEventsProps) => {
  const [isFiring, setIsFiring] = useState(false);

  const createForm = useFormik({
    initialValues: {} as Record<string, string>,
    onSubmit: () => createEvent(),
  });

  const createEvent = () => {
    setIsFiring(true);
    axios
      .post(`${BASE_URL}/events`, {
        event: { ...createForm.values },
        id: userId,
      })
      .then(() => {
        setTimeout(() => {
          setIsFiring(false);
          toast.success('Event Created!', {
            position: 'top-center',
          });
          getUserEvents();
        }, 1500);
      })
      .catch((err) => {
        setTimeout(() => {
          toast.error('Failed to Create Event', {
            position: 'top-left',
          });
          console.log(err);
          setIsFiring(false);
        }, 1500);
      });
  };
  return (
    <TabPanel>
      <FormikProvider value={createForm}>
        <form
          onSubmit={createForm.handleSubmit}
          style={{
            display: 'flex',
            width: '100%',
            justifyContent: 'center',
          }}
        >
          <Stack w={'100%'}>
            <FormControl isRequired>
              <FormLabel htmlFor={'event-title'}>EVENT TITLE</FormLabel>
              <Input
                id={'event-title'}
                data-testid={`input-event-title`}
                name={'title'}
                type={'text'}
                onChange={createForm.handleChange}
                value={createForm.values.title}
                color={'black'}
                bgColor="white"
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel htmlFor={'image-link'}>IMAGE LINK</FormLabel>
              <Input
                id={'image-link'}
                data-testid={`input-event-img`}
                name={'img'}
                type={'text'}
                onChange={createForm.handleChange}
                value={createForm.values.img}
                color={'black'}
                bgColor="white"
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel htmlFor={'date'}>DATE (YYYY-MM-DD)</FormLabel>
              <Input
                id={'date'}
                data-testid={`date`}
                name={'date'}
                type={'text'}
                onChange={createForm.handleChange}
                value={createForm.values.date}
                color={'black'}
                bgColor="white"
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel htmlFor={'url'}>EXTERNAL LINK</FormLabel>
              <Input
                id={'url'}
                data-testid={`url`}
                name={'url'}
                type={'text'}
                onChange={createForm.handleChange}
                value={createForm.values.url}
                color={'black'}
                bgColor="white"
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel htmlFor={'address'}>
                ADDRESS (404 WOODWARD AVE., DETROIT, MI)
              </FormLabel>
              <Input
                id={'address'}
                data-testid={`address`}
                name={'address'}
                type={'text'}
                onChange={createForm.handleChange}
                value={createForm.values.address}
                color={'black'}
                bgColor="white"
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel htmlFor={'lat'}>
                COORDINATES (LATITUDE) -- SEE BELOW
              </FormLabel>
              <Input
                id={'lat'}
                data-testid={`lat`}
                name={'lat'}
                type={'text'}
                onChange={createForm.handleChange}
                value={createForm.values.lat}
                color={'black'}
                bgColor="white"
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel htmlFor={'lng'}>
                COORDINATES (LONGITUDE) -- SEE BELOW
              </FormLabel>
              <Input
                id={'lng'}
                data-testid={`lng`}
                name={'lng'}
                type={'text'}
                onChange={createForm.handleChange}
                value={createForm.values.lng}
                color={'black'}
                bgColor="white"
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel htmlFor={'location'}>NAME OF VENUE</FormLabel>
              <Input
                id={'location'}
                data-testid={`location`}
                name={'location'}
                type={'text'}
                onChange={createForm.handleChange}
                value={createForm.values.location}
                color={'black'}
                bgColor="white"
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel htmlFor={'price'}>PRICE (EX: $25)</FormLabel>
              <Input
                id={'price'}
                data-testid={`price`}
                name={'price'}
                type={'text'}
                onChange={createForm.handleChange}
                value={createForm.values.price}
                color={'black'}
                bgColor="white"
              />
            </FormControl>
            <Paragraph>
              {`You can use this `}
              <Link
                href="https://www.gps-coordinates.net/"
                color="blue"
                target="_blank"
              >
                LINK
              </Link>
              {` to get the coordinates, I promise I will fix this next so all you need is an address.`}
            </Paragraph>
            <Button type="submit" isLoading={isFiring} w={'100%'}>
              SUBMIT
            </Button>
          </Stack>
        </form>
      </FormikProvider>
    </TabPanel>
  );
};
