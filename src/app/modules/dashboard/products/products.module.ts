import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoutesConstants } from 'src/app/core/constants';
import { ProductsComponent } from './page/product-list/product-list.component';
import { ProductStoreModule } from './store/products.store.module';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzSegmentedModule } from 'ng-zorro-antd/segmented';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { ProductCreateModalComponent } from './components/product-create-modal/product-create-modal.component';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { ProductFormModule } from './components/product-form/product-form.module';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { SearchInputModule } from 'src/app/shared/components/search-input/search-input.module';

const routes: Routes = [
  {
    path: RoutesConstants.INDEX,
    component: ProductsComponent,
  },
  {
    path: RoutesConstants.DASHBOARD_PRODUCTS_EDIT,
    loadChildren: () =>
      import(
        'src/app/modules/dashboard/products/page/product-management/product-management.module'
      ).then((m) => m.ProductManagementModule),
  },
];

const MATERIAL = [
  NzPageHeaderModule,
  NzSpaceModule,
  NzSegmentedModule,
  NzTableModule,
  NzToolTipModule,
  NzDropDownModule,
  NzButtonModule,
  NzFormModule,
  NzSelectModule,
  NzInputModule,
  NzCheckboxModule,
  NzInputNumberModule,
  NzIconModule,
  NzPopconfirmModule,
  NzToolTipModule,
];

@NgModule({
  imports: [
    MATERIAL,
    SearchInputModule,
    ReactiveFormsModule,
    CommonModule,
    ProductFormModule,
    ProductStoreModule,
    RouterModule.forChild(routes),
  ],
  declarations: [ProductCreateModalComponent, ProductsComponent],
})
export class ProductsModule {}
