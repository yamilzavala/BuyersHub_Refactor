import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductoModel } from '../models/producto.model';
import { ProductosService } from 'src/app/services/productos/productos.service';
import { Route } from '@angular/router';
import swal from 'sweetalert';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  mensajeGlobal: String;
  mostrarMjeGlobal: Boolean;
  claseMensaje: string = 'alert alert-success fadeOut';
  
  productoModel: ProductoModel;
  
  producTemporal: any = {
    'nombre': '',
    'categoria' : '',
    'descripcion' :
     ''
  };

  

  

  constructor (private _productService: ProductosService) {
   this.productoModel = new ProductoModel(this.producTemporal);
//   this.product = new ProductoModel(null);
       }

  ngOnInit() {
  }

  guardarProducto(){
    this._productService.agregarProducto(this.productoModel).subscribe(
      (res: any) => {
          if (!res.productoGuardado) {
            //this.mensajeGlobal = 'Error en el server';
            swal("Actualizacion!", 'Error en el serve', "error");
          }else{
              this.mensajeGlobal = res.message; 
              this.productoModel = res.productoGuardado;
              swal("Informacion!", res.message, "success");
            //this._route.navigate(['/editar-prod'], res.product.id);
          }
          
      }, error => {
        console.log(error);
      }
  ); 
  }


  //ALERTA
    // Alerta global
    // mostrarAlerta() {
    //   setTimeout(() => {
    //     this.claseMensaje = "alert alert-success fadeIn";
    //     this.mostrarMjeGlobal = false;
    //   }, 5000);
  
    //   this.mostrarMjeGlobal = true;
    //   this.claseMensaje = "alert alert-success fadeIn";
    //   window.scroll(0, 0);
    // }

  //onSubmit(){
    //tomar los datos del formulario y crear un objeto producto       
    // prod = new Object();
    // let producto = new ProductoModel(1,'Nombre', );
    // console.log('Producto a guardar');
    // this._productService.addProduct(producto).subscribe(
    //     res => {
    //         if (!res.product) {
    //           this.alertMessage = 'Error en el server';
    //         }else{
    //             this.alertMessage = 'Error en el server'; 
    //           this.product = res.product;
    //           this._route.navigate(['/editar-prod'], res.product.id);
    //         }
            
    //     }, error => {
    //       console.log(error);
    //     }
    // );    
 // }

}
