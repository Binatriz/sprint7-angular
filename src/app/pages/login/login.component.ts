import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  usuario = {
    nome: '',
    senha: ''
  }

  constructor(private authService: AuthService, private router: Router){}

  login(){
    this.authService.login(this.usuario).subscribe({
      next: (response) => {
        this.router.navigate(["/home"]);
      },
      error: (err)=>{
        alert("Login ou senha incorretos");
      }
    })
  }
}
