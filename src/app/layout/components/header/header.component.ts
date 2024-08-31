import { Component, OnInit } from '@angular/core';
import { CartServiceService } from '../../../shared/services/cart-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
   totalCount:number|null=null;
  constructor(
    private cart:CartServiceService
  ){}
  ngOnInit(): void {
    this.cart.cartItems$.subscribe(item=>{
      this.totalCount=this.cart.getTotalCountOfCartItems();
    })
    
  }
}
