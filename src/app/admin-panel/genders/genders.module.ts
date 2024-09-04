import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GendersRoutingModule } from './genders-routing.module';
import { GendersDashboardComponent } from './components/genders-dashboard/genders-dashboard.component';
import { AdminPanelModule } from '../admin-panel.module';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  declarations: [
    GendersDashboardComponent
  ],
  imports: [
    CommonModule,
    GendersRoutingModule,
    AdminPanelModule,
    SharedModule
  ]
})
export class GendersModule { }
