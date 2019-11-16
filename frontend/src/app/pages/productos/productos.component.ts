import { Component, OnInit, ViewChild, ElementRef, HostListener, Inject } from '@angular/core';
import { ProductoModel } from './models/producto.model';
import { ProductosService } from 'src/app/services/productos/productos.service';
import { Router, ActivatedRoute, Route, Params } from '@angular/router';

import { DOCUMENT } from '@angular/platform-browser';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

  @ViewChild('alertaGlobal') myAlert: ElementRef;

  productos: any[] = [];

  infoServiceCargada = false;

  next_page;
  prev_page;
  desde: number = 0;
  totalRegistros: number = 0;
  cantidadSuscripcionesFlag = false;

  showModal: Boolean = false;
  
  porcentaje: Number = 50;
  idProducto: Number = null;
  bodyProducto: any;
  
  estaSuscripto: Boolean;
  mensaje: String;
  cantidadSuscripcionesProducto: number;
  
  
  mensajeGlobal: string;
  mostrarMjeGlobal: Boolean;
  claseMensaje: string = 'alert alert-success fadeOut';
  accion: number;
  

  constructor(
    public _productService: ProductosService, 
    private route: Router, 
    private _routeNav: ActivatedRoute, 
    @Inject(DOCUMENT) private document: Document)
     {
    
    // this.next_page = 1;
    // this.prev_page = 1;
   }

  ngOnInit() {
    this.obtenerProductos();
  }


  buscarProductoPorTermino(termino: string) {
      //console.log(termino);
      if (termino.length <= 0) {
        this.obtenerProductos();
          return;
      }
    
      this._productService.buscarPorTermino(termino)
              .subscribe( (resProductosFiltrados: any[]) => {                  
                  this.productos = resProductosFiltrados;                  
                  if (resProductosFiltrados.length === 0 ) {         
                    
                    Swal.fire({
                      icon: 'error',
                      title: 'Oops...',
                      text: 'No se encontraron resultados!'                      
                    })
                    
                   // swal("Error!", "No se encontraron resultados", "error");  
                    this.obtenerProductos();                 
                  } 

                    this.validarImagen();                    
                  
                  
                  
                  //console.log(resProductosFiltrados[0].imagen);
              });
      //this.route.navigate(['/busqueda', termino]);
  }


  obtenerProductos() {
      this._productService.getProductos(this.desde)
      .subscribe( (res: any) => {     
        this.totalRegistros = Number(this._productService.totalRegistros);
        this.productos = res;
        this.validarImagen();
        
      } );
  }

  validarImagen() {
    if (this.productos) {
      this.productos.forEach( productoActual => {
          if (productoActual.imagen === '' || productoActual.imagen === null) {
            productoActual.imagen = 'assets/images/not-image.png';
          } else {
            productoActual.imagen = `assets/images/products/${productoActual.imagen}.jpg`;
          }
      });
    }
  }

//ELIMINAR
  alertConfirmarEliminar(producto){
    this.mensaje = 'Confirma que desea Eliminar Producto?';
  }
 

  mostrarMjeEliminarConfirmar(producto){
    this.accion = 2;

    // swal({
    //   title: "Alerta!",
    //   text: "Confirma que desea borrar producto?",
    //   icon: "warning",
    //   buttons: true,
    //   dangerMode: true,
    // })
    // .then((willDelete) => {
    //   if (willDelete) {
    //     swal("El producto sera borrado!", {
    //       icon: "success",
    //     });
    //     this.confirmar();
    //   } else {
    //     swal("El producto no sera borrarado!");
    //   }
    // });

    
Swal.fire({
  title: 'Estas seguro?',
  text: "Confirma que desea eliminar el producto?",
  icon: 'warning',
  showCancelButton: true,
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  confirmButtonText: 'Si, Eliminar!',
  cancelButtonText: 'No, Cancelar'
}).then((result) => {
  if (result.value) {
    Swal.fire(
      'Eliminacion!',
      'El producto se ha eliminado correctamente',
      'success'
    )
    this.confirmar();
  }
})

    //this.mensaje = 'Confirma que desea Eliminar el producto?';
    this.idProducto = producto._id;
  }

  eliminarProductos(){     
    console.log('this.idProducto: ',this.idProducto);
      this._productService.borrarProducto(this.idProducto)
          .subscribe( res => {
            //this.mensajeGlobal = 'Producto eliminado correctamente';

            Swal.fire({              
              icon: 'success',
              title: 'Producto eliminado correctamente',
              showConfirmButton: false,
              timer: 1500
            });

            //swal("Informacion!", 'Producto eliminado correctamente', "success");
            console.log('Producto borrado correctamente: ', res);
            this.obtenerProductos();
          });
  }


//AGREGAR  
  agregarProducto_(producto){
    this._productService.agregarProducto(producto)
      .subscribe( res => {
        console.log('Producto agregado correctamente: ', res);
        this.obtenerProductos();
      });
  }

  //BUSCAR
  buscarProductos(id){
    this._productService.buscarProducto(id)
      .subscribe( res => {
        console.log('Producto buscado : ', res);
      });
  }

  //MODIFICAR
  modificarProductos(id, body){
    this._productService.editarProducto(id, body)
        .subscribe( (res: any) => {
          //this.mensajeGlobal = res.message;
          

          Swal.fire({            
            icon: 'success',
            title: res.message,
            showConfirmButton: false,
            timer: 1500
          });

          //swal("Informacion!", res.message, "success");
          this.obtenerProductos();
        });
  }


  idProductoActual(producto, suscripto) {
    this.accion = 1;
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

    // swal({
    //   title: "Alerta!",
    //   text: this.mensaje,
    //   icon: "warning",
    //   buttons: true,
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
      title: 'Esta seguro?',
      text: this.mensaje,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Confimar!',
      cancelButtonText: 'No, Cancelar'
    }).then((result) => {
      if (result.value) {
        Swal.fire(
          'Atencion!',
          'Accion realizadada correctamente',
          'success'
        )
        this.confirmar();
      }
    })
    


  }


  // confirmar suscripcion o desuscripcion (edicion) / eliminacion
  confirmar() {
    switch(this.accion){
      case 1:
        this.modificarProductos(this.idProducto, this.bodyProducto);
        this.mensaje = 'Edicion correcta';
        this.mostrarAlerta();
      break;
      case 2:
          this.eliminarProductos();
          this.mensaje = 'Eliminacion correcta';
          this.mostrarAlerta();
    }        
  }

  // Alerta global
  mostrarAlerta() {
    // setTimeout(() => {
    //   this.claseMensaje = "alert alert-success fadeIn";
    //   this.mostrarMjeGlobal = false;
    // }, 5000);

    // this.mostrarMjeGlobal = true;
    // this.claseMensaje = "alert alert-success fadeIn";
    // window.scroll(0, 0);
   
    Swal.fire({      
      icon: 'success',
      title: this.mensaje,
      showConfirmButton: false,
      timer: 1500
    });
   
    //swal("Informacion!", this.mensaje , "success");
  }

  //paginacion
  cambiarDesde(valor: number) {  
    
    let desdeLocal = this.desde + valor;

    console.log('desdeLocal ', desdeLocal);

    if (desdeLocal >= this.totalRegistros) {
      return;
    }

    if (desdeLocal < 0) {
      return;
    }

    this.desde += valor;
    this.obtenerProductos();
  }


}
