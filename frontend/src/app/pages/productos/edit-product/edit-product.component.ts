import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ProductosService } from 'src/app/services/productos/productos.service';
import { ActivatedRoute } from '@angular/router';
import { ProductoModel } from '../models/producto.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  @ViewChild('formProduct') formu: ElementRef;

  // mensajeGlobal: String;
  // mostrarMjeGlobal: Boolean;
  // claseMensaje: string = 'alert alert-success fadeOut';
  idProducto;

  productoModel: ProductoModel;
  
  producTemporal: any = {
    'nombre': '',
    'categoria' : '',
    'descripcion' :
     ''
  };

  constructor(
    private _productService: ProductosService, 
    private _routeNav: ActivatedRoute) {
    this.productoModel = new ProductoModel(this.producTemporal);
}

  ngOnInit() {
    this.cargarProducto();
  }

  cargarProducto() {
    this._routeNav.params.subscribe( params => {
      this.idProducto = params.id;
      this._productService.buscarProducto(params.id)      
              .subscribe( (produto_res:any) => {
                    this.productoModel = produto_res;                   
                  }
              );
    });
}

editarProducto(){

      let bodyProducto = { 
      nombre: this.productoModel.nombre,
      categoria: this.productoModel.categoria,
      descripcion: this.productoModel.descripcion
      }    

      this._productService.editarProducto(this.idProducto, bodyProducto).subscribe(
      (res: any) => {
          if (!res.productUpdated) {
            //this.mensajeGlobal = 'Error en el server';
            Swal.fire({
              icon: 'error',
              title: 'Actualizacion',
              text: res.message
            })
            //swal("Actualizacion!", res.message, "error");
          }else{
              this.productoModel = res.productUpdated;
              this.cargarProducto();
              Swal.fire({
                icon: 'success',
                title: res.message,
                showConfirmButton: false,
                timer: 1500
              });
             // swal("Actualizacion!", res.message, "success");
              //this.mostrarAlerta();
          }
          
      }, error => {
        console.log(error);
      }
      ); 
}



}
