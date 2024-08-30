import { NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductComponent } from './components/product/product.component';
import { SinglePageComponent } from './components/single-page/single-page.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    SinglePageComponent,
   
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    SharedModule,
    
  ]
})
export class ProductsModule{ 

 

}
