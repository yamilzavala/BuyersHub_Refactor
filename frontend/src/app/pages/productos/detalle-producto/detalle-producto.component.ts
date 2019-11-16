import { Component, OnInit } from '@angular/core';
import { ProductosService } from 'src/app/services/productos/productos.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import axios from 'axios';

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
      this.mensaje = 'Se desuscribira al producto!';
      this.cantidadSuscripcionesProducto -= 10;

    } else {
      this.estaSuscripto = false;
      this.mensaje = 'Se suscribira al producto!';
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

    // Swal({
    //   title: "Alerta!",
    //   text: this.mensaje,
    //   icon: "warning",
    //   buttons: ButtonList,
    //   dangerMode: true,
    // })
    // .then((willDelete) => {
    //   if (willDelete) {
    //     swal("Se suscribira al producto seleccionado!", {
    //       icon: "success",
    //     });
    //     this.confirmar();
    //   } else {
    //     swal("Accion cancelada!");
    //   }
    // });


Swal.fire({
  title: 'Estas seguro?',
  text: "Se suscribira al producto seleccionado!",
  icon: 'warning',
  showCancelButton: true,
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  confirmButtonText: 'Si, Suscribirme!',
  cancelButtonText: 'No, Cancelar'
}).then((result) => {
  if (result.value) {
    Swal.fire(
      'Suscripto!',
      'Su suscripcion se ha realizado correctamente',
      'success'
    )
    this.confirmar();
  }
})



  }

  // confirmar suscripcion o desuscripcion
  confirmar() {
    this.modificarProductos(this.idProducto, this.bodyProducto);    
    this.mostrarAlerta();
  }

  // Alerta global
  mostrarAlerta() {
    // setTimeout(() => {
    //   this.mostrarMjeGlobal = false;
    // }, 5000);

    // this.mostrarMjeGlobal = true;
    if (!this.estaSuscripto) {
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Suscripcion exitosa',
        showConfirmButton: false,
        timer: 1500
      })
      //swal("Informacion!", "Suscripcion exitosa" , "success");
    }

    if (this.estaSuscripto) {
      if (!this.estaSuscripto) {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Desuscripcion exitosa',
          showConfirmButton: false,
          timer: 1500
        });
     // swal("Informacion!", "Desuscripcion exitosa" , "success");
    }
    
  }

}

}
