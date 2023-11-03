import { ClinicModel } from "./clinic.model";
import { ClinicianProduct } from "./clinician-product.model";
import { UserModel } from "./user.model";

export interface ClinicianModel {
  id: string;
  customClinicianId: string;
  applicationUserId: string;
  applicationUser: UserModel;
  gmcNumber: string;
  clinics: ClinicModel[];
  clinicianProducts: ClinicianProduct[];
}