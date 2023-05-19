import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'metrics'
})
export class MetricsPipe implements PipeTransform {
  transform(value: number, metric: string): string {
    if (metric === 'height') {
      const heightInCentimeters  = (value * 10).toFixed(0);
      const formattedHeight = (Number(heightInCentimeters) / 100).toFixed(2).replace('.', ',');
      return `${formattedHeight} cm`;
    } else if (metric === 'weight') {
      const weightInKilograms = value / 10;
      return `${weightInKilograms} kg`;
    } else {
      return '';
    }
  }
}
