import {eventType} from './consts';
import {getRandomInteger} from './utils';


const offersByType = {
  [eventType.Bus]: [1,2],
  [eventType.CheckIn]: [3,4],
  [eventType.Drive]: [5,6],
  [eventType.Flight]: [7,8,9,10],
  [eventType.Restaurant]: [11, 12],
  [eventType.Ship]: [13,14,15],
  [eventType.Sightseeing]: [16,17],
  [eventType.Taxi]: [18,19,20 ],
  [eventType.Train]: [21,22],
  [eventType.Transport]: [23,24,25],
};

export const getOfferIds = (type) => {
  const offerts = offersByType[type];
  return offerts;
};

export const allOffers = [
  {
    id: 1,
    title: 'Book tickets',
    offerCost: getRandomInteger(50, 100),
    isChecked: Boolean(getRandomInteger(0, 1)),
  },
  {
    id: 2,
    title: 'Choose seats',
    offerCost: getRandomInteger(1, 10),
    isChecked: Boolean(getRandomInteger(0, 1)),
  },
  {
    id: 3,
    title: 'Add breakfast',
    offerCost: getRandomInteger(20, 100),
    isChecked: Boolean(getRandomInteger(0, 1)),
  },
  {
    id: 4,
    title: 'Add dinner',
    offerCost: getRandomInteger(20, 100),
    isChecked: Boolean(getRandomInteger(0, 1)),
  },
  {
    id: 5,
    title: 'Rent a car',
    offerCost: getRandomInteger(50, 500),
    isChecked: Boolean(getRandomInteger(0, 1)),
  },
  {
    id: 6,
    title: 'Rent a van',
    offerCost: getRandomInteger(100, 1000),
    isChecked: Boolean(getRandomInteger(0, 1)),
  },
  {
    id: 7,
    title: 'Add luggage',
    offerCost: getRandomInteger(20, 50),
    isChecked: Boolean(getRandomInteger(0, 1)),
  },
  {
    id: 8,
    title: 'Add meal',
    offerCost: getRandomInteger(5, 25),
    isChecked: Boolean(getRandomInteger(0, 1)),
  },
  {
    id: 9,
    title: 'Choose seats',
    offerCost: getRandomInteger(5, 25),
    isChecked: Boolean(getRandomInteger(0, 1)),
  },
  {
    id: 10,
    title: 'Switch to comfort class',
    offerCost: getRandomInteger(50, 100),
    isChecked: Boolean(getRandomInteger(0, 1)),
  },
  {
    id: 11,
    title: 'Book table 8-10am',
    offerCost: getRandomInteger(5, 25),
    isChecked: Boolean(getRandomInteger(0, 1)),
  },
  {
    id: 12,
    title: 'Book table 5-6pm',
    offerCost: getRandomInteger(50, 100),
    isChecked: Boolean(getRandomInteger(0, 1)),
  },
  {
    id: 13,
    title: 'Add beverages',
    offerCost: getRandomInteger(10, 100),
    isChecked: Boolean(getRandomInteger(0, 1)),
  },
  {
    id: 14,
    title: 'Add snacks',
    offerCost: getRandomInteger(10, 100),
    isChecked: Boolean(getRandomInteger(0, 1)),
  },
  {
    id: 15,
    title: 'Choose cabin',
    offerCost: getRandomInteger(50, 100),
    isChecked: Boolean(getRandomInteger(0, 1)),
  },
  {
    id: 16,
    title: 'Book tickets',
    offerCost: getRandomInteger(20, 100),
    isChecked: Boolean(getRandomInteger(0, 1)),
  },
  {
    id: 17,
    title: 'Lunch in city',
    offerCost: getRandomInteger(20, 100),
    isChecked: Boolean(getRandomInteger(0, 1)),
  },
  {
    id: 18,
    title: 'Order Uber',
    offerCost: getRandomInteger(5, 50),
    isChecked: Boolean(getRandomInteger(0, 1)),
  },
  {
    id: 19,
    title: 'Choose the radio station',
    offerCost: getRandomInteger(5, 25),
    isChecked: Boolean(getRandomInteger(0, 1)),
  },
  {
    id: 20,
    title: 'Upgrade to a business class',
    offerCost: getRandomInteger(20, 100),
    isChecked: Boolean(getRandomInteger(0, 1)),
  },
  {
    id: 21,
    title: 'Add meal',
    offerCost: getRandomInteger(5, 25),
    isChecked: Boolean(getRandomInteger(0, 1)),
  },
  {
    id: 22,
    title: 'Choose seats',
    offerCost: getRandomInteger(20, 100),
    isChecked: Boolean(getRandomInteger(0, 1)),
  },
  {
    id: 23,
    title: 'Buy day pass',
    offerCost: getRandomInteger(5, 25),
    isChecked: Boolean(getRandomInteger(0, 1)),
  },
  {
    id: 24,
    title: 'Buy week pass',
    offerCost: getRandomInteger(5, 25),
    isChecked: Boolean(getRandomInteger(0, 1)),
  },
  {
    id: 25,
    title: 'Buy month pass',
    offerCost: getRandomInteger(5, 50),
    isChecked: Boolean(getRandomInteger(0, 1)),
  },
];


