import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../../home/components/home/home.component';
import { HomeDashboardComponent } from './components/home-dashboard/home-dashboard.component';

const routes: Routes = [
  {
    path:"",
    pathMatch:"full",
    component:HomeDashboardComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
