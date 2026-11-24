import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ForumStateService } from '../../services/forum-state.service';

@Component({
  selector: 'app-recover',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  template: `
    <div class="container py-5">
      <div class="row justify-content-center">
        <div class="col-12 col-md-7 col-lg-4">
          <div class="card shadow border-0">
            <div class="card-body p-4">
              <h4 class="text-center fw-bold mb-3">Recuperar Contraseña</h4>
              <p class="text-muted small text-center">Ingresa tu correo registrado para restablecer tu acceso.</p>

              <div *ngIf="mensaje" class="alert alert-info small py-2">{{ mensaje }}</div>

              <form [formGroup]="recoverForm" (ngSubmit)="onSubmit()">
                <div class="mb-3">
                  <label class="form-label">Correo Electrónico</label>
                  <input type="email" class="form-control" formControlName="email" placeholder="correo@ejemplo.cl">
                  <small class="text-danger" *ngIf="recoverForm.get('email')?.touched && recoverForm.get('email')?.invalid">
                    Ingresa un correo electrónico válido.
                  </small>
                </div>

                <button type="submit" class="btn btn-primary w-100" [disabled]="recoverForm.invalid">
                  Enviar Enlace de Recuperación
                </button>
              </form>

              <div class="text-center mt-3">
                <a routerLink="/login" class="small">Volver al inicio de sesión</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class RecoverComponent {
  recoverForm: FormGroup;
  mensaje = '';

  constructor(private fb: FormBuilder, private state: ForumStateService) {
    this.recoverForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit(): void {
    const email = this.recoverForm.value.email;
    const existe = this.state.recuperarPassword(email);
    this.mensaje = existe
      ? `Se enviaron las instrucciones de recuperación a ${email}.`
      : `No existe una cuenta asociada a ${email}.`;
  }
}
