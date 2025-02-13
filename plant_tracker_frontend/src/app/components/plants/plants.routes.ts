import { Routes } from '@angular/router';
import { PlantListComponent } from './plant-list/plant-list.component';
import { DetailedPlantComponent } from './detailed-plant/detailed-plant.component';
import { PlantFormComponent } from './plant-form/plant-form.component';
import { unsavedChangesGuard } from '../../guards/unsavedChangesGuard/unsaved-changes.guard';
import { authGuard } from '../../guards/authGuard/auth.guard';

export const PLANTS_ROUTES: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'list',

  },
  {
    path: 'list',
    component: PlantListComponent,
    title: 'Plants List',
    canActivate: [authGuard]
  },
  {
    path: ':id/details',
    component: DetailedPlantComponent,
    title: 'Plant Details',
    canActivate: [authGuard]
  },
  {
    path: 'form',
    component: PlantFormComponent,
    title: 'Plant Add Form',
    canDeactivate: [unsavedChangesGuard],
    canActivate: [authGuard]
  },
  {
    path: ':id/form',
    component: PlantFormComponent,
    title: 'Book Edit Form',
    canDeactivate: [unsavedChangesGuard],
    canActivate: [authGuard]
  },
];
