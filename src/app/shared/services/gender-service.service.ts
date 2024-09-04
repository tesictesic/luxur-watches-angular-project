import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GenderServiceService {

  constructor(private http:HttpClient) { }
  getGender(page:number|null=null):Observable<any>{
    
    if(page!=null){
      let params=new HttpParams();
      params=params.set('page',page);
      return this.http.get('http://localhost:5244/api/gender',{params});
    }
    else{
      return this.http.get('http://localhost:5244/api/gender');
    }
    
  }
  postGender(obj:any,token:string):Observable<any>{
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    return this.http.post('http://localhost:5244/api/gender',obj,{headers});
   }
   deleteGender(id:number,token:string){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    return this.http.delete("http://localhost:5244/api/gender/"+id,{headers})
   }
   putGender(obj:any,token:string){
    const headers=new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    })
    return this.http.put("http://localhost:5244/api/gender/",obj,{headers})
    }
}
