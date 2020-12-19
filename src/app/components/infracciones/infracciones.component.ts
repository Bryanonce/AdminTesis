import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


import { Router } from '@angular/router';

import { environment } from '../../../environments/environment';


//Servicios
import { ServicioService } from '../../services/servicio.service';

@Component({
  selector: 'app-infracciones',
  templateUrl: './infracciones.component.html',
  styleUrls: ['./infracciones.component.scss']
})
export class InfraccionesComponent implements OnInit {
  public notify:{lat:Number,long:Number,fecha:string}[] = [];
  public usuario:{nombre:string,email:string} = {
    nombre: '',
    email: ''
  }
  constructor(private _serviceService: ServicioService,
    private routeActive: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.routeActive.params
      .subscribe((params: { id: string }) => {
        this._serviceService.getDatosSimplesWithHeader(environment.ApirestNoti,params.id)
          .subscribe((res:{ok:boolean,notify:{lat:Number,long:Number,fecha:string}[],usuario:{nombre:string,email:string}}) => {
            if(res.ok){
              this.notify = res.notify;
              this.usuario = res.usuario
            }
            
          })
      })

  }

  localizarNotify(id:string,lat:number,long:number){
    this.router.navigate(['/mapa', id,lat,long])
  }

}
