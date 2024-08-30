import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {
 products_path:string="http://localhost:5244/api/product";
 single_path:string="http://localhost:5244/api/product/";
 
 
  constructor(
    private http:HttpClient
  ) { }

  getProducts():Observable<any>{
      return this.http.get(this.products_path);
  }
  getSingleProduct(id:number):Observable<any>{
     return this.http.get(this.single_path+id);
  }
}
