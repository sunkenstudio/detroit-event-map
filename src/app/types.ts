export interface EventData {
  _id: string;
  title: string;
  img: string;
  start_date: string;
  end_date: string;
  date: string;
  desc: string;
  url: string;
  lat: number;
  lng: number;
  address: string;
  location: string;
  price?: string;
}

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface ChakraDisclosureProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  onToggle: () => void;
  isControlled: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getButtonProps: (props?: any) => any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getDisclosureProps: (props?: any) => any;
}
