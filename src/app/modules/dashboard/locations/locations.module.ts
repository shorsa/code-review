import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoutesConstants } from 'src/app/core/constants';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzSegmentedModule } from 'ng-zorro-antd/segmented';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductFormModule } from '../products/components/product-form/product-form.module';
import { ProductStoreModule } from '../products/store/products.store.module';
import { LocationsManagementModalComponent } from './components/locations-management-modal/locations-management-modal.component';
import { LocationsStoreModule } from './store/locations.store.module';
import { LocationsComponent } from './page/locations-page/locations.component';
import { WarningsAppointmentsModalComponent } from './components/warnings-appointments-modal/warnings-appointments-modal.component';
import { CustomDatePipeModule } from 'src/app/shared/pipes/pipes.module';
import { SearchInputModule } from 'src/app/shared/components/search-input/search-input.module';

const routes: Routes = [
  {
    path: RoutesConstants.INDEX,
    component: LocationsComponent,
  },
  {
    path: RoutesConstants.DASHBOARD_SITES,
    loadChildren: () =>
      import(
        'src/app/modules/dashboard/locations/page/sites-page/sites-page.module'
      ).then((m) => m.SitesPageModule),
  },
  {
    path: RoutesConstants.DASHBOARD_ROOMS,
    loadChildren: () =>
      import(
        'src/app/modules/dashboard/locations/page/rooms-page/rooms-page.module'
      ).then((m) => m.RoomsPageModule),
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
  NzIconModule,
  NzPopconfirmModule,
  NzToolTipModule,
];

@NgModule({
  imports: [
    MATERIAL,
    LocationsStoreModule,
    CustomDatePipeModule,
    SearchInputModule,
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
  ],
  declarations: [
    LocationsComponent,
    LocationsManagementModalComponent,
    WarningsAppointmentsModalComponent,
  ],
})
export class LocationsModule {}
