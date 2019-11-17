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
    this.token = this._userService.getToken();
    this.identity = this._userService.getIdenity();
    console.log(this.token);
    this.validarToken();
  }

  validarToken(){
    if (this.token !== null) {
      this.router.navigate([ '/home' ]);
    } 
  }

  ingresar() {    
    //Conseguir datos de usuario identificado
    this._userService.signUp(this.usuario)
            .subscribe( (res:any) => {
              console.log(res);
              let identifyLocal = res.user;
              this.identity = identifyLocal;

              if (!this.identity._id) {

                this.mostrarMjeError('El usuario no esta correctamente identificado')
              } else {
                    //grabamos los datos del user en el ls
                    localStorage.setItem('identity', JSON.stringify(this.identity));

                    //Conseguir token para ser enviado a cada peticion
                    this._userService.signUp(this.usuario, 'true')
                                  .subscribe( (responseToken:any) => {
                                    console.log(responseToken);
                                    this.token = responseToken.token;
                      
                                              if (this.token.length <= 0) {
                                                this.mostrarMjeError('El token no se ha generado')
                                              } else {
                                                //grabamos los datos del token en el ls                                
                                                console.log(this.identity);
                                                console.log(this.token);
                                                localStorage.setItem('token', this.token);
                                              }    
                                              
                                              this.validarToken();
                                  }, 
                                  error => {     
                                    this.erroMje = <any>error;
                                    if (this.erroMje != null) {
                                      console.log(error);   
                                      this.mostrarMjeError(this.erroMje.error.message);
                                    }                                  
                                  } ); 
                }

            }, 
            error => {     
              this.erroMje = <any>error;
              if (this.erroMje != null) {
                console.log(error);   
                this.mostrarMjeError(this.erroMje.error.message);
              }                                  
            
          }); 
  }

  mostrarMjeError(mje){
    Swal.fire({
      icon: 'error',
      title: 'Error...',
      text: mje                      
    })
  }

}
