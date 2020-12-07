import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

//Enviroments
import { environment } from '../environments/environment';

//Components
import { LoginComponent } from './components/login/login.component';

//Services
import { ServicioService } from './services/servicio.service';
import { AdminTokenService } from './services/admin-token.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  @ViewChild(LoginComponent) login: LoginComponent;
  
  title = 'Admin';
  public variable = false;

  constructor(
    private _servicio: ServicioService,
    private _admin:AdminTokenService
  ){
    if(localStorage.getItem('tokenIdSafeMap')){
      const token = localStorage.getItem('tokenIdSafeMap');
      const payload = this._admin.getJwtPayload(token);
      const fecha = new Date();
      const time = Math.round(fecha.getTime()/1000);
      console.log(time);
      console.log(payload.exp);
      if(time>=payload.exp){
        this.variable = false;
        localStorage.removeItem('tokenIdSafeMap');
        alert("Periodo Expirado, Ingrese de Nuevo");
      }else{
        this.variable = true;
        
      }
    }else{
      this.variable = false;
    }
    
  }

  ngOnInit(){
    
  } 

  verificarLogin(){
    let email = this.login.getCredentials()[0];
    let pass = this.login.getCredentials()[1];
    this._servicio.postLogin(environment.ApirestLogin,{email,pass})
    .subscribe((res:{ok:boolean,token:string}) =>{
      if(res.ok){
        this.variable = res.ok;
        localStorage.setItem('tokenIdSafeMap',res.token);
        
      }else{
        alert('Se ha detectado Usuario Intruso');
      }
    })
  }

  
}
