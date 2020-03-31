import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { MispropuestasComponent } from './pages/mispropuestas/mispropuestas.component';
import { ArchivosComponent } from './pages/archivos/archivos.component';
import { DetalleComponent } from './pages/detalle/detalle.component';

const routes: Routes = [
  { path: 'home'    , component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'mispropuestas', component: MispropuestasComponent, canActivate: [AuthGuard] },
  { path: 'registro', component: RegistroComponent },
  { path: 'login'   , component: LoginComponent },
  { path: 'archivos' , component: ArchivosComponent },
  { path: 'detalle/:pass' , component: DetalleComponent },
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
