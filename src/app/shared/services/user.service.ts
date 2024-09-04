import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(
    private http:HttpClient,
  
  ) { }
  getProfileData(UserId:number):Observable<any>{
      return this.http.get("http://localhost:5244/api/user/"+UserId);
  }
  getUsers(page:number|null=null,token:string):Observable<any>{
    
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    if(page!=null){
      
      let params=new HttpParams();
      params.set('page',page)
      return this.http.get("http://localhost:5244/api/user",{params,headers});
    }
      else
    return this.http.get("http://localhost:5244/api/user",{headers});
  }
}
