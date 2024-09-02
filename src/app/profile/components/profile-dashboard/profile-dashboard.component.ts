import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../shared/services/auth.service';
import { UserService } from '../../../shared/services/user.service';

@Component({
  selector: 'app-profile-dashboard',
  templateUrl: './profile-dashboard.component.html',
  styleUrl: './profile-dashboard.component.css'
})
export class ProfileDashboardComponent implements OnInit {
    token_data:any
    user_data:any
    cart_array:any
    product_array:any
    isModalOpen:boolean=false;
  constructor(
    private auth:AuthService,
    private user_service:UserService
  ){}

  ngOnInit(): void {
    this.token_data=this.auth.getDataFromJwtToken();
    console.log(this.token_data.UserId);
    this.user_service.getProfileData(this.token_data.UserId).subscribe({
      next:(data)=>{
        console.log(data);
        this.user_data=data;
        this.cart_array=this.user_data.cartUser
        console.log(this.cart_array);
      },
      error:(err)=>{
        console.log(err);
      }
    })
  
   }
   getProductForCart(array:any):void{
    this.isModalOpen=true;
    this.product_array=array;
    console.log(this.product_array);
   }
   closeModal(){
    this.isModalOpen=false;
   }
}
