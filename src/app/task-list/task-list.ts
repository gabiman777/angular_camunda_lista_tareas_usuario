import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { TasklistService } from '../services/tasklist';

@Component({
  selector: 'app-task-list',
  imports: [CommonModule, FormsModule],
  templateUrl: './task-list.html',
  styleUrl: './task-list.css'
})
export class TaskListComponent implements OnInit {
  tasks: Observable<any> | undefined;
  error: string | null = null;
  filters = {
    state: 'CREATED',
    assignee: ''
  };

  constructor(private tasklistService: TasklistService, private router: Router) {}

  ngOnInit() {
    this.applyFilters();
  }

  applyFilters() {
    const filterParams: any = {};
    if (this.filters.state) {
      filterParams.state = this.filters.state;
    }
    if (this.filters.assignee) {
      filterParams.assignee = this.filters.assignee;
    }

    this.tasks = this.tasklistService.searchTasks(filterParams).pipe(
      catchError((error) => {
        this.error = 'Error loading tasks: ' + error.message;
        return of([]);
      })
    );
  }

  
  selectTask(task: any) {
    if (task.formKey === 'parametrizacion-extraccion-candidatos') {
      this.router.navigate(['/parametrizacion-extraccion-candidatos'], {
        state: { taskId: task.id, variables: task.variables },
      });
    }
  
  /*version1, no se necesita hacer el claim
  selectTask(task: any) {
    if (task.formKey === 'parametrizacion-extraccion-candidatos') {
      this.tasklistService
        .claimTask(task.id)
        .subscribe({
          next: () => {
            this.router.navigate(['/parametrizacion-extraccion-candidatos'], {
              state: { taskId: task.id, variables: task.variables },
            });
          },
          error: (err) => {
            this.error = 'Error claiming task: ' + err.message;
          },
        });
    }
    
    //TODO. agregar todos los ELSE IF para cada tipo de formulario, segun el formKey, para todas las tareas de usuarios que hay en el proceso
    /*
    else if (task.formKey === 'postemision_validar_documentacion') {
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