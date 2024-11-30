import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { isEpiredToken } from '../helpers/isJwtExpired';

export const loginGuard: CanActivateFn = (route, state) => {
  const router = inject(Router)
  const token = localStorage.getItem('user')

  if (!token||isEpiredToken(token!)) {
    localStorage.removeItem('user')
    return true
  }

  router.navigate(['/feed'])
  return false;
};
