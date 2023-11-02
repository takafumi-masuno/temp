import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'arrayContains' })
export class ArrayContainsPipe implements PipeTransform {
  transform(array: string[], value: string): boolean {
    return array.includes(value);
  }
}
