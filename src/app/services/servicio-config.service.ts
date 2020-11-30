import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

//Modules
import { ConfigureRest } from '../module/restConfig.module';

@Injectable({
  providedIn: 'root'
})
export class ServicioConfigService {

  constructor(private _http:HttpClient) { }

  consultarData(){
    return this._http.get(environment.ApirestConfig)
  }
  
  agregarData(config:ConfigureRest){
    let headers = new HttpHeaders().set('token-request', localStorage.getItem('tokenIdSafeMap'));
    return this._http.post(environment.ApirestConfig,config,{headers})
  }

  actualizarData(id:string,config:ConfigureRest){
    let headers = new HttpHeaders().set('token-request', localStorage.getItem('tokenIdSafeMap'));
    return this._http.put(environment.ApirestConfig,{id,config},{headers})
  }

}
