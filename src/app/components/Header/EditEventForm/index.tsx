import { FormikProvider, useFormik } from 'formik';
import React from 'react';
import { Button, FormControl, FormLabel, Input, Stack } from '@chakra-ui/react';
import { Paragraph } from '../../Typography';
import Link from 'next/link';
import { EventData } from '@/app/types';

interface EditEventFormProps {
  event: EventData;
}

export const EditEventForm = ({ event }: EditEventFormProps) => {
  const editForm = useFormik({
    initialValues: {
      title: event.title,
      img: event.img,
      date: event.date,
      url: event.url,
      address: event.address,
      lat: event.lat,
      lng: event.lng,
      location: event.location,
      price: event.price,
    },
    onSubmit: () => {
      console.log(editForm.values);
    },
  });

  return (
    <FormikProvider value={editForm}>
      <form
        onSubmit={editForm.handleSubmit}
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
              onChange={editForm.handleChange}
              value={editForm.values.title}
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
              onChange={editForm.handleChange}
              value={editForm.values.img}
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
              onChange={editForm.handleChange}
              value={editForm.values.date}
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
              onChange={editForm.handleChange}
              value={editForm.values.url}
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
              onChange={editForm.handleChange}
              value={editForm.values.address}
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
              onChange={editForm.handleChange}
              value={editForm.values.lat}
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
              onChange={editForm.handleChange}
              value={editForm.values.lng}
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
              onChange={editForm.handleChange}
              value={editForm.values.location}
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
              onChange={editForm.handleChange}
              value={editForm.values.price}
              color={'black'}
              bgColor="white"
            />
          </FormControl>
          {/* {CreateSchema.map((i) => {
            const key = snakeCase(i.label);
            return (
              <InputField
                key={key}
                id={key}
                //@ts-ignore
                field={i}
                value={editForm?.values?.[key]}
                onChange={editForm.handleChange}
              />
            );
          })} */}
          <Paragraph>
            {`You can use this `}
            <Link href="https://www.gps-coordinates.net/" color="blue">
              LINK
            </Link>
            {` to get the coordinates, I promise I will fix this next so all you need is an address.`}
          </Paragraph>
          <Button
            type="submit"
            // isLoading={isFiring}
            w={'100%'}
          >
            SAVE CHANGES
          </Button>
        </Stack>
      </form>
    </FormikProvider>
  );
};
