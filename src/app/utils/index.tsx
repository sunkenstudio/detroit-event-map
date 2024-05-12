import { EventData } from '../types';

export function distance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
) {
  const r = 6371; // km
  const p = Math.PI / 180;

  const a =
    0.5 -
    Math.cos((lat2 - lat1) * p) / 2 +
    (Math.cos(lat1 * p) *
      Math.cos(lat2 * p) *
      (1 - Math.cos((lon2 - lon1) * p))) /
      2;

  return 2 * r * Math.asin(Math.sqrt(a));
}

export const sortEventsByDistance = (
  events: EventData[],
  center: { lat: number; lng: number }
) => {
  const sortable: EventData[] = [...events];

  sortable.sort(function (a: EventData, b: EventData) {
    const distanceA = distance(center.lat, center.lng, a.lat, a.lng);
    const distanceB = distance(center.lat, center.lng, b.lat, b.lng);
    return distanceA - distanceB;
  });
  return sortable;
};

const getBaseUrl = () => {
  const env = process.env.NODE_ENV;
  if (env === 'development') {
    return 'http://localhost:5000/api';
  }
  return 'https://detroiteventmap.com/api';
};

export const BASE_URL = getBaseUrl();
