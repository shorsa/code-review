import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { DASHBOARD_MENU_ITEM, DashboardMenuItem } from './menu-items';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { UserPermissionsProvider } from '../../providers/user-permissions.provider';
import { NgxPermissionsService } from 'ngx-permissions';

@Component({
  templateUrl: './dashboard-layout.component.html',
  styleUrls: ['./dashboard-layout.component.scss'],
})
export class DashboardLayoutComponent implements OnInit {
  isCollapsed: boolean = true;
  isMobile: boolean = false;
  menuItems: DashboardMenuItem[] = DASHBOARD_MENU_ITEM;

  constructor(
    public breakpointObserver: BreakpointObserver,
    private changeDetector: ChangeDetectorRef,
    private readonly userPermissionsProvider: UserPermissionsProvider,
    private ngxPermissionsService: NgxPermissionsService
  ) {}

  ngOnInit(): void {
    this.userPermissionsProvider.updatePermissions();

    this.breakpointObserver
      .observe(['(min-width: 1024px)'])
      .subscribe((state: BreakpointState) => {
        this.isCollapsed = !state.matches;
      });
    this.breakpointObserver
      .observe(['(min-width: 580px)'])
      .subscribe((state: BreakpointState) => {
        this.isMobile = !state.matches;
      });
  }

  isShowMenuItemByRoles(menuItem: DashboardMenuItem): boolean {
    if (!menuItem?.roles?.length) return true;
    return menuItem.roles.includes(this.userPermissionsProvider.getUserRoleEnum);
  }
}
