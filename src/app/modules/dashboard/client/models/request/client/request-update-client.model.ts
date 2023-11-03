import { InvoiceTypeEnum, PhoneCodeEnum } from 'src/app/shared/enums';
import { CancellationFeeTypeEnum } from '../../../enums';

export interface RequestUpdateClientModel {
  id: string;
  fullName: string;
  contactPersonName: string;
  contactPersonEmail: string;
  contactPersonPhone: string;
  phoneCode: PhoneCodeEnum;
  invoiceType: InvoiceTypeEnum;
  includeOnSageReport: boolean;
  purchaseOrderRequired: boolean;
  invoiceEmailAddress: string;
  includePatientNameOnClinicalReports: boolean;
  documentPassword: boolean;
  kpiRequired: boolean;
  statsRequired: boolean;
  cancellationFee?: number;
  isActive: boolean;
  cancellationFeeType: CancellationFeeTypeEnum;
}
