import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../environments/environment';

//Services
import { ServicioService } from '../../services/servicio.service';

@Component({
  selector: 'app-cuenta',
  templateUrl: './cuenta.component.html',
  styleUrls: ['./cuenta.component.scss']
})
export class CuentaComponent implements OnInit {
  @ViewChild('emailBox') emailBox: ElementRef;
  @ViewChild('passBox') passBox: ElementRef;
  @ViewChild('nombreBox') nombreBox: ElementRef;
  @ViewChild('imgBox') imgBox: ElementRef;

  public usuario:{email:string,nombre:string,img:string} = {
    email: '',
    nombre: '',
    img: ''
  };

  constructor(private routeActive:ActivatedRoute,private _servicioService:ServicioService) {
    this.routeActive.params
    .subscribe((params:{id:string}) =>{
      this._servicioService.getDatosSimplesWithHeader(environment.ApirestUsers,String(params.id))
      .subscribe((usuarioDb:{ok:boolean,usuarios:[{email:string,nombre:string,img:string}]})=>{
        this.usuario = {
          email: usuarioDb.usuarios[0].email,
          nombre: usuarioDb.usuarios[0].nombre,
          img: usuarioDb.usuarios[0].img
        }
        //console.log(this.usuario)
      })
    })
   }

  ngOnInit(): void {
   
  }
  ngAfterViewInit(){

  }

}
