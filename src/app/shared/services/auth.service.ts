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
