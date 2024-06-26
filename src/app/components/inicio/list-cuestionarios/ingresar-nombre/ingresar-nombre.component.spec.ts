import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IngresarNombreComponent } from './ingresar-nombre.component';

describe('IngresarNombreComponent', () => {
  let component: IngresarNombreComponent;
  let fixture: ComponentFixture<IngresarNombreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IngresarNombreComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IngresarNombreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
