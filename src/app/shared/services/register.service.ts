import { Injectable } from '@angular/core';
import { Register } from '../interfaces/register';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
   formData:FormData=new FormData();
   

  constructor(
    private http:HttpClient
  ) { }
  getData(data:any,file:File|null=null){
    
    this.formData.append("First_Name",data.first_name)
    this.formData.append("Last_Name",data.last_name)
    this.formData.append("Email",data.email)
    this.formData.append("Password",data.password)
    if(file!=null){
      this.formData.append("Image",file)
    }
    this.formData.forEach((value, key) => {
      console.log(`${key}: ${value}`);
    });
  }
  sendData():Observable<any>{
    return this.http.post("http://localhost:5244/api/user",this.formData)
  }
 
}
