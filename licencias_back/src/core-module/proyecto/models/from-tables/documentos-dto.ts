import { Column } from "typeorm";

export class DocumentosDTO {
  id: number;
  idusuario: number;
  idsolicitud: number;
  creacion: string;
  idtipodocumento: number;
  formato: string;
  nombreoriginal: string;
  tamanio: number;
  validacionfecha: string;
  validacionusuario: number;
  validacioncomentarios: string;
  validacion: string;
  idestatus: number;

}