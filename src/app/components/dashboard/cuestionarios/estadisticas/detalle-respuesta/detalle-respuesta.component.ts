import { Component } from '@angular/core';
import { RespuestaCuestionarioService } from '../../../../../services/respuesta-cuestionario.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Cuestionario } from '../../../../../models/cuestionario';
import { RespuestaCuestionarioDetalle } from '../../../../../models/respuestaCuestionarioDetalle';
import { LoadingComponent } from '../../../../../shared/loading/loading.component';
import { CommonModule, UpperCasePipe } from '@angular/common';


@Component({
  selector: 'app-detalle-respuesta',
  standalone: true,
  imports: [LoadingComponent,
            UpperCasePipe,
            CommonModule,
            RouterModule
  ],
  templateUrl: './detalle-respuesta.component.html',
  styleUrl: './detalle-respuesta.component.css'
})
export class DetalleRespuestaComponent {
  idRespuesta: number;
  loading = false;
  cuestionario: Cuestionario;
  respuestas: RespuestaCuestionarioDetalle[] = [];

  constructor(private aRoute: ActivatedRoute, private respuestaCuestionarioService: RespuestaCuestionarioService){
    this.idRespuesta = +this.aRoute.snapshot.paramMap.get('id');
  }

  ngOnInit():void{
    this.getListRespuestasYCuestionario();
  }

  getListRespuestasYCuestionario(): void {
    this.loading = true;
    this.respuestaCuestionarioService.getCuestionarioByIdRespuesta(this.idRespuesta).subscribe(data => {
      this.cuestionario = data.cuestionario;
      this.respuestas = data.respuestas;
      this.loading = false;
      console.log(data);
    })
  }

}
