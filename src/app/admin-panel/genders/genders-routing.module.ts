import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GendersDashboardComponent } from './components/genders-dashboard/genders-dashboard.component';

const routes: Routes = [
  {
    path:"",
    pathMatch:"full",
    component:GendersDashboardComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GendersRoutingModule { }
