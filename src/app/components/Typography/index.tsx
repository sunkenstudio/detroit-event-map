import React from 'react';
import { ChakraProps, Heading, Text } from '@chakra-ui/react';

interface HeaderProps extends ChakraProps {
  children: React.ReactNode;
}

const H1 = ({ children, ...rest }: HeaderProps) => (
  <Heading as="h1" size="4xl" css={{ width: 'auto' }} {...rest}>
    {children}
  </Heading>
);

const H2 = ({ children, ...rest }: HeaderProps) => (
  <Heading as="h2" size="3xl" css={{ width: 'auto' }} {...rest}>
    {children}
  </Heading>
);

const H3 = ({ children, ...rest }: HeaderProps) => (
  <Heading as="h3" size="xl" css={{ width: 'auto' }} {...rest}>
    {children}
  </Heading>
);

const H4 = ({ children, ...rest }: HeaderProps) => (
  <Heading as="h4" size="md" css={{ width: 'auto' }} {...rest}>
    {children}
  </Heading>
);

const H5 = ({ children, ...rest }: HeaderProps) => (
  <Heading as="h5" size="sm" css={{ width: 'auto' }} {...rest}>
    {children}
  </Heading>
);

const H6 = ({ children, ...rest }: HeaderProps) => (
  <Heading as="h6" size="xs" css={{ width: 'auto' }} {...rest}>
    {children}
  </Heading>
);

const Paragraph = ({ children, ...rest }: HeaderProps) => (
  <Text as="p" size="1.5rem" css={{ width: 'auto' }} {...rest}>
    {children}
  </Text>
);

export { H1, H2, H3, H4, H5, H6, Paragraph };
