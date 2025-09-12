import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Observable, of, Subject } from 'rxjs';
import { Router } from '@angular/router';
import { catchError, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { TasklistService } from '../services/tasklist';

@Component({
  selector: 'app-task-list',
  imports: [CommonModule, FormsModule],
  templateUrl: './task-list.html',
  styleUrl: './task-list.css'
})
export class TaskListComponent implements OnInit, OnDestroy {
  tasks: Observable<any> | undefined;
  error: string | null = null;
  filters = {
    state: 'CREATED',
    assignee: ''
  };

  private assigneeSubject = new Subject<string>();

  constructor(private tasklistService: TasklistService, private router: Router) {}

  ngOnInit() {
    console.log('TaskListComponent initialized');
    // Suscribirse al Subject para manejar cambios en assignee con debounce
    this.assigneeSubject.pipe(
      debounceTime(300), // Espera 300ms después de que el usuario deje de escribir
      distinctUntilChanged() // Solo emite si el valor cambió realmente
    ).subscribe(() => {
      this.applyFilters();
    });
  }

  ngOnDestroy() {
    console.log('TaskListComponent destroyed');
    // Limpiar la suscripción para evitar memory leaks
    this.assigneeSubject.complete();
  }

  // Método llamado desde el HTML cuando cambia el ngModel del input
  onAssigneeChange(value: string) {
    this.filters.assignee = value;
    this.assigneeSubject.next(value);
  }

  applyFilters() {
    // Solo buscar si hay un valor en assignee
    if (!this.filters.assignee.trim()) {
      this.tasks = of([]); // Tabla vacía si no hay email
      this.error = null;
      return;
    }

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
      this.router.navigate(['parametrizacion-extraccion'], /*{
        state: { taskId: task.id, variables: task.variables },
      }*/
     );
    }
    /*TODO. borrar bloque. version1, no se necesita hacer el claim
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