import { Component, OnInit } from '@angular/core';

import { environment } from '../../../environments/environment';


//Servicios
import { ServicioService } from '../../services/servicio.service';

@Component({
  selector: 'app-infracciones',
  templateUrl: './infracciones.component.html',
  styleUrls: ['./infracciones.component.scss']
})
export class InfraccionesComponent implements OnInit {

  constructor(private _serviceService:ServicioService) { }

  ngOnInit(): void {
    this._serviceService.getDatosSimplesWithHeader(environment.ApirestNoti)
    .subscribe((res)=>{
      console.log(res);
    })
  }

}
