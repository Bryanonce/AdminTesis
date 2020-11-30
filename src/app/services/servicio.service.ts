import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
  	return this.http.get(url+argumento);
  }
  postDatosJson(url:string,form:MetodoPost){
    return this.http.post(url,form);
  }
  getDatosSimplex(url:string){
    return this.http.get(url);
  }
  getDatosSimplesWithHeader(url:string,id?:string){
    if(id){
      url = `${url}?id=${id}`
    }
    let headers = new HttpHeaders().set('token-request', localStorage.getItem('tokenIdSafeMap'));
    return this.http.get(url,{headers});
  }
  postLogin(url:string,login:{email:string,pass:string}){
    return this.http.post(url,login);
  }
  postDelete(url:string,id:string){
    let headers = new HttpHeaders().set('token-request', localStorage.getItem('tokenIdSafeMap'));
    let uri = `${url}?id=${id}`
    return this.http.delete(uri,{headers})
  }


}
