import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

//Services
import { ServicioConfigService } from '../../services/servicio-config.service';
import { ConfigureRest } from '../../module/restConfig.module';
import { ConfigResponse } from '../../module/restConfigGet.module'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  //public valor:any = 0;
  private config:ConfigureRest = new ConfigureRest();
  @ViewChild('slider') slider: ElementRef;
  @ViewChild('laticentro') laticentro: ElementRef;
  @ViewChild('longicentro') longicentro: ElementRef;
  @ViewChild('latimin') latimin: ElementRef;
  @ViewChild('latimax') latimax: ElementRef;
  @ViewChild('longimin') longimin: ElementRef;
  @ViewChild('longimax') longimax: ElementRef;
  public existeDato:boolean = false;
  public idConfig:string;
  //public rango:number = document.getElementById('customRange1').value;
  constructor(private _servicioConfig:ServicioConfigService,
    ) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(){
    this._servicioConfig.consultarData().subscribe((response:ConfigResponse)=>{
      if(!response.ok){
        return alert(response.message)
      }else if(response.existe){
        this.existeDato = true;
        this.idConfig = response.id;
        console.log(response);
        this.slider.nativeElement.value = response.config.escala;
        this.laticentro.nativeElement.value = response.config.latcentro;
        this.longicentro.nativeElement.value = response.config.longcentro;
        this.latimin.nativeElement.value = response.config.latini;
        this.latimax.nativeElement.value = response.config.latfin;
        this.longimin.nativeElement.value = response.config.longini;
        this.longimax.nativeElement.value = response.config.longfin;
      }
    })    
  }

  guardarData(){
    let config:ConfigureRest = new ConfigureRest(
      this.laticentro.nativeElement.value,
      this.longicentro.nativeElement.value,
      this.latimin.nativeElement.value,
      this.latimax.nativeElement.value,
      this.longimin.nativeElement.value,
      this.longimax.nativeElement.value,
      this.slider.nativeElement.value
    );
    if(this.existeDato){
      this._servicioConfig.actualizarData(this.idConfig,config).subscribe((resp:ConfigResponse)=>{
        confirm(resp.message);
      });
    }else{
      this._servicioConfig.agregarData(config).subscribe((resp:ConfigResponse)=>{
        confirm(resp.message);
      });
    }
  }

}
