import { HStack, Text, Flex, Heading, IconButton, Box } from '@chakra-ui/react';
import { Link as LinkIcon } from '@phosphor-icons/react';
import { EventData } from '@/app/types';
import { Card, CardHeader, CardBody, CardFooter } from '@chakra-ui/react';
import Link from 'next/link';

export const EventCard = ({ event }: { event: EventData }) => {
  const { title, img, price, url } = event;

  function isFirstCharNumber(str: string) {
    if (!str) return str; // Check if the string is empty
    const firstChar = str.charAt(0);
    if (!isNaN(Number(firstChar))) {
      return `$${str}`;
    }
    return str;
  }
  const priceWithDollar = isFirstCharNumber(price || '');
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
            {priceWithDollar || 'Price not found. See link for details'}
          </Text>
          <Box backgroundColor={'#282929'} borderRadius={'5rem'}>
            <Link href={url} target="_blank">
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
  );
};
