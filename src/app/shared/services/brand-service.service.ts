import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BrandServiceService {

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
}
