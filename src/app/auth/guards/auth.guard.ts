import { inject } from "@angular/core"
import { AuthService } from '../services/auth.service';
import { Observable, tap } from "rxjs";
import { ActivatedRouteSnapshot, Route, Router, RouterStateSnapshot, UrlSegment } from "@angular/router";


const checkAuthStatus = () => {
  const authService = inject(AuthService);
  const router = inject(Router);
  return authService.checkAuthentication()
    .pipe(
      tap(isAuthenticated => console.log('Authenticated:', isAuthenticated)),
      tap(isAuthenticated => {
        if (!isAuthenticated) {
          router.navigate(['./auth/login'])
        }
      }),
    )
}

export const canMatch = (route: Route, segments: UrlSegment[]) => {
  return checkAuthStatus();
}

export const canActivate = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> => {
  return checkAuthStatus();
}