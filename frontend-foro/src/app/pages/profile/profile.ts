import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ForumStateService } from '../../services/forum-state.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  template: `
    <div class="container py-5">
      <div class="row justify-content-center">
        <div class="col-12 col-md-8 col-lg-5">
          <div class="card shadow border-0">
            <div class="card-body p-4">
              <div class="d-flex justify-content-between align-items-center mb-3">
                <h4 class="fw-bold mb-0">Modificar Perfil</h4>
                <span class="badge bg-info text-dark">{{ state.usuarioActual?.role }}</span>
              </div>

              <div *ngIf="guardado" class="alert alert-success py-2 small">Perfil actualizado correctamente.</div>

              <form [formGroup]="profileForm" (ngSubmit)="onSubmit()">
                <div class="mb-3">
                  <label class="form-label">Usuario (no editable)</label>
                  <input type="text" class="form-control" [value]="state.usuarioActual?.username" disabled>
                </div>

                <div class="mb-3">
                  <label class="form-label">Correo Electrónico</label>
                  <input type="email" class="form-control" formControlName="email">
                </div>

                <div class="mb-3">
                  <label class="form-label">Nueva Contraseña (opcional)</label>
                  <input type="password" class="form-control" formControlName="password" placeholder="Dejar vacío para mantener la actual">
                  <small class="text-muted d-block mt-1">
                    Debe cumplir: 8-20 caracteres, letras, números y un símbolo (@$!%*?&).
                  </small>
                </div>

                <div class="d-flex gap-2">
                  <button type="submit" class="btn btn-primary flex-grow-1" [disabled]="profileForm.invalid">
                    Guardar Cambios
                  </button>
                  <a routerLink="/forum" class="btn btn-outline-secondary">Volver al Foro</a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class ProfileComponent {
  profileForm: FormGroup;
  guardado = false;

  constructor(private fb: FormBuilder, public state: ForumStateService) {
    this.profileForm = this.fb.group({
      email: [this.state.usuarioActual?.email || '', [Validators.required, Validators.email]],
      password: ['', [
        Validators.pattern(/^$|^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/)
      ]]
    });
  }

  onSubmit(): void {
    if (this.profileForm.valid) {
      const { email, password } = this.profileForm.value;
      this.state.actualizarPerfil(email, password);
      this.guardado = true;
    }
  }
}
