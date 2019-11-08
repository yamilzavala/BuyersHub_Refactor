import { Injectable } from '@angular/core';

@Injectable()
export class SidebarService {

  menu: any = [
    {
      titulo: 'Principal',
      icono: 'mdi mdi-gauge',
      submenu: [
        { titulo: 'Inicio', url: '/home' },
        { titulo: 'Mis Suscripciones', url: '/suscripciones' },
        { titulo: 'Productos', url: '/producto' },
        // { titulo : 'Suscripciones', url: '/progress' },        
      ]
    },
    {
      titulo: 'Administracion',
      icono: 'mdi mdi-menu',
      submenu: [
        {titulo: 'Clientes', url: 'clientes'},
        {titulo: 'Proveedores', url: 'proveedores'},
        {titulo: 'Productos', url: '/agregar-producto'}
      ]

    }
  ];

  constructor() { }

}
