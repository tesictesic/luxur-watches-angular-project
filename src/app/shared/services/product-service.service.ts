import { HttpClient,HttpHeaders, HttpParams } from '@angular/common/http';
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
  getProductsWithParams(paramsObj:any):Observable<any>{
     let params=new HttpParams();
     if(paramsObj.page){
      params=params.set('page',paramsObj.page);
     }
     if(paramsObj.Name){
      params=params.set('Name',paramsObj.Name)
     }
     if(paramsObj.Brand_Id){
      params=params.set('Brand_Id',paramsObj.Brand_Id)
     }
     if(paramsObj.Gender_Id){
      params=params.set('Gender_Id',paramsObj.Gender_Id)
     }
     if(paramsObj.PriceFrom){
      params=params.set('PriceFrom',paramsObj.PriceFrom)
     }
     if(paramsObj.PriceTo){
      params=params.set('PriceTo',paramsObj.PriceTo)
     }
     if(paramsObj.OrderBy){
      params=params.set('OrderBy',paramsObj.OrderBy)
     }
     


     return this.http.get(this.products_path,{params});

  }

}
