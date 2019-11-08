
import { NgModule } from '@angular/core';
import { PAGES_ROUTES } from './pages.routes';

import { SharedModule } from '../shared/shared.module';

import { FormsModule } from '@angular/forms';


// ng2-charts
import { ChartsModule } from 'ng2-charts';

import { PagesComponent } from './pages.component';


// import { ProgressComponent } from './progress/progress.component';
// import { Graficas1Component } from './graficas1/graficas1.component';


// temporal
import { IncrementadorComponent } from '../components/incrementador/incrementador.component';
//import { GraficoDonaComponent } from '../components/grafico-dona/grafico-dona.component';
import { AccoutSettingsComponent } from './accout-settings/accout-settings.component';
//import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { SuscripcionComponent } from './suscripcion/suscripcion.component';
import { ProductosComponent } from './productos/productos.component';
import { HomeComponent } from './home/home.component';
import { PerfilComponent } from './perfil/perfil.component';
import {CommonModule} from '@angular/common';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { MisSuscripcionesComponent } from './mis-suscripciones/mis-suscripciones.component';
import { DetalleProductoComponent } from './productos/detalle-producto/detalle-producto.component';
import { ModalComponent } from './modal/modal.component';
import { AddProductComponent } from './productos/add-product/add-product.component';
import { EditProductComponent } from './productos/edit-product/edit-product.component';



@NgModule({
    declarations: [
        PagesComponent,
        HomeComponent,
//        ProgressComponent,
//        Graficas1Component,
        IncrementadorComponent,
//        GraficoDonaComponent,
        AccoutSettingsComponent,
//        PromesasComponent,
        RxjsComponent,
        SuscripcionComponent,
        ProductosComponent,
        PerfilComponent,
        BusquedaComponent,
        MisSuscripcionesComponent,
        DetalleProductoComponent,
        ModalComponent,
        AddProductComponent,
        EditProductComponent
    ],
    exports: [
        HomeComponent
        // ProgressComponent,
        // Graficas1Component
    ],
    imports: [
        SharedModule,
        PAGES_ROUTES,
        FormsModule,
        CommonModule,
        ChartsModule
    ]
})
export class PagesModule { }
