import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { setInterval } from 'timers';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { InicioComponent } from './components/inicio/inicio.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,
            FormsModule,
            CommonModule,
            InicioComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent 
{
  listEstudiantes: any[] =[
    {nombre: 'Tomas Gonzalez', estado: 'Promocionado'},
    {nombre: 'Lucas Perez', estado: 'Regular'},
    {nombre: 'Patricia Funes', estado: 'Reprobado'},
    {nombre: 'Juan Garcia', estado: 'Promocionado'},
    {nombre: 'Ray Romano', estado: 'Regular'},
    {nombre: 'Nicolas Gomez', estado: 'Reprobado'},
  ]

  mostrar = true;
  
  toggle(): void {
    this.mostrar = !this.mostrar;
  }
}
