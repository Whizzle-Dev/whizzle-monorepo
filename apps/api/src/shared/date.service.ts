import { Injectable } from '@nestjs/common';
import * as dayjs from 'dayjs';
import { Dayjs } from 'dayjs';

enum DateFormats {
  FullMonthDayFullYear = 'MMMM DD, YYYY',
  FullYearMonthDayTime = 'YYYY-MM-DD HH:mm:ss',
}

@Injectable()
export class DateService {
  static Formats = DateFormats;

  public getCurrentDate(): Dayjs {
    return dayjs();
  }

  formatDate(date: Date | string, format: DateFormats): string {
    return dayjs(date).format(format);
  }

  addDays(date: Date, days: number): Dayjs {
    return dayjs(date).add(days, 'day');
  }

  createFrom(date: Date | string): Dayjs {
    return dayjs(date);
  }
}
