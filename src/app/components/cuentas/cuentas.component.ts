import { Component, OnInit } from '@angular/core';


//Servicios
import { ServicioService } from '../../services/servicio.service';


//Enviroment
import { environment } from '../../../environments/environment';


//Modules
import { ConsultaUsuarios } from '../../module/consultaUsuarios.module';
import { UsuariosModule } from '../../module/usuarios.module';

@Component({
  selector: 'app-cuentas',
  templateUrl: './cuentas.component.html',
  styleUrls: ['./cuentas.component.scss']
})
export class CuentasComponent implements OnInit {
  listaUsuarios:UsuariosModule[] = [];
  
  constructor(private _servicioService:ServicioService) { 
    this._servicioService.getDatosSimplex(environment.ApirestUsers)
    .subscribe((res:ConsultaUsuarios)=>{
      res.usuarios.forEach((elemento)=>{
        this.listaUsuarios.push(elemento);
      })
    })
  }

  ngOnInit(): void {
    
  }

}
