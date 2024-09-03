import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ContactService } from '../../../shared/services/contact.service';
import { Contact } from '../../../shared/interfaces/contact';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
  isSuccessfullSentContactMessage:boolean=false;
  constructor(
    private contact_service:ContactService
  ){}
  form:any=new FormGroup({
    email:new FormControl('',[Validators.required,Validators.email]),
    name:new FormControl('',[Validators.minLength(3),Validators.required,Validators.pattern(/^[A-ZČĆŽĐŠ][a-zčćžđš]+(?:\s[A-ZČĆŽĐŠ][a-zčćžđš]+)*$/)]),
    subject:new FormControl('',[Validators.required,Validators.minLength(3)]),
    body:new FormControl('',[Validators.required,Validators.minLength(20),Validators.maxLength(200)])
  })
  save(){
    console.log(this.form);
    let contact_obj:Contact=this.form.value;
    console.log(contact_obj);
    this.contact_service.insertContactMessage(contact_obj).subscribe(item=>{
      this.form.reset({
        email:'',
        name:'',
        subject:'',
        message:''
      });
      this.isSuccessfullSentContactMessage=true;
    },
    
    error=>{console.log(error);}
  )

  }
}
