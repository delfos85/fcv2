import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';
import { EmailValidator } from '@angular/forms';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: []
})
export class NavbarComponent implements OnInit {

  email: string;
  pass: string;

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() {
  }

  salir(){
    this.auth.logout();
    this.router.navigateByUrl('/login');
  }

  showEmail(){
    this.email = this.auth.leerEmail();

    return this.email;
  }

  showPass(){
    this.pass = this.auth.leerPass();

    return this.pass;
  }

}
