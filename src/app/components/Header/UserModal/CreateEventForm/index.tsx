import { Button, Stack } from '@chakra-ui/react';
import { FormikProvider, useFormik } from 'formik';
import React from 'react';
import CreateSchema from '../../form.json';
import { snakeCase } from 'lodash';
import { InputField } from '../../../InputField';
import { Paragraph } from '../../../Typography';
import Link from 'next/link';

export const CreateEventForm = () => {
  const createForm = useFormik({
    initialValues: {} as Record<string, string>,
    onSubmit: () => {
      console.log(createForm.values);
    },
  });
  return (
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
          {CreateSchema.map((i) => {
            const key = snakeCase(i.label);
            return (
              <InputField
                key={key}
                id={key}
                //@ts-ignore
                field={i}
                value={createForm?.values?.[key]}
                onChange={createForm.handleChange}
              />
            );
          })}
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
            SUBMIT
          </Button>
        </Stack>
      </form>
    </FormikProvider>
  );
};
