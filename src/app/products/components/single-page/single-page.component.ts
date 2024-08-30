import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductServiceService } from '../../../shared/services/product-service.service';

@Component({
  selector: 'app-single-page',
  templateUrl: './single-page.component.html',
  styleUrl: './single-page.component.css'
})
export class SinglePageComponent implements OnInit {
    product:any=[];
   constructor(
    private active_route:ActivatedRoute,
    private product_service:ProductServiceService
   ){}
   ngOnInit(): void {
        let product_id=this.active_route.snapshot.paramMap.get('id');
        if(product_id!=null){
          let product_id_int=parseInt(product_id);
          this.product_service.getSingleProduct(product_id_int).subscribe({
            next:(data)=>{
              console.log(data)
              this.product=data;
            },
            error(error){console.log(error)}
          })
        }
      
   }
}
