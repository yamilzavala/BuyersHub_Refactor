import { Injectable } from '@angular/core';

@Injectable()
export class SidebarService {

  private userLogin;
  private userRole;

  menu: any;

  constructor() { }

  inicializarMenuPorRol(){

    this.userLogin = JSON.parse(localStorage.getItem('identity'));
    this.userRole = this.userLogin.role;
    console.log('this.userRole: ',this.userRole);

      switch (this.userRole) {
        case 'User_Role':
          this.menu = [
            {
              titulo: 'Principal',
              icono: 'mdi mdi-gauge',
              submenu: [
                { titulo: 'Inicio', url: '/home' },
                { titulo: 'Mis Suscripciones', url: '/suscripciones' },
                { titulo: 'Productos', url: '/producto' },
                { titulo: 'Envios', url: '/envios' }                
              ]
            }
          ];
          break;

        case 'Admin_Role':
          this.menu = [
            {
              titulo: 'Principal',
              icono: 'mdi mdi-gauge',
              submenu: [
                { titulo: 'Inicio', url: '/home' },
                { titulo: 'Mis Suscripciones', url: '/suscripciones' },
                { titulo: 'Productos', url: '/producto' },
                { titulo: 'Envios', url: '/envios' }                
              ]
            },
            {
              titulo: 'Administracion',
              icono: 'mdi mdi-menu',
              submenu: [
                {titulo: 'Clientes', url: 'clientes'},
                {titulo: 'Proveedores', url: 'proveedores'},
                {titulo: 'Productos', url: '/agregar-producto'},
                { titulo: 'Envios', url: '/envios' }
              ]
        
            }
          ];
          break;  
      
        default:
          break;
      }
  }

}
