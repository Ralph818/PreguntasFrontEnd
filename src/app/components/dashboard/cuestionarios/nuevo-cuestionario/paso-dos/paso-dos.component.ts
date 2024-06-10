import { Component } from '@angular/core';
import { CuestionarioService } from '../../../../../services/cuestionario.service';
import { Pregunta } from '../../../../../models/pregunta';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NuevaPreguntaComponent } from './nueva-pregunta/nueva-pregunta.component';
import { Cuestionario } from '../../../../../models/cuestionario';
import { LoadingComponent } from '../../../../../shared/loading/loading.component';


@Component({
  selector: 'app-paso-dos',
  standalone: true,
  imports: [CommonModule,
            NuevaPreguntaComponent,
            LoadingComponent
  ],
  templateUrl: './paso-dos.component.html',
  styleUrl: './paso-dos.component.css'
})
export class PasoDosComponent {
  tituloCuestionario: string;
  descripcionCuestionario: string;
  listPreguntas: Pregunta[];
  loading = false;

  constructor(private cuestionarioService: CuestionarioService, private toastr: ToastrService, private router: Router){
    this.tituloCuestionario = cuestionarioService.tituloCuestionario;
    this.descripcionCuestionario = cuestionarioService.descipcionCuestionario;
    this.listPreguntas = [];
  }

  guardarPregunta(pregunta: Pregunta): void {
    this.listPreguntas.push(pregunta);
    console.log(this.listPreguntas);
  }

  eliminarPregunta(index: number): void {
    this.listPreguntas.splice(index, 1);
  }

  guardarCuestionario(): void {
    // const cuestionario: Cuestionario = new Cuestionario(this.tituloCuestionario,this.descripcionCuestionario,null,this.listPreguntas);
    const cuestionario: Cuestionario = {
      nombre: this.tituloCuestionario,
      descripcion: this.descripcionCuestionario,
      listPreguntas: this.listPreguntas
    };
    this.loading = true;
    // Enviamos cuestionario al back
    this.cuestionarioService.guardarCuestionario(cuestionario).subscribe(data => {
      this.toastr.success("El cuestionario fue registrado con éxito","Cuestionario Registrado");
      this.router.navigate(['/dashboard']);
      this.loading = false;
    }, error => {
      console.log(error);
      this.toastr.error('Oops... Ocurrió un error!','Error');
      this.router.navigate(['/dashboard']);
      this.loading = false;
    })

  }

}
