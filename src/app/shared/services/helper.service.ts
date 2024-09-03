import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

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
}
