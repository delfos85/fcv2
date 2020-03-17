import { Injectable } from '@angular/core';

import { AngularFirestore } from 'angularfire2/firestore';
import * as firebase from 'firebase';

import { FileItem } from '../models/file-item';
import { ActivatedRouteSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CargaImagenService {

  private CARPETA_IMAEGNES = 'archivos';

  constructor( private db: AngularFirestore) { }

  cargarImagenesFirebase(imagenes: FileItem[], email: string){

    const storageRef = firebase.storage().ref();

    for(const item of imagenes ) {
      
      item.estaSubiendo = true;

      if(item.progreso >= 100){
        continue; // Se va a la siguiente iteración
      }

      const uploadTask: firebase.storage.UploadTask = 
      storageRef.child(`${this.CARPETA_IMAEGNES}/${item.nombreArchivo}`)
      .put(item.archivo);

      uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
        (snapshot: firebase.storage.UploadTaskSnapshot) => 
        item.progreso = (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
        (error) => console.log('error al subir ', error),
        () => {
          console.log('Imagen cargada correctamente');
          uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
            item.url = downloadURL;
            item.estaSubiendo = false;
            this.guardarImagen({
                nombre: item.nombreArchivo,
                url: item.url,
                usuario: email
            });
          });
        });
    }
  }

  private guardarImagen( imagen: { nombre: string, url: string, usuario: string} ) : void {
    
    this.db.collection(`${this.CARPETA_IMAEGNES}`).add( imagen );
 
  }
}
