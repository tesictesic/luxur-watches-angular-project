import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
   path:"",
   pathMatch:"full",
   redirectTo:"home"
  },
  {
    path:"users",
    loadChildren:()=>import('./users/users.module').then(m=>m.UsersModule)
  },
  {
    path:"products",
    loadChildren:()=>import('./products/products.module').then(m=>m.ProductsModule)
  },
  {
    path:"home",
    loadChildren:()=>import('./home/home.module').then(m=>m.HomeModule)
  },
  {
    path:"brands",
    loadChildren:()=>import('./brands/brands.module').then(m=>m.BrandsModule)
  },
  {
    path:"genders",
    loadChildren:()=>import('./genders/genders.module').then(m=>m.GendersModule)
  },
  {
    path:"colors",
    loadChildren:()=>import('./colors/colors.module').then(m=>m.ColorsModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminPanelRoutingModule { }
