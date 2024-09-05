import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  $obj_insert_form=new BehaviorSubject<any>('');
  $obj_update_form=new BehaviorSubject<any>('');
  
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
  deleteUser(id:number,token:string){
    
    const headers=new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    })
    return this.http.delete("http://localhost:5244/api/user/"+id,{headers})
  }
  putBrand(obj:any,token:string){
    const formData=new FormData();
    formData.append("Id",obj.id);
    formData.append("First_Name",obj.first_name);
    formData.append("Last_name",obj.last_name);
    formData.append("Email",obj.email);
    formData.append("Image",obj.Image)
    const headers=new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    })
    return this.http.put("http://localhost:5244/api/user",formData,{headers})
    }
}
