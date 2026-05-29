import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/weather/weather/weather.component').then(m => m.WeatherComponent)
  },
  {
    path: '**',
    redirectTo: ''
  }
];
