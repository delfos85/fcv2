import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';
import { FileItem } from '../../models/file-item';
import { CargaImagenService } from '../../service/carga-imagen.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: []
})
export class HomeComponent implements OnInit {

  email: string;
  estaSobreElemento = false;

  archivos: FileItem[] = [];

  constructor(private auth: AuthService, private router: Router,
    public cargaImagenes: CargaImagenService) { }

  ngOnInit() {
  }

  salir() {
    console.log(`Auth objeto: ${this.auth}`);
    this.auth.logout();
    this.router.navigateByUrl('/login');
    
  }

  cargarImagenes(){
    this.cargaImagenes.cargarImagenesFirebase(this.archivos, this.showEmail());
  }

  limpiarArchivos(){
    this.archivos = [];
  }

  
  showEmail() {
    this.email = this.auth.leerEmail();

    return this.email;
  }

  
}
