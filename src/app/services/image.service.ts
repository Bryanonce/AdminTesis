import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

//Enviroments
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private _http:HttpClient) { }

  uploadImage(fd:FormData,id:string){
    let headers = new HttpHeaders().set('token-request', localStorage.getItem('tokenIdSafeMap'));
    let url = `${environment.ApirestUpload}/${id}`;
    return this._http.put(url,fd,{headers})
  }

  actualizarDatos(id:string,body:{email:string,pass?:string,nombre:string}){
    let headers = new HttpHeaders().set('token-request', localStorage.getItem('tokenIdSafeMap'));
    let url = `${environment.ApirestUsers}/${id}`;
    return this._http.put(url,body,{headers})
  }

}
