import { AuditableEntityModel } from './auditable-entity.model';
import { ClinicianModel } from './clinician.model';
import { ProductModel } from './product.model';

export interface ClinicianProduct extends AuditableEntityModel {
  id: string;
  clinicianId: string;
  clinician: ClinicianModel;
  productId: string;
  product: ProductModel;
}
