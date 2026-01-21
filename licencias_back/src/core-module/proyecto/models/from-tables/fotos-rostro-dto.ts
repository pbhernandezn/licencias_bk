export class FotoRostroDto {
  id?: number;
  idsolicitud: number;
  urlFoto: string;
  nombreArchivo: string;
  contenedor: string;
  fechaSubida?: Date;
  activo?: boolean;
}

export class SubirFotoRostroRequest {
  idsolicitud: number;
  archivo: any;
}

export class ActualizarFotoRostroRequest {
  id: number;
  archivo: any;
}
