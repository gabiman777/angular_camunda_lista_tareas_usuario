import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CamundaService } from '../services/camunda.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-form-analizar-evento-y-contactar-corredor',
  imports: [ReactiveFormsModule],
  templateUrl: './form-analizar-evento-y-contactar-corredor.html',
  styleUrl: './form-analizar-evento-y-contactar-corredor.css'
})
export class FormAnalizarEventoComponent implements OnInit {
  form!: FormGroup;
  taskId: string;
  variables: any; // Variables de la tarea (e.g., datos pre-cargados)

  constructor(
    private fb: FormBuilder,
    private camundaService: CamundaService,
    private router: Router,
    private location: Location
  ) {
    const navigation = this.router.getCurrentNavigation();
    this.taskId = navigation?.extras?.state?.['taskId'];
    this.variables = navigation?.extras?.state?.['variables'] || {};
  }

  ngOnInit() {
    this.form = this.fb.group({
      analisisEvento: ['', Validators.required], // Campo ejemplo: Análisis del evento
      contactoCorredor: ['', Validators.required], // Campo ejemplo: Detalles de contacto
      // Agrega más campos según tu modelo BPMN
    });

    // Pre-carga variables si existen
    this.form.patchValue({
      analisisEvento: this.variables.find((v: { name: string; }) => v.name === 'analisisEvento')?.value || '',
      contactoCorredor: this.variables.find((v: { name: string; }) => v.name === 'contactoCorredor')?.value || ''
    });
  }

  onSubmit() {
    if (this.form.valid) {
      const variables = [
        { name: 'analisisEvento', value: this.form.value.analisisEvento },
        { name: 'contactoCorredor', value: this.form.value.contactoCorredor }
        // Agrega más variables según sea necesario
      ];

      this.camundaService.completeTask(this.taskId, variables).subscribe(
        () => {
          alert('Tarea completada exitosamente');
          this.router.navigate(['/task-list']); // Redirige de vuelta a la lista
        },
        error => console.error('Error al completar tarea:', error)
      );
    }
  }

  cancel() {
    this.location.back(); // O redirige a task-list
  }
}
