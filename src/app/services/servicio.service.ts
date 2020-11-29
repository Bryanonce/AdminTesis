import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Consulta } from '../module/consulta.module';
import { MetodoPost } from '../module/post.module';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ServicioService {

  constructor(private http:HttpClient) { 
    
  }
  getApi(){
    return this.http.get(environment.Apirest);
  }
  getDatosJson(url:string,condiciones:Consulta){
    let argumento = `?anioIni=${condiciones.anioIni}&anioFin=${condiciones.anioFin}&mesIni=${condiciones.mesIni}&mesFin=${condiciones.mesFin}&diaIni=${condiciones.diaIni}&diaFin=${condiciones.diaFin}&horaIni=${condiciones.horaIni}&horaFin=${condiciones.horaFin}&minutoIni=${condiciones.minutoIni}&minutoFin=${condiciones.minutoFin}`;
  	return this.http.get(url+argumento)
  }
  postDatosJson(url:string,form:MetodoPost){
    return this.http.post(url,form) 
  }
  getDatosSimplex(url:string){
    return this.http.get(url);
  }
  postLogin(url:string,login:{email:string,pass:string}){
    return this.http.post(url,login)
  }


}
