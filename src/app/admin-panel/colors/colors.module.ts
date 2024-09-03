import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ColorsRoutingModule } from './colors-routing.module';
import { ColorsDashboardComponent } from './components/colors-dashboard/colors-dashboard.component';
import { AdminPanelModule } from '../admin-panel.module';


@NgModule({
  declarations: [
    ColorsDashboardComponent
  ],
  imports: [
    CommonModule,
    ColorsRoutingModule,
    AdminPanelModule
  ]
})
export class ColorsModule { }
