import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';


//Servicios
import { WebSocketService } from '../../services/web-socket.service';
import { ServicioService } from '../../services/servicio.service';
import * as mapboxgl from 'mapbox-gl';
import { Lugar } from '../../models/interfaces';


//Modulos
import { Consulta } from '../../module/consulta.module';

//Env
import { environment } from '../../../environments/environment';
@Component({
  selector: 'app-localizar',
  templateUrl: './localizar.component.html',
  styleUrls: ['./localizar.component.scss']
})
export class LocalizarComponent implements OnInit {
  public usuarioNotFound:boolean = false;
  lugares:Lugar[] = [];
  mapa: mapboxgl.Map;
  markersMapbox: {_id:string, mark: mapboxgl.Marker}[] = []

  constructor(public _webSocket:WebSocketService, 
    public _servicioServ:ServicioService,
    private _servicioService:ServicioService,
    private routeActive:ActivatedRoute
    ) 
  {
    this.routeActive.params
    .subscribe((params:{id:string}) =>{
      this._servicioService.getDatosSimplesWithHeader(environment.ApirestUlti,params.id)
      .subscribe((res:{ok:boolean,datos:Lugar})=>{
        //console.log(res.datos)
        if(res.datos){
          this.lugares.push(res.datos);
          this.usuarioNotFound = false;
          return this.primerCarga();
        }else{
          this.usuarioNotFound = true;
        }          
      })
    })
  }


  primerCarga(){
    console.log(this.lugares)
    this.crearMapa();
  }

  ngAfterViewInit(){
    //this.crearMapa();
    
  }

  ngOnInit(){
    
  }

  crearMapa(){
    (mapboxgl as any).accessToken = 'pk.eyJ1IjoiYnJ5YW5vbmNlIiwiYSI6ImNrZ3dlMjdtNjA5YTMyeXA2cWNwbHF4YXEifQ.oBbGH3SNhdrk6V7ui4eypQ';
    this.mapa = new mapboxgl.Map({
      container: 'mapa-box',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [this.lugares[0].long, this.lugares[0].lat],
      zoom: 15.8
    });

    for(const marcador of this.lugares){
      this.agregarMarcador(marcador);
    }

    this.markersMapbox.forEach((element)=>{
      element.mark.addTo(this.mapa);
    })
  }


  agregarMarcador(marcador:Lugar){
    const h2 = document.createElement('h2');
    h2.innerText = marcador.nombre;
    
    const img = document.createElement('img');
    if(marcador.img.indexOf('https://lh5.googleusercontent.com')<0){
      img.src = environment.ApirestImagen + marcador.img;
    }else{
      img.src = marcador.img;
    }
    
    const h5_1 = document.createElement('h5');
    h5_1.innerText = 'Fecha: ' + String(marcador.fecha).slice(0,10);

    const h5_2 = document.createElement('h5');
    h5_2.innerText = 'Hora: ' + String(marcador.fecha).slice(11,16);
    
    const div = document.createElement('div');
    div.append(h2,h5_1,h5_2,img);

    const customPopup = new mapboxgl.Popup({
      offset: 25,
      closeOnClick: false
    }).setDOMContent(div);
    const marker = new mapboxgl.Marker({
      draggable: false,
      color: marcador.color
    })
    .setLngLat([marcador.long,marcador.lat])
    .setPopup(customPopup);
    this.markersMapbox.push({_id:marcador._id,mark:marker})
  }
}
