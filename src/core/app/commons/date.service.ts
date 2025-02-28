import { Injectable } from '@nestjs/common';
import { format } from 'date-fns';

@Injectable()
export class DateService {
  dateFormat(date: Date): string {
    const dateISO = date.toISOString();
    return format(dateISO, 'dd/MM/yy');
  }
  timeFormat(date: Date): string {
    const dateISO = date.toISOString();
    return format(dateISO, 'HH:mm');
  }
}
