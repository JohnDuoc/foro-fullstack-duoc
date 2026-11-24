import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ForumStateService } from '../../services/forum-state.service';

@Component({
  selector: 'app-forum',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark px-3">
      <a class="navbar-brand fw-bold" routerLink="/forum">ForoHub Cloud</a>
      <div class="ms-auto d-flex align-items-center gap-2 text-white">
        <span class="badge bg-info text-dark">{{ state.usuarioActual?.role }}</span>
        <span class="small d-none d-sm-inline">{{ state.usuarioActual?.username }}</span>
        <a routerLink="/profile" class="btn btn-outline-light btn-sm">Mi Perfil</a>
        <button class="btn btn-danger btn-sm" (click)="salir()">Salir</button>
      </div>
    </nav>

    <div class="container-fluid py-4">
      <div class="row g-4">
        <!-- Sidebar: 12 cols móvil, 4 cols tablet, 3 cols escritorio -->
        <div class="col-12 col-md-4 col-lg-3">
          <div class="card shadow-sm mb-3">
            <div class="card-body">
              <h6 class="fw-bold">Buscar Temas</h6>
              <input type="text" class="form-control" placeholder="Filtrar por título..." [(ngModel)]="filtroTexto">
            </div>
          </div>

          <div class="card shadow-sm">
            <div class="card-header fw-bold">Categorías (5)</div>
            <div class="list-group list-group-flush">
              <button class="list-group-item list-group-item-action"
                      [class.active]="categoriaSeleccionada === ''"
                      (click)="categoriaSeleccionada = ''">Todas las categorías</button>
              <button *ngFor="let cat of state.categorias"
                      class="list-group-item list-group-item-action"
                      [class.active]="categoriaSeleccionada === cat"
                      (click)="categoriaSeleccionada = cat">{{ cat }}</button>
            </div>
          </div>
        </div>

        <!-- Feed Principal: 12 cols móvil, 8 cols tablet, 9 cols escritorio -->
        <div class="col-12 col-md-8 col-lg-9">
          <div class="card shadow-sm mb-4">
            <div class="card-body">
              <h5 class="fw-bold mb-3">Nueva Publicación</h5>
              <div class="row g-2">
                <div class="col-12 col-md-8">
                  <input type="text" class="form-control" placeholder="Título del tema" [(ngModel)]="nuevoTitulo">
                </div>
                <div class="col-12 col-md-4">
                  <select class="form-select" [(ngModel)]="nuevaCategoria">
                    <option *ngFor="let cat of state.categorias" [value]="cat">{{ cat }}</option>
                  </select>
                </div>
                <div class="col-12">
                  <textarea class="form-control" rows="2" placeholder="Escribe el contenido..." [(ngModel)]="nuevoContenido"></textarea>
                </div>
                <div class="col-12 text-end">
                  <button class="btn btn-primary" (click)="publicar()" [disabled]="!nuevoTitulo || !nuevoContenido">
                    Publicar Tema
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div *ngFor="let post of publicacionesFiltradas" class="card shadow-sm mb-3" [class.border-danger]="post.banned">
            <div class="card-body">
              <div class="d-flex justify-content-between align-items-center mb-2">
                <span class="badge bg-secondary">{{ post.category }}</span>
                <div>
                  <span *ngIf="post.banned" class="badge bg-danger me-2">BANEADO POR ADMIN</span>
                  <button *ngIf="esAdmin" class="btn btn-sm btn-outline-danger" (click)="state.toggleBanPost(post.id)">
                    {{ post.banned ? 'Desbanear Post' : 'Banear Post' }}
                  </button>
                </div>
              </div>

              <h5 class="fw-bold">{{ post.title }}</h5>
              <p class="mb-2">{{ post.content }}</p>
              <small class="text-muted">Publicado por <strong>{{ post.author }}</strong> el {{ post.date }}</small>

              <hr>
              <h6 class="small fw-bold">Comentarios ({{ post.comments.length }})</h6>
              <div *ngFor="let com of post.comments" class="ps-3 border-start mb-2">
                <div *ngIf="!com.banned || esAdmin" class="d-flex justify-content-between align-items-center">
                  <p class="mb-0 small" [class.text-decoration-line-through]="com.banned">
                    <strong>{{ com.author }}:</strong> {{ com.content }}
                  </p>
                  <button *ngIf="esAdmin" class="btn btn-link text-danger btn-sm p-0" (click)="state.toggleBanComment(post.id, com.id)">
                    {{ com.banned ? 'Restaurar' : 'Banear' }}
                  </button>
                </div>
              </div>

              <div class="input-group input-group-sm mt-2">
                <input type="text" class="form-control" placeholder="Escribe un comentario..." [(ngModel)]="nuevoComentario[post.id]">
                <button class="btn btn-outline-primary" (click)="comentar(post.id)">Comentar</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class ForumComponent {
  filtroTexto = '';
  categoriaSeleccionada = '';
  nuevoTitulo = '';
  nuevoContenido = '';
  nuevaCategoria = 'r/tecnologia';
  nuevoComentario: { [postId: number]: string } = {};

  constructor(public state: ForumStateService, private router: Router) {}

  get esAdmin(): boolean {
    return this.state.usuarioActual?.role === 'ROLE_ADMIN';
  }

  get publicacionesFiltradas() {
    return this.state.publicaciones.filter(p => {
      if (!this.esAdmin && p.banned) return false;
      const coincideCat = !this.categoriaSeleccionada || p.category === this.categoriaSeleccionada;
      const coincideTexto = !this.filtroTexto || p.title.toLowerCase().includes(this.filtroTexto.toLowerCase());
      return coincideCat && coincideTexto;
    });
  }

  publicar(): void {
    this.state.agregarPublicacion(this.nuevoTitulo, this.nuevoContenido, this.nuevaCategoria);
    this.nuevoTitulo = '';
    this.nuevoContenido = '';
  }

  comentar(postId: number): void {
    const texto = this.nuevoComentario[postId];
    if (texto && texto.trim()) {
      this.state.agregarComentario(postId, texto);
      this.nuevoComentario[postId] = '';
    }
  }

  salir(): void {
    this.state.logout();
    this.router.navigate(['/login']);
  }
}