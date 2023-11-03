import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, filter } from 'rxjs';
import { selectIsLoading } from 'src/app/app-store/app-state/app-state.selectors';
import { UserRoleEnum } from 'src/app/shared/enums';
import { PermissionItem, ViewPermissionModel } from '../../../staff/models';
import {
  RequestUpdateRoleClaimsModel,
  ResponseGetPermissionsListModel,
} from '../../models';
import * as permissionsActions from '../../store/permissions.actions';
import * as permissionsSelectors from '../../store/permissions.selectors';
import { Router } from '@angular/router';
import { RoutesConstants } from 'src/app/core/constants';
@Component({
  selector: 'app-permissions-setting',
  templateUrl: './permissions-setting.component.html',
  styleUrls: ['./permissions-setting.component.scss'],
})
export class PermissionsSettingComponent {
  @Input() set setRole(role: UserRoleEnum) {
    this.role = role;
    this.getPermissionsList(role);
  }

  private allPermissionsList?: Omit<
    ResponseGetPermissionsListModel,
    'message' | 'success'
  >;

  permissionViewList?: ViewPermissionModel & { show?: boolean };
  isLoading$?: Observable<boolean>;
  indeterminate = true;
  role?: UserRoleEnum;

  constructor(private store$: Store, private router: Router) {
    this.getAllPermissions();
    this.initializingSelectors();
  }

  private getAllPermissions(): void {
    this.store$.dispatch(permissionsActions.getListAction());
  }

  private getPermissionsList(role: UserRoleEnum): void {
    this.store$.dispatch(
      permissionsActions.getPermissionsByEnumAction({ payload: { role } })
    );
  }

  getIsAllShow(groupProp: keyof ViewPermissionModel): boolean | undefined {
    return this.permissionViewList![groupProp]?.every((item) => item.show);
  }

  getGroupIsChecked(groupName: keyof ViewPermissionModel): boolean | undefined {
    if (!this.permissionViewList || !this.permissionViewList[groupName]) return false;
    return this.permissionViewList[groupName]?.every((item) => item.isChecked);
  }

  private initializingSelectors(): void {
    this.isLoading$ = this.store$.select(selectIsLoading);

    this.store$
      .select(permissionsSelectors.selectPermissionsList)
      .pipe(filter((val) => val !== undefined))
      .subscribe((res) => {
        if (!res) return;

        this.allPermissionsList = res;
      });

    this.store$
      .select(permissionsSelectors.selectPermissionsByEnum)
      .pipe(filter((val) => val !== undefined))
      .subscribe((res) => {
        if (!res) return;
        this.permissionViewList = this.getCheckedList(res.role.claims);
      });
  }

  handleSearchByText(event?: KeyboardEvent): void {
    const value: string = (event?.target as HTMLInputElement)?.value ?? '';

    const result: ViewPermissionModel = {};

    for (const key in this.permissionViewList) {
      if (Object.prototype.hasOwnProperty.call(this.permissionViewList, key)) {
        const prop = key as keyof ViewPermissionModel;
        const permissionItems = this.permissionViewList[prop]!;
        const filteredItems = permissionItems.map((item) => ({
          ...item,
          show: value.trim()
            ? item.label.toLowerCase().includes(value.toLowerCase())
            : true,
        }));

        result[prop] = filteredItems;
      }
    }
    this.permissionViewList = result;
  }

  toggleAllGroup(groupProp: keyof ViewPermissionModel): void {
    const everyIsChecked = this.permissionViewList![groupProp]?.every(
      (item) => item.isChecked
    );
    if (everyIsChecked) {
      this.permissionViewList![groupProp] = this.permissionViewList![groupProp]?.map(
        (item) => ({ ...item, isChecked: false })
      );
    } else {
      this.permissionViewList![groupProp] = this.permissionViewList![groupProp]?.map(
        (item) => ({ ...item, isChecked: true })
      );
    }
  }

  getCheckedList(roleClaims: string[]): ViewPermissionModel {
    if (!this.allPermissionsList) {
      return {};
    }

    const result: ViewPermissionModel = {};
    Object.entries(this.allPermissionsList).forEach(([key, value]) => {
      const prop = key as keyof ViewPermissionModel;
      const claims = Object.entries(value).map(([claim, label]) => ({
        label: label as any,
        value: claim,
        isChecked: roleClaims.includes(claim),
        show: true,
      }));
      result[prop] = claims;
    });

    return result;
  }

  cancel(): void {
    this.router.navigate([
      RoutesConstants.DASHBOARD_INDEX,
      RoutesConstants.DASHBOARD_PERMISSION,
    ]);
  }

  save(): void {
    const checkedValues = Object.values(this.permissionViewList!)
      .flatMap((item) =>
        item.filter((permission: PermissionItem) => permission.isChecked)
      )
      .map((permission) => permission.value);

    const model: RequestUpdateRoleClaimsModel = {
      role: this.role!,
      claims: checkedValues,
    };
    this.store$.dispatch(permissionsActions.updatePermissionAction({ payload: model }));
  }
}
