import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phoneNumber',
})
export class PhoneNumberPipe implements PipeTransform {
  transform(
    phoneCode: string | number | undefined,
    phoneNumber: string | number | undefined
  ): string {
    if (!phoneNumber) return '';
    return `+${phoneCode} ${phoneNumber}`;
  }
}
