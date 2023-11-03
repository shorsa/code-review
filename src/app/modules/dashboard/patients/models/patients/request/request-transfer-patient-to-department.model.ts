export interface RequestTransferPatientsToDepartmentModel {
  patientDepartments: TransferPatientRequestModel[];
}

export interface TransferPatientRequestModel {
  patientId: string;
  departmentIds: string;
}
