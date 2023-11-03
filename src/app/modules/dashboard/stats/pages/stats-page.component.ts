import { Component, OnInit } from '@angular/core';
import { AppointmentStatTypeEnum } from '../enums';

@Component({
  templateUrl: './stats-page.component.html',
})
export class StatsPageComponent {
  readonly primaryMedicalCondition: AppointmentStatTypeEnum =
    AppointmentStatTypeEnum.PrimaryMedicalCondition;
  readonly fitnessForWork: AppointmentStatTypeEnum =
    AppointmentStatTypeEnum.FitnessForWork;
  readonly returnToWork: AppointmentStatTypeEnum = AppointmentStatTypeEnum.ReturnToWork;
  readonly disabilityRelated: AppointmentStatTypeEnum =
    AppointmentStatTypeEnum.DisabilityRelated;
  readonly workRelated: AppointmentStatTypeEnum = AppointmentStatTypeEnum.WorkRelated;
}
