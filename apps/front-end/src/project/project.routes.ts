import { Route } from '@angular/router';
import { ProjectViewPage } from './pages/project-view/project-view.page';

export const routes: Route[] = [
  { path: 'view/:location', component: ProjectViewPage }
];
