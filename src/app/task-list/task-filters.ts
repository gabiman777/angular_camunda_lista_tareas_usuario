import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-task-filters',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task-filters.html',
  styleUrls: ['./task-filters.css']
})
export class TaskFiltersComponent implements OnInit, OnDestroy {
  filters = {
    state: 'CREATED',
    assignee: ''
  };

  @Output() filtersChange = new EventEmitter<{ state: string; assignee: string }>();

  private assigneeSubject = new Subject<string>();

  ngOnInit() {
    this.assigneeSubject.pipe(
      debounceTime(300), // Espera 300ms después de que el usuario deje de escribir
      distinctUntilChanged() // Solo emite si el valor cambió realmente
    ).subscribe(() => {
      this.emitFilters();
    });
  }

  ngOnDestroy() {
    this.assigneeSubject.complete(); // Limpiar suscripción
  }

  onAssigneeChange(value: string) {
    this.filters.assignee = value;
    this.assigneeSubject.next(value);
  }

  onStateChange() {
    this.emitFilters();
  }

  private emitFilters() {
    this.filtersChange.emit({ ...this.filters });
  }
}