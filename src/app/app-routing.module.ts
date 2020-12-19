import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//Components
import { MapaComponent } from './components/mapa/mapa.component';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CuentasComponent } from './components/cuentas/cuentas.component';
import { CuentaComponent } from './components/cuenta/cuenta.component';
import { LocalizarComponent } from './components/localizar/localizar.component';
import { InfraccionesComponent } from './components/infracciones/infracciones.component';


const routes: Routes = [
  {path: 'mapa',component: MapaComponent},
  {path: 'dash',component: DashboardComponent},
  {path: 'cuentas',component: CuentasComponent},
  {path: 'infra/:id',component: InfraccionesComponent},
  {path: 'cuentas/:id',component: CuentaComponent},
  {path: 'mapa/:id',component: LocalizarComponent},
  {path: 'mapa/:id/:lat/:long',component: LocalizarComponent},
  {path: '**',component:HomeComponent},
  {path: '',component: HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
