import { Injectable } from '@angular/core';
import { ProductoModel } from 'src/app/pages/productos/models/producto.model';
import { HttpClient } from '@angular/common/http';
import {Headers} from '@angular/http';
import { Observable } from 'rxjs';
import {map, switchAll} from 'rxjs/operators';
import { URL_SERVICIOS } from 'src/app/config/config';
import { pipe } from '@angular/core/src/render3/pipe';


@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  totalRegistros: Number;
  productos: any [] = [];
  infoDelServicioCargada = false;
  url = URL_SERVICIOS;

  constructor(private _http: HttpClient) {
    this.getProductos();
   }

 getProductos( desde: number = 0) {
    // return this._http.get('assets/data/productos.json')
    return this._http.get( this.url + '/api/products/getProductos?desde=' + desde )
    .pipe(
        map( (objetoProductoContenedor: any) => {
          console.log(objetoProductoContenedor);
              this.totalRegistros = objetoProductoContenedor.total;
              return objetoProductoContenedor.productos
              .map(arrayDeProductos =>  {
                return new ProductoModel(arrayDeProductos)})}
        )
      );
  }

  borrarProducto(idProducto) {
    return this._http.delete( this.url + '/api/products/deleteProduct/' + idProducto )
    .pipe(
          map(res_productoEliminado =>  {
                console.log('Producto elimindado: ', res_productoEliminado);
                return res_productoEliminado;
                // if (res_productoEliminado) {
                //   this.getProductos();
                // }
          })
        );
  }

  editarProducto(idProducto, body) {
    return this._http.put( this.url + '/api/products/updateProduct/' + idProducto, body )
    .pipe(
          map(res_productoModificado =>  {
                console.log('Producto modificado: ', res_productoModificado);
                if (res_productoModificado) {
                 // this.getProductos();
                  return res_productoModificado;
                }
          })
        );
  }


  agregarProducto(producto: ProductoModel) {
    return this._http.post( this.url + '/api/products/saveProduct/', producto )
    .pipe(
          map(res_productoAgregado =>  {
                console.log('Producto agregado: ', res_productoAgregado);
                return res_productoAgregado;
                // if (res_productoAgregado) {
                //   this.getProductos();
                // }
          })
        );
  }

  buscarProducto(idProducto) {
    return this._http.get( this.url + '/api/products/getProductById/' + idProducto )
    .pipe(
          map(res_producto =>  {
                console.log('Producto obtenido por id: ', res_producto);
                if (res_producto) {
                  this.getProductos();
                  return res_producto;
                }
          })
        );
  }

  buscarPorTermino(termino){
      return this._http.get( this.url + '/api/products/getProductoByTermino/' + termino)
       .pipe(   
           map( (res: any) => res.productosFiltrados)
           );
  }

  // addProduct(product: ProductoModel){
  //    let params = JSON.stringify(product);
  //    let headers = new Headers({
  //      'Content-Type': 'application/json'
  //      //,'Autorization': token
  //    });
  //    return this._http.post(this.url+'/api/products/saveProduct',params)
  //          .pipe(
  //             map( res => { res })
  //          )
                             
  // }

}
