import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { RespuestaCuestionarioService } from '../../../../services/respuesta-cuestionario.service';

@Component({
  selector: 'app-ingresar-nombre',
  standalone: true,
  imports: [RouterModule,
            FormsModule
  ],
  templateUrl: './ingresar-nombre.component.html',
  styleUrl: './ingresar-nombre.component.css'
})
export class IngresarNombreComponent {
  nombreParticipante = "";

  constructor(private router: Router, private respuestaCuestionario: RespuestaCuestionarioService){

  }

  ngOnInit(): void {
    if (this.respuestaCuestionario.idCuestionario == null){
      this.router.navigate(['/inicio']);
      return;
    }
  }

  siguiente(): void {
    this.respuestaCuestionario.nombreParticipante = this.nombreParticipante;
    this.router.navigate(['/inicio/pregunta']);
  }
}
