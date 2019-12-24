import { Component, OnInit } from '@angular/core';
import { RestService } from '../../services/rest.service';
import { Usuario, Doctor, Centro_Medico, Proveedor } from '../../models/Modelos';
import { Router, ActivatedRoute } from "@angular/router"
import { BaseComponent } from '../base/base.component';
import { Location } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { SearchObject } from 'src/app/models/Respuestas';

@Component({
  selector: 'app-proveedores',
  templateUrl: './proveedores.component.html',
  styleUrls: ['./proveedores.component.css']
})
export class ProveedoresComponent extends BaseComponent implements OnInit {

  constructor(public rest: RestService, public router: Router, public route: ActivatedRoute, public location: Location, public titleService: Title) {
    super(rest, router, route, location, titleService);
  }

  proveedores: Proveedor[] = [];
  proveedor_search:SearchObject<Proveedor>;
  ngOnInit() {
    this.titleService.setTitle('Proveedores');
    let usuario = this.rest.getUsuarioSesion();
    this.is_loading = true;
    this.route.queryParams.subscribe(params => {
          this.proveedor_search = {
            eq: {},
            gt: {},
            ge: {},
            le: {},
            lt: {},
            lk: {},
            csv: {},
          };
          this.proveedor_search.lk.nombre	= "lk.nombre" in params ?params["lk.nombre"]:null;
          this.proveedor_search.limite			= this.pageSize;
          this.proveedor_search.pagina			= 'pagina' in params ? parseInt( params.pagina ):0;
          // this.currentPage = params['pagina'] == null ? 0 : parseInt(params['pagina'] );
          this.is_loading = true;
      this.rest.proveedor.search(this.proveedor_search).subscribe((respuesta) => {
        
        this.proveedores = respuesta.datos;
        this.setPages( this.proveedor_search.pagina, respuesta.total );
        this.is_loading = false;
      }, (error) => this.showError);

    });
  }
  changeSearch(nombre:string)
	{
	}
  search()
	{
		this.is_loading = true;
		this.proveedor_search.pagina = 0;
        let search = {};
        let array = ['eq','le','lt','ge','gt','csv','lk'];
        for(let i in this.proveedor_search )
        {
            console.log( 'i',i,array.indexOf( i ) );
            if(array.indexOf( i ) > -1 )
            {
                for(let j in this.proveedor_search[i])
                    search[i+'.'+j] = this.proveedor_search[i][j];
            }
        }

		console.log('search',this.proveedor_search );
		console.log('Busqueda', search );
		this.router.navigate(['proveedores'],{queryParams: search});
	}
  
}
