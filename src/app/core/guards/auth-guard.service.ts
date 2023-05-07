import { Injectable, inject } from '@angular/core';
import {
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanActivateChildFn,
  CanActivateFn,
} from '@angular/router';
import { AuthService } from '../services/auth.service';
import { map, catchError, of } from 'rxjs';

@Injectable()
export class AuthGuardService {
  canActivate: CanActivateFn = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) => {
    const authService = inject(AuthService);
    const router = inject(Router);

    return authService.user$.pipe(
      map((user) => {
        if (!user) {
          router.navigate(['/login']);
          return false;
        } else {
          return true;
        }
      })
    );
  };

  canActivateChild: CanActivateChildFn = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) => this.canActivate(route, state);
}
