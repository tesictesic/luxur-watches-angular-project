import { Injectable } from '@angular/core';
import { CartItem } from '../interfaces/cart-item';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartServiceService {

  private cartItems:CartItem[]=[];
  cartItems$=new BehaviorSubject<CartItem[]>(this.GetCartItemsFromLocalStorage());
  cartText$=new BehaviorSubject<string>('');
  constructor() { }

  addToCart(item:CartItem){
    const existingItem=this.cartItems.find(i=>i.id==item.id);
    if(existingItem){
      existingItem.quantity+=1;
      this.cartText$.next("You have successfull updated quantity of product");
    }
    else{
      item.quantity=1;
      this.cartItems.push(item);
      this.cartText$.next("you have successfull added product to cart");
    }
    this.saveCartItemsToLocalStorage();
    this.cartItems$.next(this.cartItems);
  }
  removeFromCart(item:CartItem){
    this.cartItems=this.cartItems.filter(i=>i.id!==item.id);
    this.saveCartItemsToLocalStorage();
     this.cartItems$.next(this.cartItems);
  }
  updateQuantity(item:CartItem,value:number){
    const existingItem=this.cartItems.find(i=>i.id==item.id);
    if(existingItem) existingItem.quantity=value;
    this.saveCartItemsToLocalStorage();
  }
  getTotalPrice():number{
    let sum=0;
    this.cartItems.forEach(x=>{
      sum+=x.productPrice*x.quantity
    });
    return sum;
  }
  getTotalCountOfCartItems():number{
    return this.getCartItemsLengthToLocalStorage();
  }
  removeAll(){
    this.cartItems=[];
    this.saveCartItemsToLocalStorage();
    this.cartItems$.next(this.cartItems)
  }
  private saveCartItemsToLocalStorage(){
    localStorage.setItem('cartItems',JSON.stringify(this.cartItems));
    localStorage.setItem('cartItemLength',this.cartItems.length.toString())

  }
  private GetCartItemsFromLocalStorage():CartItem[]{
    const items=localStorage.getItem('cartItems');
    return items?JSON.parse(items):[];
  }
  private getCartItemsLengthToLocalStorage():number{
    const item_length=localStorage.getItem('cartItemLength');
    if(item_length){
      return parseInt(item_length,10);
    }
    return 0
  }

}
