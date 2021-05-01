import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: 'shorten'
})
export class ShortenPipe implements PipeTransform {

  transform(value: any, limit: number) {
    if (value > limit) {
      return value.substr(0, limit) + ' ...'
    }
    return value;
  }

  // transform(value: any) {
  //   if (value.length > 10) {
  //     return value.substr(0, 10) + ' ...';
  //   }
  //     return value;
  // }

}
