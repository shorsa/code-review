import { Location } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription, filter } from 'rxjs';
import { CommonConstants } from 'src/app/core/constants';
import { UserPermissionsProvider } from 'src/app/shared/providers/user-permissions.provider';
import * as patientActions from '../../store/patient.actions';
import * as patientSelectors from '../../store/patient.selectors';

@Component({
  selector: 'app-patient-management',
  templateUrl: './patient-management.component.html',
  styleUrls: ['./patient-management.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PatientManagementComponent implements OnInit, OnDestroy {
  private subscriptions$: Subscription = new Subscription();

  patientId?: string;
  clientId?: string;
  departmentsIds?: string[];

  constructor(
    private activatedRoute: ActivatedRoute,
    private store$: Store,
    private location: Location,
    readonly userPermissionProvider: UserPermissionsProvider
  ) {}

  ngOnInit() {
    this.initializationVariables();
    this.subscriptions$.add(
      this.store$
        .select(patientSelectors.selectPatientDetails)
        .pipe(filter((val) => !!val))
        .subscribe((res) => {
          this.clientId = res?.clientUser.clientId;
          this.departmentsIds = res?.clientUser.clientUserDepartments?.map(
            (item) => item.departmentId
          );
        })
    );
  }

  get getIsClinician(): boolean {
    return this.userPermissionProvider.isClinician;
  }

  get getClientAdminOrSuperUser(): boolean {
    return (
      this.userPermissionProvider.isClientAdministrator ||
      this.userPermissionProvider.isClientSuperuser
    );
  }

  private initializationVariables(): void {
    this.subscriptions$.add(
      this.activatedRoute.queryParams.pipe(filter((val) => !!val)).subscribe((params) => {
        this.patientId = params[CommonConstants.QUERY_ID];
        if (this.patientId) {
          this.getPatientById(this.patientId);
        }
      })
    );
  }

  navigateToBack(): void {
    this.location.back();
  }

  private getPatientById(id: string): void {
    this.store$.dispatch(patientActions.patientGetByIdAction({ payload: { id } }));
  }

  ngOnDestroy(): void {
    this.store$.dispatch(patientActions.clearPatientDetailsDataAction());
    this.subscriptions$.unsubscribe();
  }
}
