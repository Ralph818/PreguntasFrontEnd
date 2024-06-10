import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { Pregunta } from '../../../../../../models/pregunta';
import { ToastrService } from 'ngx-toastr';
import { ReactiveFormsModule } from '@angular/forms';
import { FormArray } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Respuesta } from '../../../../../../models/respuesta';
import { Output, EventEmitter } from '@angular/core'
import { EventManager } from '@angular/platform-browser';

@Component({
  selector: 'app-nueva-pregunta',
  standalone: true,
  imports: [ReactiveFormsModule,
            FormsModule,
            CommonModule
  ],
  templateUrl: './nueva-pregunta.component.html',
  styleUrl: './nueva-pregunta.component.css'
})
export class NuevaPreguntaComponent {
  nuevaPregunta: FormGroup;
  pregunta: Pregunta;
  rtaCorrecta = 0;
  @Output() enviarPregunta = new EventEmitter<Pregunta>();

  constructor(private fb: FormBuilder, private toastr: ToastrService){
    this.nuevaPregunta = this.fb.group({
      titulo: ['', Validators.required],
      respuestas: this.fb.array([])
    });
  }

  ngOnInit(): void{
    this.agregarRespuestasPorDefecto();
  }

  //Devuelve FormArray de respuestas
  get getRespuestas(): FormArray {
    return this.nuevaPregunta.get('respuestas') as FormArray;
  }

  //Agregar una respuesta al array
  agregarRespuesta(): void {
    this.getRespuestas.push(this.fb.group({
      descripcion: ['', Validators.required],
      esCorrecta: 0
    }))
  }

  agregarRespuestasPorDefecto(): void{
    this.agregarRespuesta();
    this.agregarRespuesta();
  }

  eliminarRespuesta(i: number): void{
    if (this.getRespuestas.length == 2){
      this.toastr.error('Como mínimo la pregunta debe contener 2 respuestas', 'Error')
    }else {
    this.getRespuestas.removeAt(i);
    }
  }

  setRespuestaValida(i: number): void{
    this.rtaCorrecta = i;
  }

  agregarPregunta(): void{
    // Obtenemos el título de la pregunta
    const descripcionPregunta = this.nuevaPregunta.get('titulo').value;

    // Obtenemos el array de respuestas
    const arrayRespuestas = this.nuevaPregunta.get('respuestas').value;

    // Creamos un array de respuestas
    const arrayRta: Respuesta[] = [];

    arrayRespuestas.forEach((element, index ) => {
      const respuesta: Respuesta = new Respuesta(element.descripcion, false);
      if (index === this.rtaCorrecta){
        respuesta.esCorrecta = true;
      }
      arrayRta.push(respuesta);
    });

    const pregunta: Pregunta = new Pregunta(descripcionPregunta, arrayRta);
    this.enviarPregunta.emit(pregunta);
    this.reset();
  }

  reset(): void{
    this.rtaCorrecta = 0;
    this.nuevaPregunta.reset();
    this.getRespuestas.clear();
    this.agregarRespuestasPorDefecto();
  }

}
