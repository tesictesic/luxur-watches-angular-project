import { Component, OnInit } from '@angular/core';
import { CartModalService } from '../../services/cart-modal.service';

@Component({
  selector: 'app-toast-cart',
  templateUrl: './toast-cart.component.html',
  styleUrl: './toast-cart.component.css'
})
export class ToastCartComponent implements OnInit {
    isDisabledModal:boolean=true;
    modal_text:string="";
    constructor(
      private cart_modal_service:CartModalService
    ){}
    ngOnInit(): void {
      this.cart_modal_service.$modalText.subscribe(item=>{
        this.modal_text=item;
      })
      this.cart_modal_service.$isDisabled.subscribe(item=>{
        this.isDisabledModal=item;
      })
      
    }
    closeModal():void{
      this.isDisabledModal=true;
    }
}
