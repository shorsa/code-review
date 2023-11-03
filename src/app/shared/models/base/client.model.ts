import { CancellationFeeTypeEnum } from 'src/app/modules/dashboard/client/enums';
import { DepartmentModel } from './department.model';
import { InvoiceTypeEnum } from '../../enums';

export interface ClientModel {
  id: string;
  code: string;
  fullName: string;
  contactPersonName: string;
  contactPersonEmail: string;
  contactPersonPhone: string;
  invoiceType: InvoiceTypeEnum;
  cancellationFeeType: CancellationFeeTypeEnum;
  includeOnSageReport: boolean;
  purchaseOrderRequired: boolean;
  invoiceEmailAddress: string;
  includePatientNameOnClinicalReports: boolean;
  documentPassword: string;
  kpiRequired: boolean;
  statsRequired: boolean;
  cancellationFee: number;
  termsAndConditions: string;
  termsAndConditionsAccepted: boolean;
  termsAndConditionsAcceptedDateTime: string;
  termsAndConditionsAcceptedBy: string;
  departments: DepartmentModel[];
  customClientId: string;
  isActive: boolean;
}
