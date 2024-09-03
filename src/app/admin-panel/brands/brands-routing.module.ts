import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrandsDashboardComponent } from './components/brands-dashboard/brands-dashboard.component';

const routes: Routes = [
  {
    path:"",
    pathMatch:"full",
    component:BrandsDashboardComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BrandsRoutingModule { }
