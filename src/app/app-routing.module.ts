import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskListComponent } from './task-list/task-list';
import { FormAnalizarEventoComponent } from './form-analizar-evento-y-contactar-corredor/form-analizar-evento-y-contactar-corredor';

//AQUI VOY en el chat de grok, es el ultimo paso antes de probar
const routes: Routes = [
  { path: '', redirectTo: 'task-list', pathMatch: 'full' },
  { path: 'task-list', component: TaskListComponent },
  { path: 'form-analizar-evento-y-contactar-corredor', component: FormAnalizarEventoComponent },
  // Agrega rutas para otros formularios basados en formKeys
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}