import { Injectable } from '@angular/core';

export interface Usuario {
  id: number;
  username: string;
  email: string;
  password: string;
  role: 'ROLE_USER' | 'ROLE_ADMIN';
}

export interface Comentario {
  id: number;
  author: string;
  content: string;
  banned: boolean;
  date: string;
}

export interface Publicacion {
  id: number;
  title: string;
  content: string;
  category: string;
  author: string;
  banned: boolean;
  date: string;
  comments: Comentario[];
}

@Injectable({ providedIn: 'root' })
export class ForumStateService {
  categorias: string[] = [
    'r/tecnologia',
    'r/videojuegos',
    'r/ciencia',
    'r/cine_y_series',
    'r/educacion'
  ];

  usuarios: Usuario[] = [
    { id: 1, username: 'admin_foro', email: 'admin@foro.cl', password: 'Admin*1234', role: 'ROLE_ADMIN' },
    { id: 2, username: 'usuario_cloud', email: 'usuario@foro.cl', password: 'Clave*1234', role: 'ROLE_USER' }
  ];

  usuarioActual: Usuario | null = this.usuarios[1];

  publicaciones: Publicacion[] = [
    {
      id: 1,
      title: '¿Cómo conectar Spring Boot a Oracle Cloud con Wallet?',
      content: 'Usando ojdbc11-production y TNS_ADMIN=./wallet funciona directo en Java 21.',
      category: 'r/tecnologia',
      author: 'usuario_cloud',
      banned: false,
      date: '2026-11-23',
      comments: [
        { id: 101, author: 'admin_foro', content: 'Excelente aporte para el equipo.', banned: false, date: '2026-11-23' }
      ]
    },
    {
      id: 2,
      title: 'Recomendaciones de juegos indie para este fin de semana',
      content: 'Dejen sus favoritos para probar en PC o consola.',
      category: 'r/videojuegos',
      author: 'usuario_cloud',
      banned: false,
      date: '2026-11-22',
      comments: []
    }
  ];

  login(username: string, password: string): boolean {
    const found = this.usuarios.find(u => u.username === username && u.password === password);
    if (found) {
      this.usuarioActual = found;
      return true;
    }
    return false;
  }

  logout(): void {
    this.usuarioActual = null;
  }

  registrarUsuario(nuevo: Omit<Usuario, 'id'>): void {
    this.usuarios.push({ ...nuevo, id: Date.now() });
  }

  recuperarPassword(email: string): boolean {
    return this.usuarios.some(u => u.email.toLowerCase() === email.toLowerCase());
  }

  actualizarPerfil(email: string, password?: string): void {
    if (!this.usuarioActual) return;
    this.usuarioActual.email = email;
    if (password && password.trim().length > 0) {
      this.usuarioActual.password = password;
    }
  }

  agregarPublicacion(title: string, content: string, category: string): void {
    if (!this.usuarioActual) return;
    this.publicaciones.unshift({
      id: Date.now(),
      title,
      content,
      category,
      author: this.usuarioActual.username,
      banned: false,
      date: new Date().toISOString().split('T')[0],
      comments: []
    });
  }

  agregarComentario(postId: number, content: string): void {
    if (!this.usuarioActual) return;
    const post = this.publicaciones.find(p => p.id === postId);
    if (post) {
      post.comments.push({
        id: Date.now(),
        author: this.usuarioActual.username,
        content,
        banned: false,
        date: new Date().toISOString().split('T')[0]
      });
    }
  }

  toggleBanPost(postId: number): void {
    const post = this.publicaciones.find(p => p.id === postId);
    if (post) post.banned = !post.banned;
  }

  toggleBanComment(postId: number, commentId: number): void {
    const post = this.publicaciones.find(p => p.id === postId);
    const comment = post?.comments.find(c => c.id === commentId);
    if (comment) comment.banned = !comment.banned;
  }
}
