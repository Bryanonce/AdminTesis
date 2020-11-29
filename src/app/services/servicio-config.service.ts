import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
    return this._http.post(environment.ApirestConfig,config)
  }

  actualizarData(id:string,config:ConfigureRest){
    return this._http.put(environment.ApirestConfig,{id,config})
  }

}
