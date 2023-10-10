import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'randomKey',
  standalone: true
})
export class RandomKeyPipe implements PipeTransform {
  private static versionRecord: Record<string, number> = {};
  transform(value: string, versionKey?: string): string {
    const versionRecord = !!versionKey && RandomKeyPipe.versionRecord[versionKey];
    const [textToReplace, valuesTemplate] = value.match(/\{(.*)\}/) || [];
    if (!textToReplace || !valuesTemplate) {
      return value;
    }
    const values = valuesTemplate.split('|');
    const randomIndex = versionRecord || Math.floor(Math.random() * values.length);
    if (versionKey && randomIndex !== versionRecord) {
      RandomKeyPipe.versionRecord[versionKey] = randomIndex;
    }
    return value.replace(textToReplace, values[randomIndex]);
  }
}
