import { Component } from '@angular/core';
import { Form, FormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CuestionarioService } from '../../../../../services/cuestionario.service';
import { Router, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from '../../../../../shared/loading/loading.component';


@Component({
  selector: 'app-paso-uno',
  standalone: true,
  imports: [RouterModule,
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    LoadingComponent],
  templateUrl: './paso-uno.component.html',
  styleUrl: './paso-uno.component.css'
})
export class PasoUnoComponent {
  datosCuestionario: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private cuestionarioService: CuestionarioService){
    this.datosCuestionario = this.fb.group({
      titulo: ['', Validators.required],
      descripcion: ['', Validators.required]
    });
  }

  pasoUno(): void{
    this.cuestionarioService.tituloCuestionario = this.datosCuestionario.value.titulo;
    this.cuestionarioService.descipcionCuestionario = this.datosCuestionario.value.descripcion;
    this.router.navigate(['/dashboard/nuevoCuestionario/pasoDos']);
  }
}
