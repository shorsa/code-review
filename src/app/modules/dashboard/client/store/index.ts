import { ClientModel, ClientUserModel, UserModel } from 'src/app/shared/models';
import {
  GetClientDocumentListResponseModel,
  RequestGetClientListModel,
  RequestGetClientUsersListModel,
  ResponseGetClientListModel,
  ResponseGetClientUserListModel,
  ResponseGetTermsAndConditionsModel,
} from '../models';


export interface ClientState {
  clientDetails?: ClientModel;
  clientsSearchParams?: RequestGetClientListModel;
  clientsListData?: ResponseGetClientListModel;
  clientUserDetails?: ClientUserModel;
  clientUsersSearchParams?: RequestGetClientUsersListModel;
  clientUsersListData?: ResponseGetClientUserListModel;
  documentsList?: GetClientDocumentListResponseModel;
  termsAndConditionsDetails?: ResponseGetTermsAndConditionsModel;
}
