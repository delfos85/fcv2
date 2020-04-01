import { Component, OnInit } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/service/auth.service';
import { ParticipantesServiceService } from 'src/app/service/participantes-service.service';
import { ParticipantesModel } from '../../models/participantes';
export interface Item { nombre: string; url: string; usuario: string; }
export interface Part { nombre: string; correo: string; password: string; }

@Component({
  selector: 'app-archivos',
  templateUrl: './archivos.component.html',
  styleUrls: ['./archivos.component.css']
})
export class ArchivosComponent implements OnInit {
  email: string;
  private itemsCollection: AngularFirestoreCollection<Item>;
  items: Observable<Item[]>;
  
  participantes: ParticipantesModel[] = [];
  cargando = false;

  constructor(private auth: AuthService, private afs: AngularFirestore,
    private participante: ParticipantesServiceService) {
    this.itemsCollection = afs.collection<Item>( 'archivos');
    
    this.items = this.itemsCollection.valueChanges();
    //console.log(this.participantes);

    

   }

  ngOnInit() {
    this.participante.getParticipantes()
    .subscribe( resp => {
      this.participantes = resp;
      this.cargando = false;
    });
  }

  getFormatoArchivo(nombreArchivo: string): string {
    const pos = nombreArchivo.indexOf('.');

    const formato = nombreArchivo.substring(pos+1, nombreArchivo.length);

    return formato;
  }

}
