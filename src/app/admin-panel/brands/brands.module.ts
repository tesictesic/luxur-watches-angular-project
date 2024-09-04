import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BrandsRoutingModule } from './brands-routing.module';
import { BrandsDashboardComponent } from './components/brands-dashboard/brands-dashboard.component';
import { AdminPanelModule } from '../admin-panel.module';
import { SharedModule } from '../../shared/shared.module';



@NgModule({
  declarations: [
    BrandsDashboardComponent
  ],
  imports: [
    CommonModule,
    BrandsRoutingModule,
    AdminPanelModule,
    SharedModule
  ]
})
export class BrandsModule { }
