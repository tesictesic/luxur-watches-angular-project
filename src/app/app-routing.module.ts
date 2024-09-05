import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from './shared/guards/auth.guard';

const routes: Routes = [
  {
    path:"",
    pathMatch:"full",
    redirectTo:'home'
  },
  {
    path:"home",
    loadChildren:()=>import('./home/home.module').then(m=>m.HomeModule)
  },
  {
    path:'products',
    loadChildren: () => import('./products/products.module').then(m => m.ProductsModule)
  },
  {
    path:"contact",
    loadChildren: () => import('./contact/contact.module').then(m => m.ContactModule)
  },
  {
    path:"cart",
    loadChildren:()=>import('./cart/cart.module').then(m=>m.CartModule)
  },
  {
    path:"login",
    loadChildren:()=>import('./LoginRegister/login/login.module').then(m=>m.LoginModule)
  },
  {
    path:"register",
    loadChildren:()=>import('./LoginRegister/register/register.module').then(m=>m.RegisterModule)
  },
  {
    path:"admin-panel",
    loadChildren:()=>import('./admin-panel/admin-panel.module').then(m=>m.AdminPanelModule),
    canActivateChild:[AdminGuard]
    
  },
  {
    path:"profile",
    loadChildren:()=>import('./profile/profile.module').then(m=>m.ProfileModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
