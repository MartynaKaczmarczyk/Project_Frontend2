import { Routes } from '@angular/router';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
// import { InfoComponent } from './components/info/info.component';

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
//   {
//     path: 'info',
//     component: InfoComponent,
//   },

  { path: '**', component: PageNotFoundComponent }
    

];
