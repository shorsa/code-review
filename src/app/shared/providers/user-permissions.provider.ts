import { Injectable, OnInit } from '@angular/core';
import { saveAs } from 'file-saver';
import { AuthenticationProvider } from './authentication.provider';
import { PermissionClaimsEnum, UserRoleEnum } from '../enums';
import { PermissionsService } from 'src/app/core/services/permissions.service';
import { Observable, Subject } from 'rxjs';
import { ResponseGetRoleByEnumModel } from 'src/app/modules/dashboard/permissions/models';
import { NgxPermissionsService } from 'ngx-permissions';

@Injectable({
  providedIn: 'root',
})
export class UserPermissionsProvider {
  private userPermissions$: Subject<any> = new Subject();

  constructor(
    private readonly authProvider: AuthenticationProvider,
    private readonly permissionsService: PermissionsService,
    private ngxPermissionsService: NgxPermissionsService
  ) {
    //TODO: temporary
    const userRoleString = this.authProvider.getUserRole();

    console.log(`%c CURRENT USER ROLE: ${userRoleString}`, 'color: #00ff40');
  }

  needAcceptTermsAndConditions(): boolean {
    const userRole: string | undefined = this.authProvider.getUserRole();
    const rolesWithTerms: string[] = [
      UserRoleEnum[UserRoleEnum.ClientSuperuser],
      UserRoleEnum[UserRoleEnum.ClientAdministrator],
    ];

    if (
      userRole &&
      rolesWithTerms.includes(userRole) &&
      !this.authProvider.getUserTermsIsApproved()
    ) {
      return true;
    }

    return false;
  }

  isHasPermission(permission: PermissionClaimsEnum): boolean {
    const permissionName = this.ngxPermissionsService.getPermission(permission)?.name;
    return !!permissionName;
  }

  getIsCurrentClient(clientId: string): boolean {
    if (!this.authProvider.getClientId) return true;

    return this.authProvider.getClientId === clientId;
  }

  updatePermissions(): void {
    this.getUserPermissions().subscribe((res) => {
      const allClaims = Object.values(PermissionClaimsEnum);
      const includeArr: string[] = [];
      const excludeArr: string[] = [];

      allClaims.forEach((claim) => {
        if (res?.role?.claims?.includes(claim)) {
          includeArr.push(claim);
        } else {
          excludeArr.push(claim);
        }
      });
      console.log(`%c ${includeArr.join(' | ')}`, 'color: #00ff40');
      console.log(`%c ${excludeArr.join(' | ')}`, 'color: red');

      this.ngxPermissionsService.addPermission(res?.role?.claims);
      this.userPermissions$.next(null);
    });
  }

  private getUserPermissions(): Observable<ResponseGetRoleByEnumModel> {
    return this.permissionsService.getByEnum({ role: this.getUserRoleEnum });
  }

  get getUserRoleEnum(): UserRoleEnum {
    const userRoleString = this.authProvider.getUserRole();

    if (!userRoleString) return UserRoleEnum.None;

    return UserRoleEnum[userRoleString];
  }

  get isOHRDSuperuser(): boolean {
    return this.authProvider.getUserRole() === UserRoleEnum[UserRoleEnum.OHRDSuperuser];
  }
  get isOHRDAdministrator(): boolean {
    return (
      this.authProvider.getUserRole() === UserRoleEnum[UserRoleEnum.OHRDAdministrator]
    );
  }
  get isClinician(): boolean {
    return this.authProvider.getUserRole() === UserRoleEnum[UserRoleEnum.OHRDClinician];
  }
  get isClientSuperuser(): boolean {
    return this.authProvider.getUserRole() === UserRoleEnum[UserRoleEnum.ClientSuperuser];
  }
  get isClientAdministrator(): boolean {
    return (
      this.authProvider.getUserRole() === UserRoleEnum[UserRoleEnum.ClientAdministrator]
    );
  }

  get isClientRoles(): boolean {
    return this.isClientSuperuser || this.isClientAdministrator;
  }

  get isOHRDRoles(): boolean {
    return this.isOHRDSuperuser || this.isOHRDAdministrator;
  }
}
