export class UsuariosModule{
    constructor(
        public activo:boolean,
        public email:string,
        public google:boolean,
        public googleSin:boolean,
        public img:string,
        public nombre:string,
        public tipo:string,
        public _id:string
    ){

    }
}