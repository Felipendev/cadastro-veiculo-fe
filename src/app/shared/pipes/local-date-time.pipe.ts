import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'localDateTimePipe'
})
export class LocalDateTimePipe implements PipeTransform {
  transform(date: string): string {
      let dateOut: moment.Moment = moment(date, "yyyy-MM-dd" );
      return dateOut.format("dd/MM/yyyy");
  }

}
