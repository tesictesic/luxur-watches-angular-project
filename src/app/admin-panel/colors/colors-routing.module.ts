import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ColorsDashboardComponent } from './components/colors-dashboard/colors-dashboard.component';

const routes: Routes = [
  {
    path:"",
    pathMatch:"full",
    component:ColorsDashboardComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ColorsRoutingModule { }
