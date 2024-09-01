import { Component, OnInit } from '@angular/core';
import { Credentials } from '../../../../shared/interfaces/credentials';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../../shared/services/auth.service';
import { Router } from '@angular/router';
import { Token } from '../../../../shared/interfaces/token';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  isDisabledBlock:boolean=true
  token_jwt:Token={token:''}
   obj_credentials:Credentials={email:"",password:""}
  form:any=new FormGroup({
    email:new FormControl('',[Validators.required,Validators.email]),
    password:new FormControl('',[Validators.required,])
  })
  constructor(
    private auth:AuthService,
    private router:Router
  ){}
  //Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$")
  logIn(){
    this.obj_credentials=this.form.value;
    console.log(this.obj_credentials);
    this.auth.makeJwtToken(this.obj_credentials).subscribe({
      next:(data)=>{
        console.log(data);
        this.isDisabledBlock=true
        this.router.navigate(["/home"]);
        this.token_jwt=data;
        this.auth.setJwtToken(this.token_jwt);

      },
      error:(err)=>{
        console.log(err);
        this.isDisabledBlock=false;
        this.form.reset({
          email:'',
          password:''
        })
      }
    })
  }
}
