import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Subscription, filter } from 'rxjs';
import { errorAction } from 'src/app/app-store/app-state/app-state.actions';
import {
  CommonConstants,
  CommonMessagesConstants,
  RoutesConstants,
} from 'src/app/core/constants';
import { ReferralService } from 'src/app/core/services/referral.service';
import { BaseResponseModel } from 'src/app/shared/models';
import { ResponseGetProductOptionsModelItem } from '../../../products/models';
import { ReferralTypeEnum } from '../../enums';
import { ReferralDetailsModel } from '../../models';
import * as referralActions from '../../state/referral.actions';
import * as referralSelectors from '../../state/referral.selectors';
import { ReferralStatusEnum } from 'src/app/shared/enums';
import { UserPermissionsProvider } from 'src/app/shared/providers/user-permissions.provider';

@Component({
  templateUrl: './referral-management.component.html',
  styleUrls: ['./referral-management.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReferralManagementComponent implements OnInit, OnDestroy {
  private subscriptions$: Subscription = new Subscription();

  referralId?: string;
  productId?: string;
  referralDetails?: ReferralDetailsModel;
  referralFormType?: ReferralTypeEnum;
  referralStatus?: ReferralStatusEnum;
  currentTabIndex: number = 0;

  constructor(
    private changeDetector: ChangeDetectorRef,
    private activatedRoute: ActivatedRoute,
    private referralService: ReferralService,
    private store$: Store,
    private router: Router,
    private notification: NzNotificationService,
    private readonly userPermissionsProvider: UserPermissionsProvider
  ) {}

  get isShowManagementForm(): boolean {
    return this.referralFormType === ReferralTypeEnum.Management;
  }

  get canEditDetails(): boolean {
    if (this.userPermissionsProvider.isOHRDRoles) return true;

    if (this.referralStatus === undefined) return false;

    return [
      ReferralStatusEnum.AwaitingSubmit,
      ReferralStatusEnum.AwaitingTriage,
    ].includes(this.referralStatus);
  }

  ngOnInit(): void {
    this.subscriptions$.add(
      this.activatedRoute.queryParams.pipe(filter((val) => !!val)).subscribe((params) => {
        this.referralId = params[CommonConstants.QUERY_ID];
      })
    );

    if (this.referralId) {
      this.store$
        .select(referralSelectors.selectReferralDetails)
        .pipe(filter((val) => !!val))
        .subscribe((data) => {
          this.referralDetails = data;
          this.referralStatus = data?.status;
          this.referralFormType = data!.referralType;
          this.productId = data?.product.id;
        });
    }
  }

  handleChangeProduct(product: ResponseGetProductOptionsModelItem) {
    this.referralService
      .updateProductNewType({ referralId: this.referralId!, productId: product.id })
      .subscribe({
        next: (value: BaseResponseModel & { id: string }) => {
          if (!value.success) {
            this.store$.dispatch(
              errorAction({
                payload: {
                  error: JSON.stringify(value.message),
                  isApiError: true,
                },
              })
            );
            return;
          }
          this.referralFormType = product.referralType;
          this.store$.dispatch(referralActions.clearReferralDetailsDataAction());

          this.notification.success(
            CommonMessagesConstants.NOTIFICATION_SUCCESS,
            CommonMessagesConstants.NOTIFICATION_REFERRAL_PRODUCT_CHANGED
          );

          this.router.navigate(
            [
              RoutesConstants.DASHBOARD_INDEX,
              RoutesConstants.DASHBOARD_REFERRAL,
              RoutesConstants.DASHBOARD_REFERRAL_EDIT,
            ],
            { queryParams: { id: value.id } }
          );

          this.currentTabIndex = 1;
        },

        error: (error) => {
          this.store$.dispatch(
            errorAction({
              payload: {
                error: JSON.stringify(error),
                isApiError: true,
              },
            })
          );
        },
      });

    this.changeDetector.detectChanges();
  }

  handleChangeTabIndex(tabIndex: number): void {
    this.currentTabIndex = tabIndex;
  }

  ngOnDestroy(): void {
    this.store$.dispatch(referralActions.clearReferralDetailsDataAction());
    this.subscriptions$.unsubscribe();
  }
}
