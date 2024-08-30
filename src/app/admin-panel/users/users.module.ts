import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';
import { AdminPanelModule } from '../admin-panel.module';


@NgModule({
  declarations: [
    UserDashboardComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    AdminPanelModule
  ]
})
export class UsersModule { }
