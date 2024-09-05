import { Component } from '@angular/core';
import { HelperService } from '../../../shared/services/helper.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RegisterService } from '../../../shared/services/register.service';
import { UserAdmin } from '../../../shared/interfaces/user-admin';
import { UserService } from '../../../shared/services/user.service';

@Component({
  selector: 'app-insert-update-user-modal',
  templateUrl: './insert-update-user-modal.component.html',
  styleUrl: './insert-update-user-modal.component.css'
})
export class InsertUpdateUserModalComponent {
  isDisabled:boolean=true;
  errors_array:any
  Image:File|null=null
  user:UserAdmin|null=null
  form:any=new FormGroup({
    First_Name:new FormControl('',[Validators.required,Validators.pattern(/^[A-Z][a-z]{3,}$/)]),
    Last_Name:new FormControl('',[Validators.required,Validators.pattern(/^[A-Z][a-z]{3,}$/)]),
    Email:new FormControl('',[Validators.required,Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)]),
    Password:new FormControl('',[Validators.required,Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/)]),
    Image:new FormControl(null,[Validators.pattern(/\.(jpg|jpeg|png)$/i)])
  })
constructor(
  private helper:HelperService,
  private register:RegisterService,
  private user_service:UserService
){}
ngOnInit(): void {
  //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
  //Add 'implements OnInit' to the class.
  this.helper.$isDisabled.subscribe(item=>{
    this.user=null;
      this.isDisabled =item;
  })
  this.helper.$errors.subscribe(item=>{
    if(item!=undefined){
      this.errors_array=item;
    }
  })
  this.helper.$obj_update.subscribe(item=>{
    console.log(item);
   
    
   
    window.setTimeout(()=>{
      this.user=item;
    },100)
    console.log(this.user);
    if(this.user!=null){
      this.form.removeControl("Password");
    }
   
  })
}
closeModal():void{
  this.helper.$isDisabled.next(true);
}
save(type_of_action:string):void{
  if(type_of_action=='insert'){
    const formData = {
    
      first_name: this.form.value.First_Name,
      last_name: this.form.value.Last_Name,
      email: this.form.value.Email,
      password: this.form.value.Password,
      Image: this.Image
    };
    console.log(formData);
    this.user_service.$obj_insert_form.next(formData);
  }
  else{
    const formData = {
      id:this.user?.id,
      first_name: this.form.value.First_Name,
      last_name: this.form.value.Last_Name,
      email: this.form.value.Email,
      Image: this.Image
    };
    console.log(formData);
    this.user_service.$obj_update_form.next(formData);
  }
 
  this.form.reset({
    First_Name:'',
    Last_Name:'',
    Email:'',
    Password:'',
    Image:null
  });
  this.closeModal();
  
}
getPicture(event:any){
  console.log(event);
  const file=event.target.files[0];
  console.log(file);
  this.Image=file;
 }
}
