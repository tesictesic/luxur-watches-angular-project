import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeDashboardComponent } from './components/home-dashboard/home-dashboard.component';
import { AdminPanelModule } from '../admin-panel.module';


@NgModule({
  declarations: [
    HomeDashboardComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    AdminPanelModule
  ]
})
export class HomeModule { }
