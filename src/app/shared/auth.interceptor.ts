import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";
import { AuthService } from "./services/auth.service";
import { Injectable } from "@angular/core";

@Injectable() // zbog depedency injection
export class AuthInterceptor implements HttpInterceptor{

  constructor(
    private authService:AuthService
  ){

  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log(req.url);
    if((req.url.includes('product')||req.url.includes('gender')||req.url.includes('brand')||req.url.includes('Jwt')||req.url.includes('user')||req.url.includes('contact'))) return next.handle(req);
    else{
      const modificatedRequest=this.modifyRequest(req);
      return next.handle(modificatedRequest);
    } 
      
  }
  modifyRequest(req: HttpRequest<any>):HttpRequest<any>{
   return req.clone({
      setHeaders:({
        Authorization:"Bearer "+ this.authService.getJwtToken()
      })
    })
  }
}
