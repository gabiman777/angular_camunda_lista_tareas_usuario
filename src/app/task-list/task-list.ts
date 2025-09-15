import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskFiltersComponent } from './task-filters';
import { TaskTableComponent } from './task-table';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, TaskFiltersComponent, TaskTableComponent],
  templateUrl: './task-list.html',
  styleUrls: ['./task-list.css']
})
export class TaskListComponent {
  filters = { state: 'CREATED', assignee: '' };

  onFiltersChange(filters: { state: string; assignee: string }) {
    this.filters = filters;
  }
}