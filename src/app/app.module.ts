import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FooterComponent } from './components/footer/footer.component';

import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './components/header/header.component';
import { MapaComponent } from './components/mapa/mapa.component';


//Services
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './components/home/home.component';

//Socket
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import {environment} from '../environments/environment';
import { CuentasComponent } from './components/cuentas/cuentas.component';
import { CuentaComponent } from './components/cuenta/cuenta.component';
import { LocalizarComponent } from './components/localizar/localizar.component';

const config: SocketIoConfig = { 
  url: environment.wsurl, options: {} 
};

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    FooterComponent,
    HeaderComponent,
    MapaComponent,
    HomeComponent,
    CuentasComponent,
    CuentaComponent,
    LocalizarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    SocketIoModule.forRoot(config)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
