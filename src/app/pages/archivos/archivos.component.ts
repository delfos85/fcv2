import { Component, OnInit } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/service/auth.service';

export interface Item { nombre: string; url: string; usuario: string}

@Component({
  selector: 'app-archivos',
  templateUrl: './archivos.component.html',
  styleUrls: ['./archivos.component.css']
})
export class ArchivosComponent implements OnInit {
  email: string;
  private itemsCollection: AngularFirestoreCollection<Item>;
  items: Observable<Item[]>;
  participantes: any;

  constructor(private auth: AuthService, private afs: AngularFirestore) {
    this.itemsCollection = afs.collection<Item>( 'archivos');
    
    this.itemsCollection.valueChanges().subscribe((_participantes: any) => {
      this.participantes = _participantes;
      console.log(this.participantes);
    });
   }

  ngOnInit() {
  }

  getFormatoArchivo(nombreArchivo: string): string {
    const pos = nombreArchivo.indexOf('.');

    const formato = nombreArchivo.substring(pos+1, nombreArchivo.length);

    return formato;
  }

}
