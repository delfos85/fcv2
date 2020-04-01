import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map} from 'rxjs/operators';
import { ParticipantesModel } from '../models/participantes';

@Injectable({
  providedIn: 'root'
})
export class ParticipantesServiceService {

  private url ='https://login-app-80ed5.firebaseio.com';

  constructor(private http: HttpClient) { }

  registrarParticipacion( p: ParticipantesModel ){
    console.log(p);
    return this.http.post(`${this.url}/participaciones.json`, p)
    .subscribe(resp=>{
      console.log(`La respuesta del realtime es: ${resp}`);
    })
      
  }

  getParticipantes(){

    return this.http.get(`${ this.url }/participaciones.json`)
            .pipe(
              map( this.crearArreglo )
            );
  }

  private crearArreglo( heroesObj: object){

    const heroes: ParticipantesModel[] = [];

    if( heroesObj === null ){ return []; }

    Object.keys( heroesObj ).forEach( key => {
      
      const heroe: ParticipantesModel = heroesObj[key];
      

      heroes.push( heroe );
    });

    return heroes;
  }

}
