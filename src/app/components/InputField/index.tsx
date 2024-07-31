import {
  FormControl,
  FormLabel,
  Input,
  Select,
  Stack,
  Textarea,
} from '@chakra-ui/react';
import React, { ChangeEvent } from 'react';
import { snakeCase } from 'lodash';

type InputFieldType =
  | 'text'
  | 'email'
  | 'date'
  | 'time'
  | 'number'
  | 'tel'
  | 'money'
  | 'dropdown'
  | 'textarea'
  | 'Other';

export interface InputFieldProps {
  id: string;
  field: {
    type: InputFieldType;
    value: string;
    label: string;
    options?: string[];
  };
  value: string;
  onChange: (e: ChangeEvent) => void;
}

export const InputField = ({ id, field, value, onChange }: InputFieldProps) => {
  const { type, label, options = [] } = field;
  const display = label.toUpperCase();
  if (
    ['text', 'email', 'date', 'time', 'number', 'tel', 'money'].includes(type)
  ) {
    return (
      <FormControl isRequired>
        <FormLabel htmlFor={id}>{display}</FormLabel>
        <Input
          id={id}
          data-testid={`input-${id}`}
          name={field.value}
          type={type}
          onChange={onChange}
          value={value}
          color={'black'}
          bgColor="white"
        />
      </FormControl>
    );
  }
  if (type === 'dropdown') {
    return (
      <Stack>
        <FormControl isRequired>
          <FormLabel htmlFor={id}>{display}</FormLabel>
          <Select
            id={id}
            data-testid={`input-${id}`}
            name={display}
            onChange={onChange}
            value={value}
            color={'black'}
            bgColor="white"
          >
            {options.map((i) => (
              <option key={snakeCase(i)} value={i}>
                {i}
              </option>
            ))}
          </Select>
        </FormControl>
        {value === 'Other' && (
          <FormControl isRequired>
            <Input
              id={`${id}-other`}
              data-testid={`input-${id}`}
              name={`${display}-other`}
              type={'text'}
              onChange={onChange}
              value={value}
              color={'black'}
              bgColor="white"
            />
          </FormControl>
        )}
      </Stack>
    );
  }
  if (type === 'textarea') {
    return (
      <FormControl isRequired>
        <FormLabel htmlFor={id}>{display}</FormLabel>
        <Textarea
          id={id}
          data-testid={`input-${id}`}
          name={display}
          variant="filled"
          onChange={onChange}
          value={value}
          color={'black'}
        />
      </FormControl>
    );
  }

  return null;
};
