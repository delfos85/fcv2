import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import {FormsModule} from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { RegistroComponent } from './pages/registro/registro.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { from } from 'rxjs';
import { NavbarComponent } from './pages/navbar/navbar.component';

import { FileuploadService } from './service/fileupload.service';
import { AuthService } from './service/auth.service';
import { environment } from 'src/environments/environment';
import { NgDropFilesDirective } from './directives/ng-drop-files.directive';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { CargaImagenService } from './service/carga-imagen.service';
import { MispropuestasComponent } from './pages/mispropuestas/mispropuestas.component';
import { ArchivosComponent } from './pages/archivos/archivos.component';

@NgModule({
  declarations: [
    AppComponent,
    RegistroComponent,
    HomeComponent,
    LoginComponent,
    NavbarComponent,
    NgDropFilesDirective,
    MispropuestasComponent,
    ArchivosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
  ],
  providers: [FileuploadService, AuthService, CargaImagenService],
  bootstrap: [AppComponent]
})
export class AppModule { }
