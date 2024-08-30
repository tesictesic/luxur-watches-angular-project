import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductComponent } from './components/product/product.component';
import { SinglePageComponent } from './components/single-page/single-page.component';

const routes: Routes = [
  {
    path:"",
    pathMatch:"full",
    component:ProductComponent
  },
  {
    path:":id",
    component:SinglePageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
