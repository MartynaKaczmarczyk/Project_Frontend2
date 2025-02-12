import { Routes } from '@angular/router';
import { PlantListComponent } from './plant-list/plant-list.component';
import { DetailedPlantComponent } from './detailed-plant/detailed-plant.component';
import { PlantFormComponent } from './plant-form/plant-form.component';

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
  },
  {
    path: ':id/details',
    component: DetailedPlantComponent,
    title: 'Plant Details',
  },
  {
    path: 'form',
    component: PlantFormComponent,
    title: 'Plant Add Form',
  },
  {
    path: ':id/form',
    component: PlantFormComponent,
    title: 'Book Edit Form',
  },
];
