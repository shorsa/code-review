import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { filter } from 'rxjs';
import { CommonConstants } from 'src/app/core/constants';
import { PermissionClaimsEnum } from 'src/app/shared/enums';
import { clearClientDetailsDataAction } from '../../store/client.actions';
import { UserPermissionsProvider } from 'src/app/shared/providers/user-permissions.provider';

@Component({
  templateUrl: './client-management-page.component.html',
  styleUrls: ['./client-management-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientManagementPageComponent implements OnInit, OnDestroy {
  readonly clientViewDetailsPermission = PermissionClaimsEnum.ClientViewDetails;
  readonly departmentsViewPermission = PermissionClaimsEnum.DepartmentViewAll;
  readonly clientUsersViewPermission = PermissionClaimsEnum.ClientUserViewAll;
  readonly clientDocumentViewPermission = PermissionClaimsEnum.ClientDocumentView;
  readonly clientDownloadTermsAndConditionsPermission =
    PermissionClaimsEnum.ClientDocumentDownloadTermsAndConditions;
  readonly updateTermsAndConditionsPermission =
    PermissionClaimsEnum.ClientDocumentUpdateTermsAndConditions;

  clientId?: string;
  isClinicianRole?: boolean;

  constructor(
    private activatedRoute: ActivatedRoute,
    private changeDetection: ChangeDetectorRef,
    private readonly userPermissionProvider: UserPermissionsProvider,
    private store$: Store
  ) {}

  ngOnInit(): void {
    this.initializationVariables();
  }

  private initializationVariables(): void {
    this.activatedRoute.queryParams.pipe(filter((val) => !!val)).subscribe((params) => {
      this.clientId = params[CommonConstants.QUERY_ID];
    });

    this.isClinicianRole = this.userPermissionProvider.isClinician;
  }

  ngOnDestroy(): void {
    this.store$.dispatch(clearClientDetailsDataAction());
  }
}
