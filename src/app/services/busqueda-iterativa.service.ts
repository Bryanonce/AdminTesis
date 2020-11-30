import { Injectable } from '@angular/core';
import { UsuariosModule } from '../module/usuarios.module';

@Injectable({
  providedIn: 'root'
})
export class BusquedaIterativaService {

  constructor() { }

  busquedaUsuario(listaUsuarios:UsuariosModule[],texto:string){
    let listaUsuariosFiltro:UsuariosModule[] = [];
    
    texto = texto.toLowerCase();
    
    listaUsuarios.forEach((element,index)=>{
      if(element.nombre.toLowerCase().indexOf(texto)>=0){
        listaUsuariosFiltro.push(element);
        //console.log(index);
      }
    })
    return listaUsuariosFiltro
  }

}
