import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home.component'),
  },
  {
    path: ':id',
    loadComponent: () => import('./pages/home/home.component'),
  },
  {
    path: 'test',
    loadComponent: () => import('./pages/test/test.component'),
  },
];
