import { Routes } from '@angular/router';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { LoginComponent } from './components/auth/login/login.component';

export const routes: Routes = [

  {
    path: '',
    loadChildren: () => import('./components/home/home.routes')
      .then((res) => res.HOME_ROUTES)
  },
  {
    path: 'plants',
    loadChildren: () => import('./components/plants/plants.routes')
      .then((res) => res.PLANTS_ROUTES)
  },

  { path: 'login', component: LoginComponent },
  { path: '**', component: PageNotFoundComponent }
    

];
