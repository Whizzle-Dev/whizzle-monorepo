import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { displayElapsedTime } from './displayElapsedTime';

dayjs.extend(relativeTime);

export { displayElapsedTime, dayjs };
