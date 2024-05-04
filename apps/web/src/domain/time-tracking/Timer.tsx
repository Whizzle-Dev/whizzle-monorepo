import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';

export const Timer = ({ time }: { time: Date | undefined }) => {
  const [seconds, setSeconds] = useState(dayjs().diff(dayjs(time), 'second'));
  React.useEffect(() => {
    const interval = setInterval(() => {
      if (time) {
        setSeconds(dayjs().diff(dayjs(time), 'second'));
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [time]);

  useEffect(() => {
    if (!time) {
      setSeconds(0);
    }
  }, [time]);
  return <span>{new Date(seconds * 1000).toISOString().slice(11, 19)}</span>;
};
