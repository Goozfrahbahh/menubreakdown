import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'listFilter',
})
export class ListFilterPipe implements PipeTransform {
  transform(value: any[], search: string): any {
    if (!value || !search) {
      return value;
    }

    return value.filter(
      (item) => item.name.toLowerCase().indexOf(search.toLowerCase()) > -1
    );
  }
}
