import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'rows'
})
export class RowsPipe implements PipeTransform {
  transform(items: any[], itemsPerRow: number): any[] {
    const rows: any[][] = [];
    items.forEach((item, index) => {
      const rowIndex = Math.floor(index / itemsPerRow);
      if (!rows[rowIndex]) {
        rows[rowIndex] = [];
      }
      rows[rowIndex].push(item);
    });
    return rows;
  }
}
