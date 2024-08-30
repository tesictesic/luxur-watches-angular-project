import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BrandServiceService {

  constructor(private http:HttpClient) { }

  getBrands():Observable<any>{
   return this.http.get('http://localhost:5244/api/brand');
  }
}
