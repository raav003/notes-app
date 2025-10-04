import { Routes } from '@angular/router';
import { Notes } from './notes/notes';

export const routes: Routes = [
    {path:'',component:Notes},
    {path:'**',redirectTo:''}
];
