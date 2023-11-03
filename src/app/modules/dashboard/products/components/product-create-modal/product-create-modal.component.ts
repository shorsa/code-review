import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { NZ_MODAL_DATA, NzModalService } from 'ng-zorro-antd/modal';
import { Observable } from 'rxjs';
import { selectIsLoading } from 'src/app/app-store/app-state/app-state.selectors';
import { markAsDirtyForm } from 'src/app/shared/helpers';
import { RequestCreateProductModel } from '../../models';
import { FormGroup } from '@angular/forms';
import * as productActions from '../../store/products.actions';
import { ProductModel } from 'src/app/shared/models';
import { ProductFormGroupValueModel } from '../product-form/product-form.component';

@Component({
  selector: 'app-product-create-modal',
  templateUrl: './product-create-modal.component.html',
  styleUrls: ['./product-create-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductCreateModalComponent implements OnInit {
  isLoading$?: Observable<boolean>;
  productData?: RequestCreateProductModel;
  formGroupIsValid: boolean = false;
  wasAttemptToSubmitForm: boolean = false;

  constructor(
    private modal: NzModalService,
    private changeDetection: ChangeDetectorRef,
    private store$: Store
  ) {}

  ngOnInit() {
    this.isLoading$ = this.store$.select(selectIsLoading);
  }

  handleChangeValue(event: ProductFormGroupValueModel): void {
    this.productData = event as RequestCreateProductModel;
  }

  handleChangeFormValidation(isValid: boolean): void {
    this.formGroupIsValid = isValid;
  }

  handleCancel(): void {
    this.modal.closeAll();
  }

  submitForm(): void {
    this.wasAttemptToSubmitForm = true;
    if (!this.formGroupIsValid) return;

    this.createProduct();
  }

  private createProduct(): void {
    const model: RequestCreateProductModel = {
      name: this.productData!.name,
      isHealthSurveillance: this.productData!.isHealthSurveillance,
      defaultPrice: this.productData!.defaultPrice,
      description: this.productData!.description,
      isAttendanceRequired: this.productData!.isAttendanceRequired,
      referralType: this.productData!.referralType,
      templateHeading: this.productData?.templateHeading,
    };

    this.store$.dispatch(productActions.productCreateAction({ payload: model }));
  }
}
