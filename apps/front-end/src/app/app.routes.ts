import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  { path: '', redirectTo: '/welcome', pathMatch: 'full' },
  { path: 'welcome', loadChildren: () => import('../welcome/welcome.routes').then(m => m.routes) }
];
