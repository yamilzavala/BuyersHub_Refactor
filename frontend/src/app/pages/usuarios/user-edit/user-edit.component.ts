import { Component, OnInit } from '@angular/core';
import { UsuarioModel } from '../models/usuario.model';
import { UserService } from 'src/app/services/usuarios/user.service';
import Swal from 'sweetalert2';
import { SidebarService } from 'src/app/services/service.index';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  usuario: UsuarioModel;
  public identity;
  public token;

  constructor(private _userService: UserService,
              public _sidebar: SidebarService) {     
    this.token = this._userService.getToken();
    this.identity = this._userService.getIdenity();
    this.usuario = this.identity;
  }

  ngOnInit() {
    
  }

  actualizarUsuario(){
    console.log(this.usuario);
    this._userService.updateUser(this.usuario).subscribe( (res:any) => {
        console.log(res);
        if (!res.userUpdated) {
          this.mostrarMjeError('El usuario no se actualizo');
        } else {
          //this.usuario = res.userUpdated;
          localStorage.setItem('identity',JSON.stringify(this.usuario));
          this.mostrarMjeExito('El usuario se actualizo correctamente'); 
          this._sidebar.inicializarMenuPorRol();         
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
      title: 'Actualizacion exitosa...',
      text: mje                      
    })
  }

}
