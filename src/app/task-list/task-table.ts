import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { TasklistService } from '../services/tasklist';

@Component({
  selector: 'app-task-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-table.html',
  styleUrls: ['./task-table.css']
})
export class TaskTableComponent implements OnChanges {
  @Input() filters: { state: string; assignee: string } = { state: 'CREATED', assignee: '' };
  tasks: Observable<any> | undefined;
  error: string | null = null;

  constructor(private tasklistService: TasklistService, private router: Router) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['filters']) {
      this.applyFilters();
    }
  }

  applyFilters() {
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
        this.error = 'Error cargando tareas de usuario: ' + error.message;
        return of([]);
      })
    );
  }

  selectTask(task: any) {
    if (task.formKey === 'parametrizacion-extraccion-candidatos') {
      this.router.navigate(['parametrizacion-extraccion'], {
        state: { taskId: task.id, variables: task.variables },
      });
    } else {
      console.log('Formulario no implementado para formKey:', task.formKey);
    }
    //TODO. aqui manejar otros formKeys, el formKey se asigna en las tareas de usuario de Camunda
  }
}