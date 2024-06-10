import { Component } from '@angular/core';
import { LoginService } from '../../../services/login.service';
import { RouterModule } from '@angular/router';
import { Cuestionario } from '../../../models/cuestionario';
import { CuestionarioService } from '../../../services/cuestionario.service';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from '../../../shared/loading/loading.component';


@Component({
  selector: 'app-cuestionarios',
  standalone: true,
  imports: [RouterModule,
            CommonModule,
            LoadingComponent
  ],
  templateUrl: './cuestionarios.component.html',
  styleUrl: './cuestionarios.component.css'
})
export class CuestionariosComponent {
  nombreUsuario: string;
  listCuestionarios: Cuestionario[] = [];
  loading = false;

  constructor(private loginService: LoginService, private cuestionarioService: CuestionarioService, private toastr: ToastrService){ 
    console.log(this.loginService.getTokenDecoded());
    this.nombreUsuario = this.loginService.getTokenDecoded().sub;
   }

   ngOnInit(): void{
    this.getCuestionarios();
   }

   
   getCuestionarios(): void {
    this.loading = true;
    this.cuestionarioService.getListCuestionarioByUser().subscribe(data => {
      this.listCuestionarios = data;
      this.loading = false;
    }, error =>{
      // this.toastr.error('Oops... Ocurrió un error al cargar los cuestionarios','Error');
      this.loading = false;
    })
   }
   
   eliminarCuestionario(idCuestionario: number): void {
    if(confirm('¿Está seguro que desea eliminar el cuestionario?')){    
      this.loading = true;
      this.cuestionarioService.deleteCuestionario(idCuestionario).subscribe(data => {
        this.loading = false;
        this.toastr.success('El cuestionario ha sido eliminado','Registro Eliminado');
        this.getCuestionarios();
      }, error => {
        this.loading = false;
        this.toastr.error('Oops... ocurrió un error al eliminar el cuestionario','Error');
      })
   }
  }
}
