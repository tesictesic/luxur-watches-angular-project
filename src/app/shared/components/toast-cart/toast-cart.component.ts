import { Component, OnInit } from '@angular/core';
import { CartModalService } from '../../services/cart-modal.service';
import { HelperService } from '../../services/helper.service';

@Component({
  selector: 'app-toast-cart',
  templateUrl: './toast-cart.component.html',
  styleUrl: './toast-cart.component.css'
})
export class ToastCartComponent implements OnInit {
    isDisabledModal:boolean=true;
    modal_text:string="";
    constructor(
      private cart_modal_service:CartModalService,
      private helper_service:HelperService
    ){}
    ngOnInit(): void {
      this.cart_modal_service.$modalText.subscribe(item=>{
        this.modal_text=item;
      })
      this.cart_modal_service.$isDisabled.subscribe(item=>{
        this.isDisabledModal=item;
        
        
      })
      this.helper_service.$delete_error.subscribe(item=>{

        if(item!=''){
          this.isDisabledModal=false;
          
          this.modal_text=item;
          setTimeout(()=>{
            this.isDisabledModal=true;
          },2000);
          this.helper_service.$delete_error.next('');
        }
        
      
      })
    }
    closeModal():void{
      this.isDisabledModal=true;
    }
}
