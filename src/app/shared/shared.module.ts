import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ProductServiceService } from './services/product-service.service';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
  ],
  exports:[
    RouterModule,
    HttpClientModule,
    CommonModule
  ]
})
export class SharedModule { }
