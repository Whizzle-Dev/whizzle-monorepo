import dayjs from 'dayjs';

export const diffInSeconds = (startDate: Date, endDate: Date): number => {
  return dayjs(endDate).diff(dayjs(startDate), 'second');
};
export function displayElapsedTime(startDate: Date, endDate: Date): string {
  const diffSeconds = dayjs(endDate).diff(dayjs(startDate), 'second');

  return displayElapsedTimeForSeconds(diffSeconds);
}

export const displayElapsedTimeForSeconds = (numberOfSeconds: number) => {
  const diffSeconds = numberOfSeconds;
  const diffMinutes = Math.floor(numberOfSeconds / 60);
  const diffHours = Math.floor(numberOfSeconds / 3600);

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
};
