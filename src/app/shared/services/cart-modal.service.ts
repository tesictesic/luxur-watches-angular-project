import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartModalService {

  $isDisabled=new BehaviorSubject<boolean>(true);
  $modalText=new BehaviorSubject<string>("");
  constructor() { }

  ChangeTextToCart(text:string){
    this.$modalText.next(text);
  }
  ChangeModalStatus(value:boolean){
    this.$isDisabled.next(value);
  }
}
