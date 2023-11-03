import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription, filter } from 'rxjs';
import { CommonConstants } from 'src/app/core/constants';
import * as contractsActions from '../../store/contracts.actions';
import { RequestUpdateContractModel } from '../../models';
import * as contractsSelectors from '../../store/contracts.selectors';

@Component({
  selector: 'app-contracts-management',
  templateUrl: './contracts-management.component.html',
  styleUrls: ['./contracts-management.component.scss'],
})
export class ContractsManagementComponent implements OnInit, OnDestroy {
  private subscriptions$: Subscription = new Subscription();

  currentTabIndex = 0;
  contractId?: string;
  contractDetails?: RequestUpdateContractModel;

  constructor(
    private store$: Store,
    private changeDetector: ChangeDetectorRef,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.subscriptions$.add(
      this.activatedRoute.queryParams.pipe(filter((val) => !!val)).subscribe((params) => {
        this.contractId = params[CommonConstants.QUERY_ID];
        if (this.contractId) {
          this.getContractDetails();
        }
      })
    );

    this.subscriptions$.add(
      this.store$
        .select(contractsSelectors.selectContractTemporaryDetails)
        .pipe(filter((val) => !!val))
        .subscribe((res) => {
          this.contractDetails = res!;
        })
    );
  }

  nexTab(): void {
    this.currentTabIndex++;
  }

  prevTab(): void {
    this.currentTabIndex--;
  }

  private getContractDetails(): void {
    this.store$.dispatch(
      contractsActions.getContractByIdAction({ payload: { id: this.contractId! } })
    );
  }

  ngOnDestroy(): void {
    this.store$.dispatch(contractsActions.clearContractsDetailsAction())
  }
}
