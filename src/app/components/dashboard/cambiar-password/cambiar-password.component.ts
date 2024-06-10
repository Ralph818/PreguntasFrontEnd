import { Component } from '@angular/core';
import { Form, FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UsuarioService } from '../../../services/usuario.service';
import { ToastrService } from 'ngx-toastr';
import { LoadingComponent } from '../../../shared/loading/loading.component';

@Component({
  selector: 'app-cambiar-password',
  standalone: true,
  imports: [RouterModule,
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    LoadingComponent],
  templateUrl: './cambiar-password.component.html',
  styleUrl: './cambiar-password.component.css'
})
export class CambiarPasswordComponent {
  cambiarPassword: FormGroup;
  loading = false;

  constructor(private fb: FormBuilder, private usuarioService: UsuarioService, private toastr: ToastrService, private router: Router) 
  {
    this.cambiarPassword = this.fb.group({
      passwordAnterior: ['', Validators.required],
      nuevaPassword: ['', [Validators.required, Validators.minLength(4)]],
      confirmPassword: ['']
    }, {validator: this.checkPassword})
  }

  checkPassword(group: FormGroup): any{
    const pass = group.controls['nuevaPassword'].value;
    const confirmPass = group.controls['confirmPassword'].value;

    return pass === confirmPass ? null : {notSame: true};
  }

  guardarPassword(): void{
    console.log(this.cambiarPassword);
    const changePassword: any = {
      passwordAnterior: this.cambiarPassword.value.passwordAnterior,
      nuevaPassword: this.cambiarPassword.value.nuevaPassword
    };
    console.log(changePassword);
    this.loading = true;
    this.usuarioService.changePassword(changePassword).subscribe(data => {
      this.toastr.success(data.message)
      this.router.navigate(['/dashboard']);
    }, error => {
      this.cambiarPassword.reset();
      this.loading = false;
      this.toastr.error(error.error.message, 'Error');
    })
  }

  
}
