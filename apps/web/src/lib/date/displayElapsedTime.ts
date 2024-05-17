import dayjs from 'dayjs';

export function displayElapsedTime(startDate: Date, endDate: Date): string {
  const diffSeconds = dayjs(endDate).diff(dayjs(startDate), 'second');
  const diffMinutes = dayjs(endDate).diff(dayjs(startDate), 'minute');
  const diffHours = dayjs(endDate).diff(dayjs(startDate), 'hour');

  let result = '';

  if (diffHours > 0) {
    result += `${diffHours} ${diffHours === 1 ? 'hour' : 'hours'}`;
  }

  if (diffMinutes % 60 > 0) {
    if (result !== '') {
      result += ' ';
    }
    result += `${diffMinutes % 60} ${
      diffMinutes % 60 === 1 ? 'minute' : 'minutes'
    }`;
  }

  if (diffSeconds % 60 > 0) {
    if (result !== '') {
      result += ' ';
    }
    result += `${diffSeconds % 60} ${
      diffSeconds % 60 === 1 ? 'second' : 'seconds'
    }`;
  }

  return result;
}