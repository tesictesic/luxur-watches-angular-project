import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductServiceService } from '../../../shared/services/product-service.service';
import { CartServiceService } from '../../../shared/services/cart-service.service';
import { CartItem } from '../../../shared/interfaces/cart-item';
import { CartModalService } from '../../../shared/services/cart-modal.service';

@Component({
  selector: 'app-single-page',
  templateUrl: './single-page.component.html',
  styleUrl: './single-page.component.css'
})
export class SinglePageComponent implements OnInit {
    product:any=[];
    quantity_sing:number=1;
   constructor(
    private active_route:ActivatedRoute,
    private product_service:ProductServiceService,
    private cart:CartServiceService,
    private cart_modal:CartModalService
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
   addToCart(item:CartItem){
    let cart_text="";
    console.log(this.quantity_sing);
    console.log(typeof(this.quantity_sing))
    this.cart.addToCart(item,true,this.quantity_sing);
    this.cart.cartText$.subscribe(item=>{
      cart_text=item;
    });
    this.cart_modal.ChangeTextToCart(cart_text);
    this.cart_modal.ChangeModalStatus(false);
    setTimeout(()=>{
      this.cart_modal.ChangeModalStatus(true);
    },2000)
    
   }
}
