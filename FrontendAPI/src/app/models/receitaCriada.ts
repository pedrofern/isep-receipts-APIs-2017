import { PrescricaoCriada } from "./prescricaoCriada";

export class ReceitaCriada {

    utente: string;
    medico: string;
    local: string;
    data: Date;
    prescricoes: [
        {prescricao: PrescricaoCriada}
    ]
}