import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminTokenService {

  constructor() { }

  getJwtPayload(token:string):{exp:number,iat:number,usuarioDb:any}{
    var base64Url = token.split('.')[1];
      var base64 = base64Url.replace('-', '+').replace('_', '/');
      return JSON.parse(window.atob(base64));
  }

}
