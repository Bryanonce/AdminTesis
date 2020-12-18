import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

//Servicios
import { ServicioService } from '../../services/servicio.service';
import { BusquedaIterativaService } from '../../services/busqueda-iterativa.service';
import { WebSocketService } from '../../services/web-socket.service';

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

  listaUsuarios: UsuariosModule[] = [];
  listaUsuariosFiltro: UsuariosModule[] = [];
  public stringApi: String = environment.ApirestImagen;

  constructor(private _servicioService: ServicioService,
    private _busqueda: BusquedaIterativaService,
    private router: Router,
    private _webSocket: WebSocketService
  ) 
  {
    this.primeraCarga()
    .then(()=>{
      this._webSocket.listendEvent('userOnline')
      .subscribe((resp:{id:string,online:boolean})=>{
        let indice:number = 0;
        for(let usuario of this.listaUsuarios){
          indice++;
          if(usuario._id === resp.id){
            break;
          }
        }
        this.listaUsuariosFiltro[indice-1].activo = resp.online;
      })
    })
  }

  ngOnInit(): void {

  }

  primeraCarga() {
    let promesa = new Promise((resolve,reject)=>{
      this.listaUsuarios = [];
      this.listaUsuariosFiltro = [];
      this._servicioService.getDatosSimplesWithHeader(environment.ApirestUsers)
        .subscribe((res: ConsultaUsuarios) => {
          res.usuarios.forEach((elemento) => {
            this.listaUsuarios.push(elemento);
          })
          this.listaUsuariosFiltro = this.listaUsuarios;
          resolve(true)
        })
    })
    return promesa
  }

  buscarUsuario() {
    let texto = this.entrada.nativeElement.value

    this.listaUsuariosFiltro = this._busqueda.busquedaUsuario(this.listaUsuarios, texto)
    //console.log(texto)
  }

  eliminarUsuario(id: string) {
    let confirma = confirm('Esta seguro de que desea eliminar al usuario?')
    if (confirma) {
      this._servicioService.postDelete(environment.ApirestUsers, id)
        .subscribe((response: { ok: boolean, message: string }) => {
          alert(response.message);
          this.primeraCarga();
        })
    }
  }

  editarUsuario(id: string) {
    this.router.navigate(['/cuentas', id])
  }

  localizarUsuario(id:string){
    this.router.navigate(['/mapa', id])
  }

}
