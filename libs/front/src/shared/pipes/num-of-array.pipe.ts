import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numOfArray',
})
export class NumOfArray implements PipeTransform {
  transform(total: number, displayNum: number): number {
    return Array(Math.ceil(total / displayNum)).length;
  }
}
