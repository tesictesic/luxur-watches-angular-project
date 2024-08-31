import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
  form:any=new FormGroup({
    email:new FormControl('',[Validators.required,Validators.email]),
    name:new FormControl('',[Validators.minLength(3),Validators.required,Validators.pattern(/^[A-Z][a-z]{2,}$/)]),
    subject:new FormControl('',[Validators.required,Validators.minLength(3)]),
    message:new FormControl('',[Validators.required,Validators.minLength(20),Validators.maxLength(200)])
  })
  save(){
    console.log(this.form);
  }
}
