import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'date'
})
export class DatePipe implements PipeTransform {

  transform(value: any): any {
    if (value.length > 10) {
      return value.substr(0, 10);
    }
  }

}
