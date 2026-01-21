export class FotoRostroDto {
  id: number;
  idsolicitud: number;
  urlFoto: string;
  nombreArchivo: string;
  contenedor: string;
  fechaSubida: Date;
  activo: boolean;
}

export class SubirFotoRostroRequest {
  idsolicitud: number;
  archivoBase64: string;
  nombreoriginal: string;
  formato: string;
}

export class ActualizarFotoRostroRequest {
  idsolicitud: number;
  archivoBase64: string;
  nombreoriginal: string;
  formato: string;
}
