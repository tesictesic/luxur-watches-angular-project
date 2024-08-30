import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GenderServiceService {

  constructor(private http:HttpClient) { }
  getGender():Observable<any>{
    return this.http.get('http://localhost:5244/api/gender');
  }
}
