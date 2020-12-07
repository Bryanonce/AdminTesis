import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
//Services
import { AdminTokenService } from '../../services/admin-token.service';
import { WebSocketService } from '../../services/web-socket.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  usuario:string;
  id:string;
  constructor(private _adminToken:AdminTokenService,
              private router:Router,
              private _webSocket: WebSocketService
    ) { 
      this._webSocket.revisarStatus();
    }

  ngOnInit(): void {
    let token = localStorage.getItem('tokenIdSafeMap')
    this.usuario = (this._adminToken.getJwtPayload(token).usuarioDb.nombre);
    this.id = (this._adminToken.getJwtPayload(token).usuarioDb._id);

  }

  cerrarSession(){
    localStorage.removeItem('tokenIdSafeMap');
    location.reload();
  }

  miCuenta(){
    this.router.navigate(['/cuentas',this.id])
  }

}
