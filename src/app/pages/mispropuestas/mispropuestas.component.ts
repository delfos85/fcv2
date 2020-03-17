import { Component, OnInit } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/service/auth.service';

export interface Item { nombre: string; url: string; usuario: string}

@Component({
  selector: 'app-mispropuestas',
  templateUrl: './mispropuestas.component.html',
  styles: []
})
export class MispropuestasComponent implements OnInit {
  email: string;
  private itemsCollection: AngularFirestoreCollection<Item>;
  items: Observable<Item[]>;

  constructor(private auth: AuthService, private afs: AngularFirestore) {
    // this.itemsCollection = afs.collection<Item>(this.showEmail());
    // this.items = this.itemsCollection.valueChanges();
    
    this.itemsCollection = afs.collection<Item>( 'archivos', ref => ref.where('usuario','==', 
    this.showEmail() ));
    this.items = this.itemsCollection.valueChanges();
  }

  ngOnInit() {
  }

  showEmail() {
    this.email = this.auth.leerEmail();

    return this.email;
  }

  getFormatoArchivo(nombreArchivo: string): string {
    const pos = nombreArchivo.indexOf('.');

    const formato = nombreArchivo.substring(pos+1, nombreArchivo.length);

    return formato;
  }

}
