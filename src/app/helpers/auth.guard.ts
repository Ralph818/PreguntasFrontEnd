import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../services/login.service';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})

export class authGuard implements CanActivate {
  
  constructor(private router: Router, private loginService: LoginService){}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
  
    if(this.loginService.getToken() == null ){
    console.log('ruta protegida');
    this.router.navigate(['/inicio/login'])
    return false;
  }
  else 
    return true;
}
}
