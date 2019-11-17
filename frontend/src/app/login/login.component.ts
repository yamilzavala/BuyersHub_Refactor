import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UnsubscriptionError } from 'rxjs';
import { UsuarioModel } from '../pages/usuarios/models/usuario.model';
import { UserService } from '../services/usuarios/user.service';
import Swal from 'sweetalert2';

declare function init_plugins();

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public usuario: UsuarioModel;
  public identity;
  public token;
  public erroMje;


  constructor( public router: Router,
               private _userService: UserService) {
    this.usuario = new UsuarioModel('','','','','');
   }

  ngOnInit() {
    init_plugins();
  }

  ingresar() {    
    //this.router.navigate([ '/home' ]);
    this._userService.signUp(this.usuario)
            .subscribe( res => {
              console.log(res);
            }, 
            error => {     
              this.erroMje = <any>error;
              if (this.erroMje != null) {
                console.log(error);   
                this.mostrarMjeError(this.erroMje.error.message);
              }                                  
            } ); 
  }

  mostrarMjeError(mje){
    Swal.fire({
      icon: 'error',
      title: 'Error...',
      text: mje                      
    })
  }

}
