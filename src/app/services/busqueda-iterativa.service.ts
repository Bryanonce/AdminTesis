import { Injectable } from '@angular/core';
import { UsuariosModule } from '../module/usuarios.module';

@Injectable({
  providedIn: 'root'
})
export class BusquedaIterativaService {

  constructor() { }

  busquedaUsuario(listaUsuarios:UsuariosModule[],texto:string,id?:boolean){
    let listaUsuariosFiltro:UsuariosModule[] = [];
    
    texto = texto.toLowerCase();
    
    listaUsuarios.forEach((element,index)=>{
      if(id){
        if(element._id.toLowerCase().indexOf(texto)>=0){
          listaUsuariosFiltro.push(element);
          //console.log(index);
        }
      }else{
        if(element.nombre.toLowerCase().indexOf(texto)>=0){
          listaUsuariosFiltro.push(element);
          //console.log(index);
        }
      }
    })
    return listaUsuariosFiltro
  }

}
