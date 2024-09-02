import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Register } from '../../../../shared/interfaces/register';
import { RegisterService } from '../../../../shared/services/register.service';
import { error } from 'console';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  picture:File|null=null;
  isRegistered:boolean=false;
  constructor(
    private register_service:RegisterService
  ){}
  register_obj:Register={first_name:'',last_name:'',email:'',password:'',picture:null}
 form=new FormGroup({
  first_name:new FormControl(null,[Validators.required,Validators.pattern(/^[A-Z][a-z]{3,}$/)]),
  last_name:new FormControl(null,[Validators.required,Validators.pattern(/^[A-Z][a-z]{3,}$/)]),
  email:new FormControl(null,[Validators.required,Validators.email]),
  password:new FormControl(null,[Validators.required,Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/)]),
  picture:new FormControl(null,[Validators.pattern(/\.(jpg|jpeg|png)$/i)])

 })
 insertPicture(event:any){
  const file=event.target.files[0];
  console.log(file);
  this.picture=file;
 }
registration(){
  this.register_obj.first_name=this.form.value.first_name
  this.register_obj.last_name=this.form.value.last_name
  this.register_obj.email=this.form.value.email
  this.register_obj.password=this.form.value.password
  this.register_obj.picture=this.form.value.picture
  this.register_service.getData(this.register_obj,this.picture)
  this.register_service.sendData().subscribe(response=>{
      this.form.reset({
        first_name:null,
        last_name:null,
        email:null,
        password:null,
        picture:null
      })
      this.isRegistered=true;
  },
  error=>{console.log(error)}

)
}

 
}
