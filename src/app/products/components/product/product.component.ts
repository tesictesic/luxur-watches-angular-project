import { Component, OnInit } from '@angular/core';
import { ProductServiceService } from '../../../shared/services/product-service.service';
import { Router } from '@angular/router';
import { BrandServiceService } from '../../../shared/services/brand-service.service';
import { GenderServiceService } from '../../../shared/services/gender-service.service';
import { error } from 'console';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit {
  currentPage:number=0;
  product_items:any=[];
  brand_items:any=[];
  gender_items:any=[];
  constructor(
    private router:Router,
    private products:ProductServiceService,
    private brands:BrandServiceService,
    private gender:GenderServiceService
 ){}
  ngOnInit(): void {
     this.products.getProducts().subscribe({
      next:(data)=>{
        console.log(data);
        this.product_items=data.items;
        console.log(this.product_items);     
      },
      error:(error)=>{
        console.log(error);
      }
     });
     this.gender.getGender().subscribe({
      next:(data)=>{
        console.log(data);
        this.gender_items=data.items;
      },
      error:(error)=>{console.log(error);}
     });
     this.brands.getBrands().subscribe({
      next:(data)=>{
        console.log(data);
        this.brand_items=data.items
      },
      error:(error)=>{console.log(error);}
     })
     
   }
   redirectToSinglePage(id:number):void{
     this.router.navigate(["/products",id]);
   }
}
