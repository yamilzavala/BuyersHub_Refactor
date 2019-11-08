export class ProductoModel {
    _id?: string;    
    nombre: string;
    categoria: string;
    descripcion: string;
    imagen?: string;
    estaSuscripto?: boolean;
    cantidadSuscripciones?: string;

    constructor(res : any){   
        this._id = res._id;             
        this.nombre = res.nombre;
        this.categoria = res.categoria;
        this.descripcion = res.descripcion;
        this.imagen = res.imagen;
        this.estaSuscripto = res.estaSuscripto;
        this.cantidadSuscripciones = res.cantidadSuscripciones;
    }

}