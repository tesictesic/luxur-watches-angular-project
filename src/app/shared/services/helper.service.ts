import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HelperService {
  $isDisabled=new BehaviorSubject<boolean>(true);
  $isDisabledDeleteModal=new BehaviorSubject<boolean>(true);
  $delete_confirmation=new BehaviorSubject<boolean>(false);
  $delete_error=new BehaviorSubject<string>('');
  $errors=new BehaviorSubject<any>([]);
  $obj_update=new BehaviorSubject<any>({});
  token:string='';
  constructor(
    private http:HttpClient
  ) { }
  fillInPagination(totalPages:number):number[]{
    let total_pages_arr:number[]=[];
    for(let i=0;i<totalPages;i++){
      total_pages_arr.push(i);
    }
    return total_pages_arr;
   }
   getColors(page:number|null=null):Observable<any>{
    if(page!=null){
      let params=new HttpParams();
      params=params.set('page',page);
      return this.http.get('http://localhost:5244/api/color',{params});
    }
    else
    return this.http.get('http://localhost:5244/api/color');
   }
   postColor(obj:any,token:string):Observable<any>{
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    return this.http.post('http://localhost:5244/api/color',obj,{headers});
   }
   deleteColor(id:number,token:string){
    this.token=token;
    const headers=new HttpHeaders({
      'Authorization': `Bearer ${this.token}`,
      'Content-Type': 'application/json'
    })
    return this.http.delete("http://localhost:5244/api/color/"+id,{headers})
   }
   putColor(obj:any,token:string){
    this.token=token
    const headers=new HttpHeaders({
      'Authorization': `Bearer ${this.token}`,
      'Content-Type': 'application/json'
    })
    return this.http.put("http://localhost:5244/api/color/",obj,{headers})
    }
    getContacts(token:string,page:number|null=null):Observable<any>{
      let params=new HttpParams();
      const headers=new HttpHeaders({
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      })
      if(page!=null){
        
        params=params.set('page',page);
      }
      return this.http.get("http://localhost:5244/api/contact",{params,headers})
    }
   
}
