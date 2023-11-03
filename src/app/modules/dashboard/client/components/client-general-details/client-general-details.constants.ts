import { InvoiceTypeEnum, PhoneCodeEnum } from 'src/app/shared/enums';
import { SelectOptionModel } from 'src/app/shared/models';
import { CancellationFeeTypeEnum } from '../../enums';

export class ClientGeneralDetailsConstants {


  static readonly cancellationFeeOptions: SelectOptionModel<CancellationFeeTypeEnum>[] = [
    {
      value: CancellationFeeTypeEnum.Fixed,
      label: 'fixed fee',
    },
    {
      value: CancellationFeeTypeEnum.Percent,
      label: '%',
    },
  ];

 
}
