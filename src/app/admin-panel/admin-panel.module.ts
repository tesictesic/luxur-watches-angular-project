import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminPanelRoutingModule } from './admin-panel-routing.module';
import { SidebarComponent } from './sidebar/sidebar.component';
import { InsertModalForLookupTablesComponent } from './components/insert-modal-for-lookup-tables/insert-modal-for-lookup-tables.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    SidebarComponent,
    InsertModalForLookupTablesComponent
  ],
  imports: [
    CommonModule,
    AdminPanelRoutingModule,
    SharedModule
  ],
  exports:[
    SidebarComponent,
    InsertModalForLookupTablesComponent
  ]
})
export class AdminPanelModule { }
