import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { RespuestaCuestionarioService } from '../../../../services/respuesta-cuestionario.service';
import { RespuestaCuestionario } from '../../../../models/respuestaCuestionario';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from '../../../../shared/loading/loading.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-estadisticas',
  standalone: true,
  imports: [CommonModule,
            LoadingComponent,
            RouterModule
  ],
  templateUrl: './estadisticas.component.html',
  styleUrl: './estadisticas.component.css'
})
  export class EstadisticasComponent {
    idCuestionarios: number;
    loading = false;
    listRespuestaCuestionario: RespuestaCuestionario[] = [];
  
  constructor(private aRoute: ActivatedRoute, private respuestaCuestionarioService: RespuestaCuestionarioService, private toastr: ToastrService){
    this.idCuestionarios = +this.aRoute.snapshot.paramMap.get('id');   // el + es para castear a int
  } 

  ngOnInit():void{
    this.getListCuestionarioService();
  }

  getListCuestionarioService(): void{
    this.loading = true;
    this.respuestaCuestionarioService.getListCuestionarioRespuesta(this.idCuestionarios).subscribe(data => {
      console.log(data);
      this.listRespuestaCuestionario = data;
      this.loading = false;
    })
  }

  deleteRespuestaCuestionario(idRespuestaCuestionario: number): void{
    this.loading = true;
    this.respuestaCuestionarioService.deleteRespuestaCuestionario(idRespuestaCuestionario).subscribe(data => {
      console.log(data);
      this.toastr.error("El registro fue eliminado con éxito");
      this.loading = false;
      this.getListCuestionarioService();
    }, error => {
      this.loading = false;
      console.log(error);
      this.toastr.error("Oops... ha habido un error", "Error")
    })
  }
}
