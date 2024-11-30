import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { isEpiredToken } from '../helpers/isJwtExpired';
import Swal from 'sweetalert2';

export const authGuardGuard: CanActivateFn = (route, state) => {
  const router = inject(Router)
  const token = localStorage.getItem('user')

  if (!token || isEpiredToken(token!)) {
    localStorage.removeItem('user')
    Swal.fire({
      icon: 'warning',
      title: 'Please login',
      toast: true,
      timer: 1500,
      position: 'top',
      showConfirmButton:false
    })
    router.navigate(['/'])
    return false
  }

  return true;
};
