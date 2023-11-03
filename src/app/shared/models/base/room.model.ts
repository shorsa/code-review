import { ClinicModel } from './clinic.model';
import { SiteModel } from './site.model';

export interface RoomModel {
  id: string;
  name: string;
  siteId: string;
  site: SiteModel;
  clinics: ClinicModel[];
}
