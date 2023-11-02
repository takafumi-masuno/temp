import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'range',
})
export class RangePipe implements PipeTransform {
  transform(total: number, displayNum: number): Array<number> {
    return Array(Math.ceil(total / displayNum));
  }
}
