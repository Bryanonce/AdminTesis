import { UsuariosModule } from './usuarios.module';

export class ConsultaUsuarios{
    constructor(
        public ok:boolean,
        public usuarios: UsuariosModule[]
    ){}
}