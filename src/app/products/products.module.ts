import { NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsRoutingModule } from './products-routing.module';
import { SinglePageComponent } from './components/single-page/single-page.component';
import { SharedModule } from '../shared/shared.module';
import { ProductComponent } from './components/product/product.component';


@NgModule({
  declarations: [
    SinglePageComponent,
    ProductComponent
   
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    SharedModule,
    
  ]
})
export class ProductsModule{ 

 

}
