import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ForumStateService } from '../../services/forum-state.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  template: `
    <div class="container py-5">
      <div class="row justify-content-center">
        <div class="col-12 col-md-8 col-lg-5">
          <div class="card shadow border-0">
            <div class="card-body p-4">
              <h4 class="text-center fw-bold text-primary mb-4">Registro de Usuario</h4>
              <form [formGroup]="registerForm" (ngSubmit)="onSubmit()">
                <div class="mb-3">
                  <label class="form-label">Nombre de Usuario</label>
                  <input type="text" class="form-control" formControlName="username">
                  <small class="text-danger" *ngIf="registerForm.get('username')?.touched && registerForm.get('username')?.invalid">
                    Mínimo 4 caracteres.
                  </small>
                </div>

                <div class="mb-3">
                  <label class="form-label">Correo Electrónico</label>
                  <input type="email" class="form-control" formControlName="email">
                  <small class="text-danger" *ngIf="registerForm.get('email')?.touched && registerForm.get('email')?.invalid">
                    Correo electrónico inválido.
                  </small>
                </div>

                <div class="mb-3">
                  <label class="form-label">Rol del Sistema</label>
                  <select class="form-select" formControlName="role">
                    <option value="ROLE_USER">Usuario Estándar (ROLE_USER)</option>
                    <option value="ROLE_ADMIN">Administrador / Moderador (ROLE_ADMIN)</option>
                  </select>
                </div>

                <div class="mb-3">
                  <label class="form-label">Contraseña</label>
                  <input type="password" class="form-control" formControlName="password">
                  <ul class="list-unstyled small mt-2 mb-0">
                    <li [class.text-success]="hasMinLength" [class.text-danger]="!hasMinLength">• 1. Longitud mínima de 8 caracteres</li>
                    <li [class.text-success]="hasMaxLength" [class.text-danger]="!hasMaxLength">• 2. Longitud máxima de 20 caracteres</li>
                    <li [class.text-success]="hasAlphaNum" [class.text-danger]="!hasAlphaNum">• 3. Contiene letras y números</li>
                    <li [class.text-success]="hasSpecial" [class.text-danger]="!hasSpecial">• 4. Contiene carácter especial (@$!%*?&)</li>
                  </ul>
                </div>

                <button type="submit" class="btn btn-primary w-100" [disabled]="registerForm.invalid">
                  Registrar Cuenta
                </button>
              </form>
              <div class="text-center mt-3">
                <a routerLink="/login" class="small">¿Ya tienes cuenta? Inicia sesión</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private state: ForumStateService, private router: Router) {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(4)]],
      email: ['', [Validators.required, Validators.email]],
      role: ['ROLE_USER', Validators.required],
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(20),
        Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/)
      ]]
    });
  }

  get pwd(): string { return this.registerForm.get('password')?.value || ''; }
  get hasMinLength(): boolean { return this.pwd.length >= 8; }
  get hasMaxLength(): boolean { return this.pwd.length > 0 && this.pwd.length <= 20; }
  get hasAlphaNum(): boolean { return /[A-Za-z]/.test(this.pwd) && /\d/.test(this.pwd); }
  get hasSpecial(): boolean { return /[@$!%*?&]/.test(this.pwd); }

  onSubmit(): void {
    if (this.registerForm.valid) {
      this.state.registrarUsuario(this.registerForm.value);
      this.router.navigate(['/login']);
    }
  }
}