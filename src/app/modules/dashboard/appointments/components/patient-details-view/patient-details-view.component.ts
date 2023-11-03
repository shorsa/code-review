import { Component, Input, OnDestroy, OnInit, ViewContainerRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Subscription, filter } from 'rxjs';
import {
  RadiologyManagementModalComponent,
  RadiologyManagementModalModel,
} from '../../../radiology/components/radiology-management-modal/radiology-management-modal.component';
import { ResponseGetPatientDetailsByAppointmentIdModel } from '../../models';
import * as appointmentsSelectors from '../../store/appointments.selectors';
import { UserPermissionsProvider } from 'src/app/shared/providers/user-permissions.provider';
import * as appointmentsActions from '../../store/appointments.actions';

@Component({
  selector: 'app-patient-details-view',
  templateUrl: './patient-details-view.component.html',
  styleUrls: ['./patient-details-view.component.scss'],
})
export class PatientDetailsViewComponent implements OnInit, OnDestroy {
  @Input() appointmentId!: string;

  private subscriptions$: Subscription = new Subscription();

  patientDetails?: ResponseGetPatientDetailsByAppointmentIdModel;
  isMriRequestCreated?: boolean;

  constructor(
    private store$: Store,
    private modal: NzModalService,
    private viewContainerRef: ViewContainerRef,
    private userPermissionsProvider: UserPermissionsProvider
  ) {}

  ngOnInit(): void {
    this.initializingSelectors();
  }

  get getIsCanCreateMri(): boolean {
    return this.userPermissionsProvider.isClinician;
  }

  get getIsClientRole(): boolean {
    return this.userPermissionsProvider.isClientRoles;
  }

  handleCreateMriRequest(): void {
    if (!this.appointmentId) return;
    const modal = this.modal.create<
      RadiologyManagementModalComponent,
      RadiologyManagementModalModel
    >({
      nzWidth: '1200px',
      nzMaskClosable: false,
      nzContent: RadiologyManagementModalComponent,
      nzViewContainerRef: this.viewContainerRef,
      nzData: {
        appointmentId: this.appointmentId,
        dateOfBirth: this.patientDetails?.dateOfBirth,
      },
      nzFooter: null,
    });

    modal.afterClose.subscribe((res) => {
      if (res) {
        this.store$.dispatch(
          appointmentsActions.appointmentsGetPatientDetailsAction({
            payload: { appointmentId: this.appointmentId },
          })
        );
      }
    });
  }

  private initializingSelectors(): void {
    this.subscriptions$.add(
      this.store$
        .select(appointmentsSelectors.selectPatientDetails)
        .pipe(filter((val) => !!val))
        .subscribe((data) => {
          this.patientDetails = data;
        })
    );
    this.subscriptions$.add(
      this.store$
        .select(appointmentsSelectors.selectAppointmentDetails)
        .pipe(filter((val) => !!val))
        .subscribe((data) => {
          this.isMriRequestCreated = data!.isMriRequestCreated;
        })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions$.unsubscribe();
  }
}
