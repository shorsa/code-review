import { RequestBasePaginationModel } from "src/app/shared/models";

export interface RequestGetPatientOptionsModel extends RequestBasePaginationModel {
  searchText?: string
  departments?: string[]
}