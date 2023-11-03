import { BaseResponseModel } from 'src/app/shared/models';

export interface ResponseDownloadPatientDocumentsModel extends BaseResponseModel {
  archive: any;
  archiveName: string;
}
