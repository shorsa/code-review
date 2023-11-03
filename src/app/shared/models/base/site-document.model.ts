import { SiteModel } from './site.model';

export interface SiteDocumentModel {
  id: string;
  name: string;
  storageLink: string;
  siteId: string;
  site: SiteModel;
}
