import { Component, OnInit } from '@angular/core';
import { CommonConstants } from 'src/app/core/constants';
import { UserRoleEnum } from 'src/app/shared/enums';
import { SelectOptionModel } from 'src/app/shared/models';

@Component({
  templateUrl: './permissions-page.component.html',
  styleUrls: ['./permissions-page.component.scss'],
})
export class PermissionsComponent {
  selectedIndex: number = 0;
  ohrdAdmin: UserRoleEnum = UserRoleEnum.OHRDAdministrator;

  rolesList: SelectOptionModel<UserRoleEnum>[] = CommonConstants.rolesOptions;

  constructor() {}

  selectedIndexChange(activeTabIndex: number): void {
    this.selectedIndex = activeTabIndex;
  }
}
