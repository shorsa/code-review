import { InvoiceTypeEnum } from '../../enums';
import { AuditableEntityModel } from './auditable-entity.model';
import { ContractProduct } from './contract-product.model';
import { DepartmentModel } from './department.model';
import { ReferralModel } from './referral.model';

export interface ContractModel extends AuditableEntityModel {
  id: string;
  departmentId: string;
  department: DepartmentModel;
  invoiceType: InvoiceTypeEnum;
  referrals: ReferralModel[];
  contractProducts: ContractProduct[];
}
