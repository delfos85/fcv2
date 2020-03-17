import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  constructor( private auth: AuthService, private router: Router){}

  canActivate(): boolean{
    if ( this.auth.estaAutenticado() ) {
      return true;
    } else {
      this.router.navigateByUrl('/login');
      return false;
    }
  }

}
