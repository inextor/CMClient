import { Component, OnInit } from '@angular/core';
import { RestService, DatosVenta } from '../../services/rest.service';
import { Usuario, Gasto_Centro_Medico, Tipo_Gasto, Pago_Poliza, Paciente, Tipo_Precio, Centro_Medico, Poliza, Servicio, Precio_Servicio, Factura } from '../../models/Modelos';
import { Router, ActivatedRoute } from "@angular/router"
import { forkJoin, of } from 'rxjs';
import { BaseComponent } from '../../pages/base/base.component';
import { SearchGastoCentroMedicoResponse, SearchObject } from '../../models/Respuestas';
import { Location } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { flatMap } from 'rxjs/operators';
import * as moment from 'moment';
import * as fileSaver from 'file-saver';


@Component({
  selector: 'app-facturas',
  templateUrl: './facturas.component.html',
  styleUrls: ['./facturas.component.css']
})
export class FacturasComponent extends BaseComponent implements OnInit {

  constructor(public rest: RestService, public router: Router, public route: ActivatedRoute, public location: Location, public titleService: Title) {
    //import { Title } from '@angular/platform-browser';
    super(rest, router, route, location, titleService);
  }

  facturas: Factura[] = [];
  factura_search: SearchObject<Factura>;
  usuarios: Usuario[] = [];
  usuarios_dic: any = {};
  ngOnInit() {
    this.titleService.setTitle('Facturas')
    let usuario = this.rest.getUsuarioSesion();
    this.is_loading = true;
    this.route.queryParams.subscribe(params => {
      this.factura_search = {
        eq: {},
        gt: {},
        ge: {},
        le: {},
        lt: {},
        lk: {},
        csv: {},
      };
      let rjoinObj: any = {};
      let fjarray = [];
      this.factura_search.eq.id_cliente = "id_cliente" in params ? params["id_cliente"] : null;
      this.factura_search.eq.noFactura = "noFactura" in params ? params["noFactura"] : null;
      this.factura_search.pagina = 'pagina' in params ? parseInt(params.pagina) : 0;
      this.factura_search.limite = this.pageSize;
      this.currentPage = this.factura_search.pagina;
      console.log('factura search',this.factura_search);
      forkJoin(
        [
          this.rest.factura.search(this.factura_search),
          this.rest.usuario.getAll({})
        ]
      ).subscribe(
        (response: any[]) => {
          this.facturas = response[0].datos;
          this.usuarios = response[1].datos;
          this.usuarios.forEach(i => this.usuarios_dic[i.id] = i);

          this.setPages(this.factura_search.pagina, response[0].total);
          this.is_loading = false;
        }
        , (error) => {
          this.showError(error);
          this.is_loading = false;
        }
      );
    });
  }


  // downloadfile(factura) {
  //   this.rest.downloadFile(factura).subscribe(response => {
	// 		let blob:any = new Blob([response.blob()], { type: 'text/pdf; charset=utf-8' });
	// 		const url= window.URL.createObjectURL(blob);
	// 		window.open(url);
	// 		window.location.href = response.url;
	// 		fileSaver.saveAs(blob, 'employees.json');
	// 	}), error => console.log('Error downloading the file'),
  //                () => console.info('File downloaded successfully');
  // }

  downloadfile(factura_path){
    let urlBase = 'http://127.0.0.1/CentroMedico/files';
    // let blob:any = new Blob(factura.pdf_path, { type: 'text/pdf; charset=utf-8' });
    // const url= window.URL.createObjectURL(blob);
    // console.log('asd',`${urlBase}/${factura.pdf_path}`)
    window.open(`${urlBase}/${factura_path}`);
    // window.location.href = `${urlBase}/${factura.pdf_path}`;

  }

}
