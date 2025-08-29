import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormAnalizarEventoYContactarCorredor } from './form-analizar-evento-y-contactar-corredor';

describe('FormAnalizarEventoYContactarCorredor', () => {
  let component: FormAnalizarEventoYContactarCorredor;
  let fixture: ComponentFixture<FormAnalizarEventoYContactarCorredor>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormAnalizarEventoYContactarCorredor]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormAnalizarEventoYContactarCorredor);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
