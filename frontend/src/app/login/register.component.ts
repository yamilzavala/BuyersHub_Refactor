import { Component, OnInit } from '@angular/core';
import { UsuarioModel } from '../pages/usuarios/models/usuario.model';
import { UserService } from '../services/usuarios/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./login.component.css']
})
export class RegisterComponent implements OnInit {

  public usuario: UsuarioModel;

  constructor(private _userService: UserService) { 
    this.usuario = new UsuarioModel('','','','','','');
  }

  ngOnInit() {
  }

  enviar(){    
    this._userService.register(this.usuario).subscribe( (res:any) => {
      console.log(res);
      let usuarioTemporal = res.useroGuardado;
      this.usuario = usuarioTemporal;

      if (!usuarioTemporal._id) {
        this.mostrarMjeError('Error al registrarse');
      } else {
        this.mostrarMjeExito('Registo Exitoso, logueate con: ' + usuarioTemporal.email);
        this.usuario = new UsuarioModel('','','','','','');
      }
    }, 
    error => {
      console.log(error);
    });
  }

  mostrarMjeError(mje){
    Swal.fire({
      icon: 'error',
      title: 'Error...',
      text: mje                      
    })
  }

  mostrarMjeExito(mje){
    Swal.fire({
      icon: 'success',
      title: 'Registro...',
      text: mje                      
    })
  }

}
