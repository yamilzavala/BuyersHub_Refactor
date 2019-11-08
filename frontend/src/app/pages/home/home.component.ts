import { Component, OnInit } from '@angular/core';
import { ProductosService } from 'src/app/services/productos/productos.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-dashboard',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  productos: any[] = [];

  estaSuscripto: Boolean;
  mensaje: String;
  cantidadSuscripcionesProducto: number;
  
  idProducto: Number = null;
  bodyProducto: any;
  
  mensajeGlobal: String;
  mostrarMjeGlobal: Boolean;

 
  constructor(public _productService: ProductosService, private _routeNav: ActivatedRoute) {
    this.obtenerProductos();
   }

  ngOnInit() {
  }

  obtenerProductos(){
   this._productService.getProductos()
    .subscribe( (res: any) => {
      console.log('productos desde el componente: ', res);
      this.productos = res;
      this.validarImagen();
    } );
}

validarImagen() {
  if (this.productos) {
    this.productos.forEach( productoActual => {
        if (productoActual.imagen === '') {
          productoActual.imagen = 'assets/images/not-image.png';
        } else {
          productoActual.imagen = `assets/images/products/${productoActual.imagen}.jpg`;
        }
    });
  }
}

modificarProductos(id, body){
  this._productService.editarProducto(id, body)
      .subscribe( (res: any) => {
        this.mensajeGlobal = res.message;
        this.obtenerProductos();
      });
}

// guardado de id actual para put
idProductoActual(producto, suscripto) {

  this.cantidadSuscripcionesProducto = producto.cantidadSuscripciones;
  console.log(producto.cantidadSuscripciones);

  if (suscripto) {
    this.estaSuscripto = true;
    this.mensaje = 'Confirma que desea Desuscribirse?';
    this.cantidadSuscripcionesProducto -= 10;

  } else {
    this.estaSuscripto = false;
    this.mensaje = 'Confirma que desea Suscribirse?';
    this.cantidadSuscripcionesProducto += 10;
  }

  if ( this.cantidadSuscripcionesProducto >= 100) {
    this.cantidadSuscripcionesProducto = Number(100);
  }

  if ( this.cantidadSuscripcionesProducto <= 0) {
    this.cantidadSuscripcionesProducto = Number(0);
  }

  const cambiarEstadoSuscripcion = !producto.estaSuscripto;

  this.idProducto = producto._id;
  this.bodyProducto = { estaSuscripto: cambiarEstadoSuscripcion,
                        cantidadSuscripciones: this.cantidadSuscripcionesProducto
                       }

  console.log(this.bodyProducto);
}

// confirmar suscripcion o desuscripcion
confirmar() {
  this.modificarProductos(this.idProducto, this.bodyProducto);
  this.mostrarAlerta();
}

// Alerta global
mostrarAlerta() {
  setTimeout(() => {
    this.mostrarMjeGlobal = false;
  }, 5000);

  this.mostrarMjeGlobal = true;
}

}
