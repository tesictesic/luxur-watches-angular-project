import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Credentials } from '../interfaces/credentials';
import { BehaviorSubject, Observable } from 'rxjs';
import { Token } from '../interfaces/token';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  token_jwt:Token={token:''}
  constructor(private http:HttpClient) { }

  makeJwtToken(obj_credentials:Credentials):Observable<any>{
      return this.http.post("http://localhost:5244/api/Jwt",obj_credentials)
  }
  setJwtToken(token:Token):void{
    localStorage.setItem('JwtToken',token.token);
  }
  isLoggedIn():boolean{
    return !!this.getJwtFromStorage();
  }
  logout():void{
    localStorage.removeItem("JwtToken");
  }
  getJwtFromStorage(){
  return localStorage.getItem("JwtToken");
  }
  getDataFromJwtToken():any{
    this.token_jwt.token='';
    let token=this.getJwtToken();
    this.token_jwt.token=token;
    let jwtHelper=new JwtHelperService();
    return jwtHelper.decodeToken(this.token_jwt.token)
  }
  isLoggedUserAdmin(){
    let allowed_use_cases_for_user=this.getDataFromJwtToken().AllowedUseCases;
    let user_use_cases_id_arr=allowed_use_cases_for_user.split(',');
    let admin_use_cases_id=[2,3,4,5,7,8,9,10,12,13,14,15,16,17,18,19,20,21,28,33];
    return admin_use_cases_id.some(el=>user_use_cases_id_arr.includes(el.toString()))
  }
  


  getJwtToken():string{
    // local Storage
    var jwt=this.getJwtFromStorage();
    console.log(jwt)
    if(jwt!=null){
    
      this.token_jwt.token=jwt;
    }
    
    return this.token_jwt.token
  }
}
