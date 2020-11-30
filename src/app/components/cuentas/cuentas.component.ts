import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

//Servicios
import { ServicioService } from '../../services/servicio.service';
import { BusquedaIterativaService } from '../../services/busqueda-iterativa.service';


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
  @ViewChild('entrada') entrada: ElementRef;

  listaUsuarios:UsuariosModule[] = [];
  listaUsuariosFiltro:UsuariosModule[] = [];
  
  constructor(private _servicioService:ServicioService,
              private _busqueda:BusquedaIterativaService,
              private router:Router
    ) { 
    this.primeraCarga();
  }

  ngOnInit(): void {
    
  }

  primeraCarga(){
    this.listaUsuarios = [];
    this.listaUsuariosFiltro = [];
    this._servicioService.getDatosSimplesWithHeader(environment.ApirestUsers)
    .subscribe((res:ConsultaUsuarios)=>{
      res.usuarios.forEach((elemento)=>{
        this.listaUsuarios.push(elemento);
      })
      this.listaUsuariosFiltro = this.listaUsuarios;
    })
  }

  buscarUsuario(){
    let texto = this.entrada.nativeElement.value

    this.listaUsuariosFiltro = this._busqueda.busquedaUsuario(this.listaUsuarios,texto)
    //console.log(texto)
  }

  eliminarUsuario(id:string){
    let confirma = confirm('Esta seguro de que desea eliminar al usuario?')
    if(confirma){
      this._servicioService.postDelete(environment.ApirestUsers,id)
      .subscribe((response:{ok:boolean,message:string})=>{
        alert(response.message);
        this.primeraCarga();
      })
    }
  }

  editarUsuario(id:string){
    this.router.navigate(['/cuentas',id])
  }
}
