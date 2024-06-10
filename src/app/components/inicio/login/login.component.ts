import { Component, NgModule, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Form, FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Usuario } from '../../../models/usuario';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { LoadingComponent } from '../../../shared/loading/loading.component';
import { LoginService } from '../../../services/login.service';



@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule,
            ReactiveFormsModule,
            CommonModule,
            FormsModule,
            LoadingComponent
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  login: FormGroup;
  loading = false;

  constructor(private fb: FormBuilder, private toastr: ToastrService, private router: Router, private loginService: LoginService){
    this.login = this.fb.group({
      usuario: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  ngOnInit(): void{

  }

  log(): void{
    const usuario: Usuario = {
      nombreUsuario: this.login.value.usuario,
      password: this.login.value.password
    };

    this.loading = true;
    this.loginService.login(usuario).subscribe(data => {
      this.loading = false;
      this.loginService.setLocalStorage(data.token);
      this.router.navigate(['/dashboard']);

    }, error => {
      console.log(error);
      this.loading = false;
      this.toastr.error(error.error.message, 'Error');
      this.login.reset();
    })

    /*setTimeout(() => {
      if(usuario.nombreUsuario === 'truizdiaz' && usuario.password === 'admin123'){
        
      }
      else{
       
        this.login.reset();
      }
      this.loading = false;
    },3000)*/

  }
}
