import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RespuestaCuestionarioComponent } from './respuesta-cuestionario.component';

describe('RespuestaCuestionarioComponent', () => {
  let component: RespuestaCuestionarioComponent;
  let fixture: ComponentFixture<RespuestaCuestionarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RespuestaCuestionarioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RespuestaCuestionarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
