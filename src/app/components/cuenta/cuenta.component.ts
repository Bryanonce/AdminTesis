import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../environments/environment';

//Services
import { ServicioService } from '../../services/servicio.service';
import { ImageService } from '../../services/image.service';

@Component({
  selector: 'app-cuenta',
  templateUrl: './cuenta.component.html',
  styleUrls: ['./cuenta.component.scss']
})
export class CuentaComponent implements OnInit {
  @ViewChild('passBox') passBox: ElementRef;
  @ViewChild('emailBox') emailBox: ElementRef;
  @ViewChild('nombreBox') nombreBox: ElementRef;

  public usuario:{id:string,email:string,nombre:string,img:string} = {
    id: '',
    email: '',
    nombre: '',
    img: ''
  };
  public stringApi:String = environment.ApirestImagen;

  private fileSelected:File = undefined;

  constructor(private routeActive:ActivatedRoute,
              private _servicioService:ServicioService,
              private _imagenServer:ImageService
              ) {
    this.cargaInicial();
   }


  cargaInicial(){
    this.routeActive.params
    .subscribe((params:{id:string}) =>{
      this._servicioService.getDatosSimplesWithHeader(environment.ApirestUsers,String(params.id))
      .subscribe((usuarioDb:{ok:boolean,usuarios:[{_id:string,email:string,nombre:string,img:string}]})=>{
        this.usuario = {
          id: usuarioDb.usuarios[0]._id,
          email: usuarioDb.usuarios[0].email,
          nombre: usuarioDb.usuarios[0].nombre,
          img: usuarioDb.usuarios[0].img
        }
      })
    })
  }

  ngOnInit(): void {
   
  }

  ngAfterViewInit(){
  }
  
  onFileSelected(event){
    this.fileSelected = <File>event.target.files[0];
    console.log(this.fileSelected);
  }

  onUpload(){
    if(!this.fileSelected){
      this.actualizarData();
    }else{
      const fd:FormData = new FormData();
      fd.append('archivo',this.fileSelected,this.fileSelected.name);
      this._imagenServer.uploadImage(fd,this.usuario.id)
      .subscribe((resp:{ok:boolean,message:string})=>{
        alert(resp.message);
        this.actualizarData();
      })
    }
    
  }

  actualizarData(){
    if(this.passBox.nativeElement.value.trim() !== '' || (this.passBox.nativeElement.value.trim().length > 5)){
      this._imagenServer.actualizarDatos(this.usuario.id,{
        email: this.emailBox.nativeElement.value,
        pass: this.passBox.nativeElement.value,
        nombre: this.nombreBox.nativeElement.value
      }).subscribe((res)=>{
        console.log(res);
        this.cargaInicial();
      })
    }else{
      this._imagenServer.actualizarDatos(this.usuario.id,{
        email: this.emailBox.nativeElement.value,
        nombre: this.nombreBox.nativeElement.value
      }).subscribe((res)=>{
        console.log(res);
        this.cargaInicial();
        
      })
    }
    
  }
  
}
