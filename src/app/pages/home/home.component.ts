import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';
import { FileItem } from '../../models/file-item';
import { CargaImagenService } from '../../service/carga-imagen.service';
import { NgForm } from '@angular/forms';
import { ParticipantesServiceService } from '../../service/participantes-service.service';
import { ParticipantesModel } from 'src/app/models/participantes';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: []
})
export class HomeComponent implements OnInit {

  email: string;
  estaSobreElemento = false;

  archivos: FileItem[] = [];

  usuario = new ParticipantesModel();

  constructor(private auth: AuthService, private router: Router,
    public cargaImagenes: CargaImagenService, private participante: ParticipantesServiceService) { }

  ngOnInit() {
  }

  salir() {
    console.log(`Auth objeto: ${this.auth}`);
    this.auth.logout();
    this.router.navigateByUrl('/login');
    
  }

  cargarImagenes(){

    this.cargaImagenes.cargarImagenesFirebase(this.archivos, this.showEmail());

    this.usuario.correo = this.showEmail();
    this.usuario.password = this.auth.leerPass();
    this.usuario.cantidad = this.archivos.length;

    this.participante.registrarParticipacion(this.usuario);
  }

  limpiarArchivos(){
    this.archivos = [];
  }

  
  showEmail() {
    this.email = this.auth.leerEmail();

    return this.email;
  }

  
}
