import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, filter } from 'rxjs';
import { RoutesConstants } from 'src/app/core/constants';
import { RequestUpdateProductModel } from '../../models';
import { Store } from '@ngrx/store';
import { ProductModel } from 'src/app/shared/models';
import * as productActions from '../../store/products.actions';
import * as productSelectors from '../../store/products.selectors';
import { ProductFormGroupValueModel } from '../product-form/product-form.component';
@Component({
  selector: 'app-product-type-details',
  templateUrl: './product-type-details.component.html',
  styleUrls: ['./product-type-details.component.scss'],
})
export class ProductTypeDetailsComponent implements OnInit, OnDestroy {
  @Input() productId?: string;

  isLoading$?: Observable<boolean>;
  productData?: ProductModel;
  formGroupIsValid: boolean = false;
  wasAttemptToSubmitForm: boolean = false;

  constructor(private router: Router, private store$: Store) {}

  ngOnInit() {
    this.store$
      .select(productSelectors.selectProductDetails)
      .pipe(filter((val) => val !== undefined))
      .subscribe((productData) => {
        this.productData = productData;
      });
  }

  cancel(): void {
    this.router.navigate([
      RoutesConstants.DASHBOARD_INDEX,
      RoutesConstants.DASHBOARD_PRODUCTS,
    ]);
  }

  handleChangeValue(event: ProductFormGroupValueModel): void {
    this.productData = { ...this.productData!, ...event };
  }

  handleChangeFormValidation(isValid: boolean): void {
    this.formGroupIsValid = isValid;
  }

  submitForm(): void {
    this.wasAttemptToSubmitForm = true;
    if (!this.formGroupIsValid) return;

    this.updateProduct();
  }

  private updateProduct(): void {
    const model: RequestUpdateProductModel = {
      id: this.productData!.id,
      name: this.productData!.name,
      isHealthSurveillance: this.productData!.isHealthSurveillance!,
      defaultPrice: this.productData!.defaultPrice,
      description: this.productData!.description,
      isAttendanceRequired: this.productData!.isAttendanceRequired!,
      referralType: this.productData!.referralType!,
      templateHeading: this.productData?.templateHeading,
    };

    this.store$.dispatch(productActions.productUpdateAction({ payload: model }));
  }

  ngOnDestroy(): void {
    this.store$.dispatch(productActions.clearProductDetailsDataAction());
  }
}
