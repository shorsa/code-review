import { Pipe, PipeTransform } from '@angular/core';
import { ClinicTypeEnum } from '../enums';

@Pipe({
  name: 'clinicType',
})
export class ClinicTypePipe implements PipeTransform {
  transform(value: ClinicTypeEnum): string {
    return ClinicTypeEnum.ClientOnly === value ? 'Client Only' : ClinicTypeEnum[value];
  }
}
