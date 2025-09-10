/*
import { Component, OnInit } from '@angular/core';
import { CamundaService } from '../services/camunda.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-list',
  imports: [ CommonModule ],
  templateUrl: './task-list.html',
  styleUrl: './task-list.css'
})
export class TaskListComponent implements OnInit {
  tasks: any[] = [];

  constructor(private camundaService: CamundaService, private router: Router) {}

  ngOnInit() {
    this.camundaService.getTasks().subscribe(tasks => {
      this.tasks = tasks;
    });
  }

  selectTask(task: any) {
    // Lógica de asociación: Basado en formKey, redirige al formulario correspondiente
    if (task.formKey === 'postemision_analizar_evento_y_contactar_corredor') {
      // Claim la tarea opcionalmente
      this.camundaService.claimTask(task.id).subscribe();
      
      //TODO. crear el formulario analizar evento y contactar al corredor
      // Redirige a la ruta del formulario, pasando taskId y variables
      this.router.navigate(['/form-analizar-evento-y-contactar-corredor'], { state: { taskId: task.id, variables: task.variables } });

    } else {
      // Maneja otros formKeys aquí (e.g., switch o mapa de formKeys a rutas)
      console.log('Formulario no implementado para formKey:', task.formKey);
    }
  }
}
*/

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { TasklistService } from '../services/tasklist';

@Component({
  selector: 'app-task-list',
  imports: [CommonModule],
  template: `
    <p>Componente Task-list funciona</p>
    <h2>Bandeja de Tareas</h2>
    <div *ngIf="error" style="color: red;">{{ error }}</div>
    <ul>
      <li *ngFor="let task of tasks | async">
        {{ task.name }} (ID: {{ task.id }})
        <button (click)="selectTask(task)">Seleccionar</button>
      </li>
    </ul>
    <!--
    <div *ngIf="tasks | async as taskList">
      <div *ngFor="let task of taskList">{{ task.name }}</div>
    </div>
    -->
  `,
})
export class TaskListComponent implements OnInit {
  tasks: Observable<any> | undefined;
  error: string | null = null;

  constructor(private tasklistService: TasklistService, private router: Router) {}

  ngOnInit() {
    this.tasks = this.tasklistService.searchTasks({ state: 'CREATED' }).pipe(
      catchError((error) => {
        this.error = 'Error loading tasks: ' + error.message;
        return of([]);
      })
    );
  }

  selectTask(task: any) {
    //if (task.formKey === 'postemision_analizar_evento_y_contactar_corredor') {
    if (task.formId === 'enter-message-email') {
      this.tasklistService
        .claimTask(task.id)
        .subscribe({
          next: () => {
            this.router.navigate(['/form-analizar-evento-y-contactar-corredor'], {
              state: { taskId: task.id, variables: task.variables },
            });
          },
          error: (err) => {
            this.error = 'Error claiming task: ' + err.message;
          },
        });
    }
    //TODO. agregar todos los IFs para cada tipo de formulario, para todas las tareas de usuarios que haya en el proceso
    /*
    else if (task.formId === 'postemision_validar_documentacion') {
      this.tasklistService
        .claimTask(task.id)
        .subscribe({
          next: () => {
            this.router.navigate(['/form-validar-documentacion'], {
              state: { taskId: task.id, variables: task.variables },
            });
          },
          error: (err) => {
            this.error = 'Error claiming task: ' + err.message;
          },
        });
    } else if (task.formId === 'postemision_revision_final') {
      this.tasklistService
        .claimTask(task.id)
        .subscribe({
          next: () => {
            this.router.navigate(['/form-revision-final'], {
              state: { taskId: task.id, variables: task.variables },
            });
          },
          error: (err) => {
            this.error = 'Error claiming task: ' + err.message;
          },
        });
    }
    */
    else {
      console.log('Formulario no implementado para formKey:', task.formKey);
    }
  }

}