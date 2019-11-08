import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ProductosService } from 'src/app/services/productos/productos.service';
import { ActivatedRoute } from '@angular/router';
import { ProductoModel } from '../models/producto.model';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  @ViewChild('formProduct') formu: ElementRef;

  mensajeGlobal: String;
  mostrarMjeGlobal: Boolean;
  claseMensaje: string = 'alert alert-success fadeOut';
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
            this.mensajeGlobal = 'Error en el server';
          }else{
              this.mensajeGlobal = res.message; 
              console.log('-----------------------------', res.message);
              this.productoModel = res.productUpdated;
              this.cargarProducto();
              this.mostrarAlerta();
          }
          
      }, error => {
        console.log(error);
      }
      ); 
}


//ALERTA    
mostrarAlerta() {
setTimeout(() => {
  this.claseMensaje = "alert alert-success fadeIn";
  this.mostrarMjeGlobal = false;
}, 5000);

this.mostrarMjeGlobal = true;
this.claseMensaje = "alert alert-success fadeIn";
window.scroll(0, 0);
}

}
