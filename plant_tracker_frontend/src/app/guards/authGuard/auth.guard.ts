import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  const authHeader = localStorage.getItem('authHeader');  
  if (authHeader && authHeader.startsWith('Basic ')) {
    
    return true;  
  }

  router.navigate(['/login']);

  return false;
};
