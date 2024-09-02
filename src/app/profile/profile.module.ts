import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileDashboardComponent } from './components/profile-dashboard/profile-dashboard.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    ProfileDashboardComponent
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    SharedModule
  ]
})
export class ProfileModule { }
