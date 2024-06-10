import { Component } from '@angular/core';
import { CuestionarioService } from '../../../services/cuestionario.service';
import { Cuestionario } from '../../../models/cuestionario';
import { LoadingComponent } from '../../../shared/loading/loading.component';
import { CommonModule } from '@angular/common';
import { RespuestaCuestionarioService } from '../../../services/respuesta-cuestionario.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-list-cuestionarios',
  standalone: true,
  imports: [LoadingComponent,
            CommonModule,
            RouterModule
  ],
  templateUrl: './list-cuestionarios.component.html',
  styleUrl: './list-cuestionarios.component.css'
})
export class ListCuestionariosComponent {
  loading = false;
  listCuestionarios: any[] = [];

  constructor(private cuestionarioService: CuestionarioService, private router: Router, private respuestaCuestionario: RespuestaCuestionarioService){
    
  }

  ngOnInit(): void{
    this.getListCuestionarios();
  }

  getListCuestionarios(): void{
    this.loading = true;
    this.cuestionarioService.getListCuestionarios().subscribe(data=>{
      console.log(data);
      this.loading = false;
      this.listCuestionarios = data;
    })
  }

  ingresarNombre(idCuestionario: number): void {
    this.respuestaCuestionario.idCuestionario = idCuestionario;
    this.router.navigate(['/inicio/ingresarNombre']);
  }
}
