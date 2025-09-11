import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskListComponent } from './task-list/task-list';
import { FormParamExtraccionCandidatosComponent } from './parametrizacion-extraccion-candidatos/parametrizacion-extraccion-candidatos';

//AQUI VOY en el chat de grok, es el ultimo paso antes de probar
const routes: Routes = [
  { path: '', redirectTo: 'task-list', pathMatch: 'full' },
  { path: 'task-list', component: TaskListComponent },
  { path: 'parametrizacion-extraccion-candidatos', component: FormParamExtraccionCandidatosComponent },
  // Agrega rutas para otros formularios basados en el campo formKey de las tareas de usuario
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}