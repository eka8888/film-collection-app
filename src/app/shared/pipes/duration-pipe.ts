import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'duration',
    standalone: true
})
export class DurationPipe implements PipeTransform {
  transform(minutes: number|undefined): string {
    if (!minutes) return '';
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;

    if (hours && mins) return `${hours}h ${mins}min`;
    if (hours) return `${hours}h`;
    return `${mins}min`;
  }
}