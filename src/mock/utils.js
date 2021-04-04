import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
dayjs.extend(duration);

export const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export const getRouteDuration = (start, end) => {
  const diff = dayjs(end).diff(dayjs(start));
  const dd = dayjs.duration(diff).days().toString();
  const hh = dayjs.duration(diff).hours().toString();
  const mm = dayjs.duration(diff).minutes().toString();

  return `${dd > 0 ? dd + 'D' : ''} ${hh > 0 ? hh.padStart(2, '0') + 'H' : ''} ${mm.padStart(2, '0')}M`;
};
