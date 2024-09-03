import { HttpClient, HttpParams } from '@angular/common/http';
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
}
