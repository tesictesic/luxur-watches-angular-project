import { Component, OnInit } from '@angular/core';
import { CartItem } from '../../../shared/interfaces/cart-item';
import { CartServiceService } from '../../../shared/services/cart-service.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {
  cart_items:any[]=[];
   Total:number|null=null;
  constructor(private cart:CartServiceService){}
  ngOnInit(): void {
      this.cart.cartItems$.subscribe({
        next:(data)=>{console.log(data)
           this.cart_items=data
           this.GetTotalPrice();
           
          },
        error:(err)=>{console.log(err);}
      })
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
}
