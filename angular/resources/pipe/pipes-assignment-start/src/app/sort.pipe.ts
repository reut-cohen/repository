import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort',
  pure: false
})
export class SortPipe implements PipeTransform {


  transform(value: any, propName: string) {
    if (!Array.isArray(value)) {
      return value;
    }
    value.sort((a, b) => {
      if (a[propName] < b[propName]) {
        return -1
      } else {
        return 1;
      }
    });
    return value;
  }
}
