import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login';
import { RegisterComponent } from './pages/register/register';
import { RecoverComponent } from './pages/recover/recover';
import { ProfileComponent } from './pages/profile/profile';
import { ForumComponent } from './pages/forum/forum';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'recover', component: RecoverComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'forum', component: ForumComponent }
];
