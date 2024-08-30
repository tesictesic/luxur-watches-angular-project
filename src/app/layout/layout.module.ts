import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { LayoutComponent } from './components/layout/layout.component';
import { SharedModule } from '../shared/shared.module';




@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    NavigationComponent,
    LayoutComponent
  ],
  imports: [
    CommonModule,
    SharedModule
    
  ],
  exports:[
    LayoutComponent
  ]
})
export class LayoutModule { }
