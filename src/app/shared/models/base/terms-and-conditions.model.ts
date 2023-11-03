import { ClientModel } from './client.model';

export interface TermsAndConditionsModel {
  id: string;
  clientId: string;
  client: ClientModel;
  content: string;
}
