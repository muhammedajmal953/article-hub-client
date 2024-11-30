import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { isEpiredToken } from '../helpers/isJwtExpired';

export const tokenInterceptorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router)

  const token = localStorage.getItem('user')

  if (isEpiredToken(token!)) {
    localStorage.removeItem('user')
    next(req)
  }

  if (req.url.includes('api.cloudinary')) {
    return next(req); // Let Cloudinary requests pass as is
  }


  let modifiedReq = req.clone({
    headers: req.headers.set('Authorization', 'Bearer ' + token),
  });



  return next(modifiedReq);
};
