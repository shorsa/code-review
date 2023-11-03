import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Observable } from 'rxjs';
import { selectIsLoading } from 'src/app/app-store/app-state/app-state.selectors';
import { TermsAndConditionsService } from 'src/app/core/services/terms-and-conditions.service';
import { BaseResponseModel } from 'src/app/shared/models';
import { PatientMergeModalComponent } from '../../patients/components/patient-merge-modal/patient-merge-modal.component';
import { UserTermsAndConditionModalComponent } from '../components/user-terms-and-condition-modal/user-terms-and-condition-modal.component';
import { UserPermissionsProvider } from 'src/app/shared/providers/user-permissions.provider';
import { AuthenticationProvider } from 'src/app/shared/helpers';

@Component({
  selector: 'app-user-terms-and-conditions',
  templateUrl: './user-terms-and-conditions.component.html',
  styleUrls: ['./user-terms-and-conditions.component.scss'],
})
export class UserTermsAndConditionsComponent implements OnInit {
  isLoading$?: Observable<boolean>;
  userTerms?: string;
  isNotClientSuperUser: boolean = false;
  userName?: string;

  constructor(
    private store$: Store,
    private modal: NzModalService,
    private viewContainerRef: ViewContainerRef,
    private readonly authProvider: AuthenticationProvider,
    private readonly userPermissionsHelper: UserPermissionsProvider,
    private readonly termsAndCondService: TermsAndConditionsService
  ) {
    this.isNotClientSuperUser = !this.userPermissionsHelper.isClientSuperuser;
    this.userName = this.authProvider.getUserName();
  }

  ngOnInit() {
    this.isLoading$ = this.store$.select(selectIsLoading);

    if (this.isNotClientSuperUser) return;

    this.termsAndCondService.getUserTerms().subscribe((res: BaseResponseModel) => {
      this.userTerms = res.message;
      this.openModal();
    });
  }

  openModal(): void {
    this.modal.create<UserTermsAndConditionModalComponent, any>({
      nzTitle: 'Terms & Conditions',
      nzContent: UserTermsAndConditionModalComponent,
      nzViewContainerRef: this.viewContainerRef,
      nzWidth: '930px',
      nzAutofocus: null,
      nzCancelDisabled: false,
      nzClosable: false,
      nzMaskClosable: false,
      nzData: {
        content: this.userTerms,
      },
      nzFooter: null,
    });
  }

  logOut(): void {
    this.authProvider.signOut();
  }
}
