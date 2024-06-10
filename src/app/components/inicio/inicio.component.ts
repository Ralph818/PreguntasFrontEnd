import { Component } from '@angular/core';
import { BienvenidaComponent } from './bienvenida/bienvenida.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [BienvenidaComponent,
            RouterModule
  ],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent {

}
