export class ParticipantesModel{
    nombre: string;
    correo: string;
    password: string;
    cantidad: number;
    habilitado: boolean;

    constructor(){
        this.habilitado = true;
        this.cantidad = 0;
    }
}