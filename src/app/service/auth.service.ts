import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioModel } from '../models/usuario.model';
import { map } from 'rxjs/operators';
import { isNullOrUndefined } from 'util';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  //private url = 'https://identitytoolkit.googleapis.com/v1/';
  private apiKey = 'AIzaSyBIUwA-Os2zkRNi1nr4Oj2rCQ4JyhGoGC0';
  userToken: string;
  userEmail: string;
  pass: string;

  //Crear usuario
  //https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]


  //Login
  //https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY]

  constructor(private http: HttpClient) { 
    this.leerToken();
  }

  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    localStorage.removeItem('expira');
    localStorage.removeItem('pass');
  }

  login(usuario: UsuarioModel){
    const authData = {
      ...usuario,
      returnSecureToken: true
    };

    return this.http.post(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${this.apiKey}`,
       authData).pipe(
        map( resp => {
          this.guardaToken( resp['idToken'] );
          this.guardaEmail( resp[ 'email'] );
          this.guardaPass( usuario.password);
          return resp;
        })
      );

  }

  nuevoUsuario(usuario: UsuarioModel){

    const authData = {
      ...usuario,
      returnSecureToken: true
    };

    return this.http.post(
      `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${this.apiKey}`, 
      authData).pipe(
        map( resp => {
          this.guardaToken( resp['idToken'] );
          return resp;
        })
      );
  }

  private guardaEmail( email: string){
    this.userEmail = email;
    localStorage.setItem('email', email);
  }

  leerEmail(){
    if(localStorage.getItem('email')){
      this.userEmail = localStorage.getItem('email');
    }else{
      this.userEmail = '';
    }

    return this.userEmail;
  }

  guardaPass( pass: string ){
    this.pass = pass;
    localStorage.setItem('pass', pass);
  }

  leerPass(){
    if(localStorage.getItem('pass')){
      this.pass = localStorage.getItem('pass');
    }else{
      this.pass = '';
    }

    return this.pass;
  }

  private guardaToken( idToken: string )
  {
    this.userToken = idToken;
    localStorage.setItem('token', idToken);

    let hoy = new Date();
    hoy.setSeconds( 3600 );

    localStorage.setItem('expira', hoy.getTime().toString());
  }

  leerToken(){
    if(localStorage.getItem('token')){
      this.userToken = localStorage.getItem('token');
    }else{
      this.userToken = '';
    }

    return this.userToken;

  }

  estaAutenticado(): boolean{
    // if (this.userToken.length < 2 )
    // {
    //   return false;
    // }

    if( isNullOrUndefined(localStorage.getItem('token').toString())) {
        return false;
    }

    const expira = Number( localStorage.getItem('expira') );

    const expiraDate = new Date();
    expiraDate.setTime(expira);

    if ( expiraDate < new Date() ) 
    {
      return false;
    } 
    
      return true;

  }

}


