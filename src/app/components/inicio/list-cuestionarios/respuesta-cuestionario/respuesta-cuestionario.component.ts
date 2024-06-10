import { Component } from '@angular/core';
import { Cuestionario } from '../../../../models/cuestionario';
import { RespuestaCuestionarioService } from '../../../../services/respuesta-cuestionario.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-respuesta-cuestionario',
  standalone: true,
  imports: [CommonModule,
            RouterModule
  ],
  templateUrl: './respuesta-cuestionario.component.html',
  styleUrl: './respuesta-cuestionario.component.css'
})
export class RespuestaCuestionarioComponent {
  cuestionario: Cuestionario;
  respuestaUsuario: number[] = [];
  constructor (private respuestaCuestionarioService: RespuestaCuestionarioService, private router: Router){

  }

  ngOnInit(): void {
    if (this.respuestaCuestionarioService.idCuestionario == null){
      this.router.navigate(['/inicio']);
    }else{
      this.cuestionario = this.respuestaCuestionarioService.cuestionario;
      this.respuestaUsuario = this.respuestaCuestionarioService.respuestas;
      console.log(this.cuestionario);
      console.log(this.respuestaUsuario);
      
    }
  }
}
