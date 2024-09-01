import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { CartServiceService } from '../../../shared/services/cart-service.service';
import { AuthService } from '../../../shared/services/auth.service';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
   totalCount:number|null=null;
   isLogged:boolean=false;
   tokenData:any
   
  
  constructor(
    private cart:CartServiceService,
    private auth:AuthService,
    private router:Router
    
  ){}
  ngOnInit(): void {
    this.cart.cartItems$.subscribe(item=>{
      this.totalCount=this.cart.getTotalCountOfCartItems();
    })
    this.isLogged=this.auth.isLoggedIn();
    this.router.events.forEach((event)=>{
      console.log(event);
      if(event instanceof NavigationEnd) {
        this.isLogged = this.auth.isLoggedIn();
      }
       this.tokenData=this.auth.getDataFromJwtToken();
      console.log(this.tokenData);
    })
    
  }
  logout():void{
    this.auth.logout();
    this.router.navigate(["/"]);
  }
}
