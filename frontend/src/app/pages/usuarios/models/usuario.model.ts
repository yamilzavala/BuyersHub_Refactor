export class UsuarioModel {
    constructor(
        public nombre: string,
        public apellido: string,
        public email: string,
        public password: string,
        public role: string,
        public imagen: string        
    ){ }
}