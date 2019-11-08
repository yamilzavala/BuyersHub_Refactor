import { Component, OnInit } from '@angular/core';
import { ProductosService } from 'src/app/services/productos/productos.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detalle-producto',
  templateUrl: './detalle-producto.component.html',
  styleUrls: ['./detalle-producto.component.css']
})
export class DetalleProductoComponent implements OnInit {

  producto: any;
  imagen: any;

  idProducto: Number = null;
  bodyProducto: any;
  
  estaSuscripto: Boolean;
  mensaje: String;
  cantidadSuscripcionesProducto: number;
  
  mensajeGlobal: String;
  mostrarMjeGlobal: Boolean;
  
  constructor(public _productService: ProductosService, private _routeNav: ActivatedRoute) {

      this.cargarProducto();

   }

  ngOnInit() {
  }

  cargarProducto() {
    this._routeNav.params.subscribe( params => {
      console.log('parametros por url', params);
      // const id_entero = parseInt(params['id'], 0);
      this._productService.buscarProducto(params.id)
      // this._productService.buscarProducto('5dba42dba19fb11179353cf1')
              .subscribe( produto_res => {
                    console.log(produto_res);
                    this.producto = produto_res;
                    if (this.producto) {
                      this.validarImagen();
                    }
                  }
              );

});
  }

  validarImagen() {
    console.log(this.producto.imagen);
    if (this.producto.imagen === '') {
      this.imagen = 'assets/images/not-image.png';
    } else {
      this.imagen = `assets/images/products/${this.producto.imagen}.jpg`;
      console.log(this.imagen);
    }
  }

  modificarProductos(id, body){
    this._productService.editarProducto(id, body)
        .subscribe( (res: any) => {     
          this.cargarProducto();     
          this.mensajeGlobal = res.message;          
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
