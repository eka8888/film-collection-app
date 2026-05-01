import { Routes } from '@angular/router';
import { Home } from './features/films/pages/home/home';
import { Detail } from './features/films/pages/detail/detail';
import { NotFound } from './shared/components/not-found/not-found';
import { About } from './features/films/pages/about/about';

export const routes: Routes = [
    {path:'', component:Home},
    {path:'film/:id',component:Detail},
    {path:'about',component:About},
    {path:'**',component:NotFound}
];
