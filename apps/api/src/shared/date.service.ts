import { Injectable } from '@nestjs/common';
import dayjs from 'dayjs';

enum DateFormats {
  FullMonthDayFullYear = 'MMMM DD, YYYY',
  FullYearMonthDayTime = 'YYYY-MM-DD HH:mm:ss',
}

@Injectable()
export class DateService {
  static Formats = DateFormats;

  public getCurrentDate(): dayjs.Dayjs {
    return dayjs();
  }

  formatDate(date: Date | string, format: DateFormats): string {
    return dayjs(date).format(format);
  }

  addDays(date: Date, days: number): dayjs.Dayjs {
    return dayjs(date).add(days, 'day');
  }

  createFrom(date: Date | string): dayjs.Dayjs {
    return dayjs(date);
  }
}
