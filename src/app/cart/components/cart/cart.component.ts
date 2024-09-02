import { Component, OnInit } from '@angular/core';
import { CartItem } from '../../../shared/interfaces/cart-item';
import { CartServiceService } from '../../../shared/services/cart-service.service';
import { AuthService } from '../../../shared/services/auth.service';
import { User } from '../../../shared/interfaces/user';
import { CartCheckout } from '../../../shared/interfaces/cart-checkout';
import { error } from 'console';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {
  cart_items:any[]=[];
   Total:number|null=null;
   user:User|null=null;
   cart_checkout:CartCheckout[]=[];
   token:string|null=null;
   isSuccessfullCheckout:boolean=false;
  constructor(
    private cart:CartServiceService,
    private auth:AuthService
  ){}
  ngOnInit(): void {
      this.cart.cartItems$.subscribe({
        next:(data)=>{console.log(data)
           this.cart_items=data
           this.GetTotalPrice();
           
          },
        error:(err)=>{console.log(err);}
      })
      this.user=this.auth.getDataFromJwtToken();
      this.token=this.auth.getJwtFromStorage();
      console.log(this.token);
      

  }
  removeItem(item:CartItem){
    this.cart.removeFromCart(item);
    this.GetTotalPrice();
  }
  GetTotalPrice():number{
   return this.Total=this.cart.getTotalPrice();
  }
  removeAll(){
    this.cart.removeAll();
  }
  changeQuantity(item:CartItem,value:string){
    let number_value=Number(value);
    this.cart.updateQuantity(item,number_value);
    this.cart.cartItems$.subscribe(item=>{
      this.Total=this.cart.getTotalPrice();
    })
  }
  checkout():void{
    console.log(this.cart_items);
    for(let elem of this.cart_items){
      const obj_item = {
    ProductId: elem.id,
    Quantity: elem.quantity
    };
      console.log(obj_item);
      this.cart_checkout.push(obj_item);
      
    }
    console.log(this.cart_checkout);
    console.log(this.token);
    let obj_cart={
      ProductCarts:this.cart_checkout
    };
    console.log(obj_cart);
    
     this.cart.checkout(obj_cart,this.token).subscribe({
       next:(data)=>{
         console.log(data);
         this.removeAll();
         this.isSuccessfullCheckout=true;
       },
       error:(err)=>{
         console.log(err);
       }
     })

   }
}
