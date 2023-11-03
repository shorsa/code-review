import { LocationModel } from './location.model';
import { RoomModel } from './room.model';
import { SiteDocumentModel } from './site-document.model';

export interface SiteModel {
  id: string;
  name: string;
  locationId: string;
  location: LocationModel;
  rooms: RoomModel[];
  documents: SiteDocumentModel[];
}
