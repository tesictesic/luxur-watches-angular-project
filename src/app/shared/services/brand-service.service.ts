import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BrandServiceService {
 token:string='';
  constructor(private http:HttpClient) { }

  getBrands(page:number|null=null):Observable<any>{
    if(page!=null){
      let params=new HttpParams();
      params=params.set('page',page);
      return this.http.get('http://localhost:5244/api/brand',{params});
    }
    else
   return this.http.get('http://localhost:5244/api/brand');
  }
  postBrand(obj:any):Observable<any>{
    return this.http.post("http://localhost:5244/api/brand",obj);
  }
  deleteBrand(id:number,token:string):Observable<any>{
    this.token=token;
    const headers=new HttpHeaders({
      'Authorization': `Bearer ${this.token}`,
      'Content-Type': 'application/json'
    })
    return this.http.delete("http://localhost:5244/api/brand/"+id,{headers})
  }
putBrand(obj:any,token:string){
  this.token=token
  const headers=new HttpHeaders({
    'Authorization': `Bearer ${this.token}`,
    'Content-Type': 'application/json'
  })
  return this.http.put("http://localhost:5244/api/brand/",obj,{headers})
  }
}
