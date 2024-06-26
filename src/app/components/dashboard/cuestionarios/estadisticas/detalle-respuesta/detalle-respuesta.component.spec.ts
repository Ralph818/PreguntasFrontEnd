import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleRespuestaComponent } from './detalle-respuesta.component';

describe('DetalleRespuestaComponent', () => {
  let component: DetalleRespuestaComponent;
  let fixture: ComponentFixture<DetalleRespuestaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetalleRespuestaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetalleRespuestaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
