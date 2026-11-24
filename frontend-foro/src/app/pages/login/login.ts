import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ForumStateService } from '../../services/forum-state.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  template: `
    <div class="container py-5">
      <div class="row justify-content-center">
        <div class="col-12 col-md-7 col-lg-4">
          <div class="card shadow border-0">
            <div class="card-body p-4">
              <div class="text-center mb-4">
                <span class="badge bg-primary fs-6 mb-2">ForoHub Cloud</span>
                <h4 class="fw-bold">Iniciar Sesión</h4>
              </div>

              <div *ngIf="errorMsg" class="alert alert-danger py-2 small">{{ errorMsg }}</div>

              <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
                <div class="mb-3">
                  <label class="form-label">Usuario</label>
                  <input type="text" class="form-control" formControlName="username" placeholder="Ej. admin_foro">
                  <small class="text-danger" *ngIf="loginForm.get('username')?.touched && loginForm.get('username')?.invalid">
                    Ingresa tu nombre de usuario.
                  </small>
                </div>

                <div class="mb-3">
                  <label class="form-label">Contraseña</label>
                  <input type="password" class="form-control" formControlName="password" placeholder="••••••••">
                  <small class="text-danger" *ngIf="loginForm.get('password')?.touched && loginForm.get('password')?.invalid">
                    Ingresa tu contraseña.
                  </small>
                </div>

                <button type="submit" class="btn btn-primary w-100 mb-3" [disabled]="loginForm.invalid">
                  Ingresar al Foro
                </button>
              </form>

              <div class="d-flex justify-content-between small">
                <a routerLink="/register">Crear cuenta</a>
                <a routerLink="/recover">¿Olvidaste tu clave?</a>
              </div>

              <hr>
              <div class="small text-muted">
                <strong>Cuentas demo:</strong><br>
                Admin: <code>admin_foro</code> / <code>Admin*1234</code><br>
                Usuario: <code>usuario_cloud</code> / <code>Clave*1234</code>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMsg = '';

  constructor(private fb: FormBuilder, private state: ForumStateService, private router: Router) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    const { username, password } = this.loginForm.value;
    if (this.state.login(username, password)) {
      this.router.navigate(['/forum']);
    } else {
      this.errorMsg = 'Usuario o contraseña incorrectos.';
    }
  }
}
