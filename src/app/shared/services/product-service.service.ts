import { HttpClient,HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {
 products_path:string="http://localhost:5244/api/product";
 single_path:string="http://localhost:5244/api/product/";
 $product_obj_insert=new BehaviorSubject<any>('');
 $product_obj_update=new BehaviorSubject<any>('');
 
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
  insertProduct(obj:any,token:string):Observable<any>{
    const data_send=new FormData();
    data_send.append('ProductName',obj.ProductName)
    data_send.append('ProductPrice',obj.ProductPrice)
    data_send.append("ProductDescription",obj.ProductDescription);
    data_send.append("BrandId",obj.BrandId);
    data_send.append("GenderId",obj.GenderId);
    data_send.append("Image",obj.Image);
    if(obj.Product_Colors!='[]'){
      data_send.append("Product_Colors",obj.Product_Colors);
    }
    data_send.forEach((value, key) => {
      console.log(`${key}: ${value}`);
    });
    const headers=new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    })
    return this.http.post(this.products_path,data_send,{headers});
  }
  updateProduct(obj:any,token:string){
    const data_send=new FormData();
    data_send.append("Id",obj.Id)
    data_send.append('ProductName',obj.ProductName)
    data_send.append('ProductPrice',obj.ProductPrice)
    data_send.append("ProductDescription",obj.ProductDescription);
    data_send.append("BrandId",obj.BrandId);
    data_send.append("GenderId",obj.GenderId);
    data_send.append("Image",obj.Image);
    const headers=new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    })
    return this.http.put(this.single_path,data_send,{headers});
  }
  deleteProduct(id:number,token:string){
  
    const headers=new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    })
    return this.http.delete(this.single_path+id,{headers})  
  }

}
