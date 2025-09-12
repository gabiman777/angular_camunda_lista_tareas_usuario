import { Routes } from '@angular/router';
import { TaskListComponent } from './task-list/task-list';
import { FormParamExtraccionCandidatosComponent } from './parametrizacion-extraccion-candidatos/parametrizacion-extraccion-candidatos';

export const routes: Routes = [
    { path: '', component: TaskListComponent, pathMatch: 'full' },
    { path: 'parametrizacion-extraccion', component: FormParamExtraccionCandidatosComponent }
];
