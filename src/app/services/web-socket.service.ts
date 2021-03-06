import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
//import { Usuario } from '../classes/usuario';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  public estadoServer:Boolean =  false;
  //public usuario:Usuario;


  constructor(private socket: Socket) { 
    //this.revisarStatus();
  }

  revisarStatus(){
    this.socket.on('connect',()=>{
      console.log('Conectado al Servidor');
      this.emitirMsj('conectado',{token:localStorage.getItem('tokenIdSafeMap')});
      this.estadoServer = true;
    })
    this.socket.on('disconnect',()=>{
      console.log('Desconectado del Servidor');
      this.estadoServer = false;
    })
  }

  emitirMsj(event:string,payload?:any,callback?:Function){
    console.log('Emitiendo mensaje');
    //emit('event',payload,callback)
    this.socket.emit(event,payload,callback);
  }

  listendEvent(event:string){
    return this.socket.fromEvent(event)
  }

  loginWS(id:string){
    console.log('Configurando',id);
    this.socket.emit('conectado',{id},(resp)=>{
      console.log(resp);
    })
  }





}
