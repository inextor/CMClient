import { Component, OnInit } from '@angular/core';
import { RestService } from '../../services/rest.service';
import { Router, ActivatedRoute } from "@angular/router"
import { Proveedor, Factura, Venta, Usuario } from '../../models/Modelos';
import { BaseComponent } from '../base/base.component';
import { Location } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { forkJoin } from 'rxjs';
import { SearchObject } from 'src/app/models/Respuestas';

@Component({
  selector: 'app-agregar-factura',
  templateUrl: './agregar-factura.component.html',
  styleUrls: ['./agregar-factura.component.css']
})
export class AgregarFacturaComponent extends BaseComponent implements OnInit {

  constructor(public rest: RestService, public router: Router, public route: ActivatedRoute, public location: Location, public titleService: Title) {
    super(rest, router, route, location, titleService);
  }


  factura: Factura = {}
  venta: Venta = {}

  search_rfc: Usuario[] = [];
  usuario:Usuario;
  venta_search:SearchObject<Venta>;
  usuario_search:SearchObject<Usuario>;
  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      console.log("params",params);
      let id	= "id" in params ?params["id"]:null;
      console.log('busquedaid',id)
      if (id = null) {
        //SI NO EXISTE LA VENTA 

        // this.is_loading = true;
        //this.rest.getCentroMedico( id ).subscribe((centro_medico)=>
        // this.rest.venta.get( id ).subscribe((response)=>
        // {
        // 	this.is_loading = false;
        // 	this.venta = response;
        // },error=>this.showError(error));
      } else {
        this.is_loading = true;
        this.venta_search = {
          eq: {},
          gt: {},
          ge: {},
          le: {},
          lt: {},
          lk: {},
          csv: {},
        };
     
        this.venta_search.eq.id	= "id" in params ?params["id"]:null;
        //this.rest.getCentroMedico( id ).subscribe((centro_medico)=>
        console.log('elid',id);
        forkJoin([
          this.rest.venta.search(this.venta_search)
        ])
          .subscribe((responses) => {
            this.is_loading = false;
            this.venta = responses[0];
     
            console.log('laventa',this.venta);
            this.rest.paciente.get(this.venta.id_usuario_cliente).subscribe((response) => {
              this.is_loading = false;
              this.usuario = response;
              console.log('elusuario',this.usuario);
              this.selectRfc(response);
            }, error => this.showError(error));
          },(error) =>this.showError(error));

        // this.rest.venta.get( id ).subscribe((response)=>
        // {
        // 	this.is_loading = false;
        //   this.venta = response;

        // },error=>this.showError(error));
      }
    });
  }

  buscarRfc(evt: any) {
    console.log(evt);
    this.is_loading = true;
    if (evt == undefined || evt.target.value == '') {
      this.search_rfc = [];
      this.is_loading = false;
      return;
    }

    let x = this.rest.usuario.search({
      eq: { tipo: 'PACIENTE' }
      , start: { factura_rfc: evt.target.value }
      , limite: 5
    }).subscribe((response) => {
      this.is_loading = false;
      this.search_rfc = response.datos;
      //x.unsubscribe();
    }, (error) => this.is_loading = false);

  }

  selectRfc(usuario: Usuario) {
    this.venta.factura_rfc = usuario.factura_rfc;
    this.venta.factura_razon_social = usuario.factura_razon_social;
    this.venta.factura_codigo_postal = usuario.factura_codigo_postal;
    this.venta.factura_correo_electronico = usuario.factura_correo_electronico;
    this.venta.facturado = 'FACTURADO';
    this.search_rfc = [];
  }

  guardar() {
    this.is_loading = true;

    if (this.venta.id) {
      // SI YA EXISTE IMPRIMIREMOS LA FACTURA
      //this.rest.actualizarCentroMedico( this.centro_medico ).subscribe((centro_medico)=>{

        forkJoin([
          this.rest.venta.update(this.venta),
          this.rest.facturar.get(this.venta.id)

        ])
          .subscribe((responses) => {
            this.is_loading = false;
            this.venta = responses[0];
            console.log('facturar',responses[1]);
            }, error => this.showError(error));
    }
    else {
      //VAMOS A GENERAR LA FACTURA
      //this.rest.agregarCentroMedico( this.centro_medico ).subscribe((centro_medico)=>{
      this.rest.proveedor.create(this.venta).subscribe((proveedor) => {
        this.is_loading = false;
        this.router.navigate(['/proveedores']);
      }, error => this.showError(error));
    }
  }

}
