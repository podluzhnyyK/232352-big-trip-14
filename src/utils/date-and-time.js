import dayjs from 'dayjs';

const humanizeDateAndHours = (date) => {
  return dayjs(date).format('DD/MM/YY HH:mm');
};

const humanizeDate = (date) => {
  return dayjs(date).format('YYYY-MM-DD');
};

const humanizeDateDayAndMonth = (date) => {
  return dayjs(date).format('D MMM');
};

const humanizeHours = (date) => {
  return dayjs(date).format('HH:mm');
};

const humanizeDuration = (minuteDuration, hoursDuration, daysDuration) => {
  const huminizedDays = daysDuration < 10 ? '0' + daysDuration : daysDuration;
  const humanizedHours = (hoursDuration - daysDuration * 24) < 10 ? '0' + (hoursDuration - daysDuration * 24) : hoursDuration - daysDuration * 24;
  const humanizedMinutes = (minuteDuration - hoursDuration * 60) < 10 ? '0' + (minuteDuration - hoursDuration * 60) : minuteDuration -hoursDuration * 60;

  if (daysDuration > 0) {
    return `${huminizedDays}D ${humanizedHours}H ${humanizedMinutes}M`;
  }

  if (daysDuration === 0 && hoursDuration !== 0) {
    return `${humanizedHours}H ${humanizedMinutes}M`;
  }

  return `${humanizedMinutes}M`;
};

const getPointDuration = (point) => {
  const daysDuration = dayjs(point.dateTo).diff(point.dateFrom, 'day');
  const hoursDuration = dayjs(point.dateTo).diff(point.dateFrom, 'hour');
  const minuteDuration = dayjs(point.dateTo).diff(point.dateFrom, 'minute');

  return humanizeDuration(minuteDuration, hoursDuration, daysDuration);
};

const humanizeTotalDuration = (duration) => {
  const minuteDuration = duration;
  const hoursDuration = Math.floor(duration / 60);
  const daysDuration =  Math.floor(hoursDuration /24);

  return humanizeDuration(minuteDuration, hoursDuration, daysDuration);
};

export {
  humanizeDateAndHours,
  humanizeDate,
  humanizeDateDayAndMonth,
  humanizeHours,
  getPointDuration,
  humanizeTotalDuration
};
