import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'metrics'
})
export class MetricsPipe implements PipeTransform {
  transform(value: number, metric: string): string {
    if (metric === 'height') {
      const heightInMeters = value / 10; // Assuming the API provides height in decimeters
      return `${heightInMeters} m`;
    } else if (metric === 'weight') {
      const weightInKilograms = value / 10; // Assuming the API provides weight in hectograms
      return `${weightInKilograms} kg`;
    } else {
      return '';
    }
  }
}
