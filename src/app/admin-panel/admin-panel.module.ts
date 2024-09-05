import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminPanelRoutingModule } from './admin-panel-routing.module';
import { SidebarComponent } from './sidebar/sidebar.component';
import { InsertModalForLookupTablesComponent } from './components/insert-modal-for-lookup-tables/insert-modal-for-lookup-tables.component';
import { SharedModule } from '../shared/shared.module';
import { DeleteModalComponent } from './components/delete-modal/delete-modal.component';
import { InsertUpdateProductModalComponent } from './components/insert-update-product-modal/insert-update-product-modal.component';
import { InsertUpdateUserModalComponent } from './components/insert-update-user-modal/insert-update-user-modal.component';


@NgModule({
  declarations: [
    SidebarComponent,
    InsertModalForLookupTablesComponent,
    DeleteModalComponent,
    InsertUpdateProductModalComponent,
    InsertUpdateUserModalComponent,
  ],
  imports: [
    CommonModule,
    AdminPanelRoutingModule,
    SharedModule
  ],
  exports:[
    SidebarComponent,
    InsertModalForLookupTablesComponent,
    InsertUpdateProductModalComponent,
    InsertUpdateUserModalComponent,
    DeleteModalComponent
  ]
})
export class AdminPanelModule { }
