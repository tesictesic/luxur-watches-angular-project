import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductServiceService } from '../../../shared/services/product-service.service';
import { CartServiceService } from '../../../shared/services/cart-service.service';
import { CartItem } from '../../../shared/interfaces/cart-item';
import { CartModalService } from '../../../shared/services/cart-modal.service';
import { Product } from '../../../shared/interfaces/product';

@Component({
  selector: 'app-single-page',
  templateUrl: './single-page.component.html',
  styleUrl: './single-page.component.css'
})
export class SinglePageComponent implements OnInit {
    product:any=[];
    quantity_sing:number=1;
    products_related:Product[]=[];
   constructor(
    private active_route:ActivatedRoute,
    private product_service:ProductServiceService,
    private cart:CartServiceService,
    private cart_modal:CartModalService,
    private router:Router
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
        this.product_service.getProducts().subscribe(item=>{
          
          this.products_related=item.items;
           let related_products=this.products_related.filter(y=>y.brandName==this.product.brandName);
           this.products_related=related_products;
           let remove_product_this=this.products_related.filter(y=>y.id!=this.product.id);
           this.products_related=remove_product_this;
           console.log(remove_product_this);
          
          
        })
      
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
   redirectToSinglePage(id:number):void{
    this.router.navigate(['/products']).then(() => {
      this.router.navigate(['/products', id]);
    });
  }
}
