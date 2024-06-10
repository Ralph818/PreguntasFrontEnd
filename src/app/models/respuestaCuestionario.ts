import { RespuestaCuestionarioDetalle } from "./respuestaCuestionarioDetalle";

export class RespuestaCuestionario {
    id?: number;
    cuestionarioId: number;
    nombreParticipante: string;
    fecha: Date;
    listRtaCuestionarioDetalle: RespuestaCuestionarioDetalle[];
}