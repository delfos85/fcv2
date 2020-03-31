import { Component, OnInit } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/service/auth.service';
import { ActivatedRoute } from '@angular/router';


export interface Item { nombre: string; url: string; usuario: string}

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit {

  email: string;
  private itemsCollection: AngularFirestoreCollection<Item>;
  items: Observable<Item[]>;
  pass: string;
  
  constructor(private auth: AuthService, private afs: AngularFirestore, private route: ActivatedRoute) {

    this.pass = route.snapshot.paramMap.get('pass');

    console.log(this.pass);

    this.itemsCollection = afs.collection<Item>( 'archivos', ref => ref.where('usuario','==', 
    this.pass ));
    this.items = this.itemsCollection.valueChanges();
   }

  ngOnInit() {
  }

  getFormatoArchivo(nombreArchivo: string): string {
    const pos = nombreArchivo.indexOf('.');

    const formato = nombreArchivo.substring(pos+1, nombreArchivo.length);

    return formato;
  }
}
