import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { RespuestaCuestionarioService } from '../../../../services/respuesta-cuestionario.service';
import { ToastrService } from 'ngx-toastr';
import { Cuestionario } from '../../../../models/cuestionario';
import { CuestionarioService } from '../../../../services/cuestionario.service';
import { LoadingComponent } from '../../../../shared/loading/loading.component';
import { Pregunta } from '../../../../models/pregunta';
import { CommonModule } from '@angular/common';
import { RespuestaCuestionarioDetalle } from '../../../../models/respuestaCuestionarioDetalle';
import { RespuestaCuestionario } from '../../../../models/respuestaCuestionario';

@Component({
  selector: 'app-pregunta',
  standalone: true,
  imports: [RouterModule,
            LoadingComponent,
            CommonModule
  ],
  templateUrl: './pregunta.component.html',
  styleUrl: './pregunta.component.css'
})
export class PreguntaComponent {
  idCuestionario: number;
  cuestionario: any;
  loading= false;
  nombreParticipante = '';
  listPreguntas: Pregunta[] = [];
  rtaConfirmada = false;
  opcionSeleccionada: any;
  index = 0;
  idRespuestaSeleccionada: number;
  fechaDummy = new Date();

  listRespuestaDetalle: RespuestaCuestionarioDetalle[] = [];
  

  constructor (private cuestionarioService: CuestionarioService, private router: Router, private respuestaCuestionario: RespuestaCuestionarioService, private toastr: ToastrService){
    this.nombreParticipante = respuestaCuestionario.nombreParticipante;

  }

  ngOnInit(): void{
    this.idCuestionario = this.respuestaCuestionario.idCuestionario;
    if (this.idCuestionario == null) {
      this.router.navigate(['/inicio']);
      return;
    }
    this.getCuestionario();
    this.respuestaCuestionario.respuestas = [];
  }

  getCuestionario(): void {
    this.loading = true;
    this.cuestionarioService.getCuestionario(this.idCuestionario).subscribe(data=> {
      console.log(data);
      this.cuestionario = data;
      this.listPreguntas = this.cuestionario.listPreguntas;
      this.loading = false;
      this.respuestaCuestionario.cuestionario = data;
    }, error =>{
      this.toastr.error('Oops... Hubo un error','error');
      this.loading = false;
    })
  }

  obtenerPregunta(): string {
    return this.listPreguntas[this.index].descripcion;
  }

  getIndex(): number {
    return this.index;
  }

  respuestaSeleccionada(respuesta: any, idRespuestaSeleccionada: number){
    this.opcionSeleccionada = respuesta;
    this.rtaConfirmada = true;
    this.idRespuestaSeleccionada = idRespuestaSeleccionada;
  }

  AddClassOption(respuesta: any): string {
    if(respuesta === this.opcionSeleccionada){
      return 'active test-light';
    }else
    return '';
  }

  siguiente(): void{
    this.respuestaCuestionario.respuestas.push(this.idRespuestaSeleccionada);

    // Creaos un objeto RespuestaDetalle
    const detalleRespuesta: RespuestaCuestionarioDetalle = {
      respuestaId: this.idRespuestaSeleccionada
    };

    // Agregamos objeto al array
    this.listRespuestaDetalle.push(detalleRespuesta);

    this.rtaConfirmada = false;
    this.index ++;
    this.idRespuestaSeleccionada = null;

    if (this.index === this.listPreguntas.length)
     {
        this.guardarRespuestaCuestionario();
        //this.router.navigate(['/inicio/respuestaCuestionario'])
     }
  }

  guardarRespuestaCuestionario(): void {
    const rtaCuestinario: RespuestaCuestionario = {
      cuestionarioId: this.respuestaCuestionario.idCuestionario,
      nombreParticipante: this.respuestaCuestionario.nombreParticipante,
      fecha: this.fechaDummy,
      listRtaCuestionarioDetalle: this.listRespuestaDetalle
    };
    this.loading = true;
    this.respuestaCuestionario.guardarRespuestaCuestionario(rtaCuestinario).subscribe(data =>{
      this.router.navigate(['/inicio/respuestaCuestionario']);
      this.loading = false;
    }, error =>{
      this.loading = false;
      console.log(error);
    })
  }
}
