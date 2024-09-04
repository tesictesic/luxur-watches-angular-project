import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminLookupTablesService {

  
  $table_name=new BehaviorSubject<string>('');
  $form_obj_insert=new BehaviorSubject<any>('');
  $form_obj_update=new BehaviorSubject<any>('');
 
  constructor(
    private http:HttpClient
  ) { }

  sendData(url:string,data:any):Observable<any>{
    return this.http.post(url,data);
  }
  getData(url:string):Observable<any>{
    return this.http.get(url);
  }
}
