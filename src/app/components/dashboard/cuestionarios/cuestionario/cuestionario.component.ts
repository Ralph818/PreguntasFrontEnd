import { Component } from '@angular/core';
import { CuestionarioService } from '../../../../services/cuestionario.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { LoadingComponent } from '../../../../shared/loading/loading.component';
import { CommonModule, UpperCasePipe } from '@angular/common';

@Component({
  selector: 'app-cuestionario',
  standalone: true,
  imports: [LoadingComponent,
            CommonModule,
            UpperCasePipe,
            RouterModule
  ],
  templateUrl: './cuestionario.component.html',
  styleUrl: './cuestionario.component.css'
})
export class CuestionarioComponent { 
  idCuestionario: number;
  loading = false;
  cuestionario: any = {};

  constructor(private cuestionarioService: CuestionarioService, private aRoute: ActivatedRoute){
    this.idCuestionario = +this.aRoute.snapshot.paramMap.get('id');
  }

  ngOnInit(): void{
    this.getCuestionario();
  }

  getCuestionario(): void {
    this.loading = true;
    this.cuestionarioService.getCuestionario(this.idCuestionario).subscribe(data=>{
      this.loading = false;
      this.cuestionario = data;
      console.log(data);
    });
  }

}
