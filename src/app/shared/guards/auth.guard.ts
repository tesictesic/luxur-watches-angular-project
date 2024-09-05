import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChildFn, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';
@Injectable({
  providedIn: 'root'  // Ovo osigurava da Angular može da injectuje ovu klasu gde je potrebna
})
export class AdminGuard {
  
  constructor(
    private auth:AuthService,
    private router:Router
  ){}
  canActivateChild(next: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    const isLogged=this.auth.isLoggedIn();
    var isAdmin=false;
    if(isLogged){
      isAdmin=this.auth.isLoggedUserAdmin();
      console.log(isAdmin);
    }
    else this.router.navigateByUrl("/home");
    return isAdmin;
  }
}
