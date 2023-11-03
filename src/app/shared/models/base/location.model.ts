import { SiteModel } from './site.model';

export interface LocationModel {
  id: string;
  name: string;
  sites: SiteModel[];
}
