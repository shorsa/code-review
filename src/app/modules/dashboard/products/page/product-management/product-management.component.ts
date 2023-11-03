import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { filter } from 'rxjs';
import { CommonConstants } from 'src/app/core/constants';
import * as productActions from '../../store/products.actions';

@Component({
  selector: 'app-product-management',
  templateUrl: './product-management.component.html',
  styleUrls: ['./product-management.component.scss'],
})
export class ProductManagementComponent implements OnInit {
  productId?: string;

  constructor(private activatedRoute: ActivatedRoute, private store$: Store) {}

  ngOnInit() {
    this.initializationVariables();
  }

  private initializationVariables(): void {
    this.activatedRoute.queryParams.pipe(filter((val) => !!val)).subscribe((params) => {
      this.productId = params[CommonConstants.QUERY_ID];
      if (this.productId) {
        this.getProductById(this.productId);
      }
    });
  }

  private getProductById(id: string): void {
    this.store$.dispatch(productActions.productGetByIdAction({ payload: { id } }));
  }
}
