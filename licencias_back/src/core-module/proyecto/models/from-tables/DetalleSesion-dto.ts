import { ApiProperty } from '@nestjs/swagger';

export class getdetSeByIdDTO {
  existe: boolean;
  catUsuario?: CatdetSeDataDTO;
}

export class CatdetSeDataDTO {
  id: number;
  idUsuario: number;
  fechaInicio: Date;
  fechaFin?: Date;
  ip: string;
  exitoso: boolean;
  token: string;
  idStatus: number;
  comentarios?: string;
}

export class DetalleSesionDTO {
  id: number;

  idUsuario: number;

  fechaInicio: Date;

  fechaFin?: Date;

  ip: string;

  exitoso: boolean;

  token: string;

  idStatus: number;

  comentarios?: string;
}

export class createDetalleSesionReq {
  id?: number;
  @ApiProperty({ description: 'identificado', example: -1 })
  idUsuario: number;

  @ApiProperty({
    description: 'Fecha y hora de inicio de la sesión',
    example: '2026-01-07T14:30:00.000Z',
    type: String,
    format: 'date-time',
  })
  fechaInicio: Date;

  @ApiProperty({
    description: 'Fecha y hora del fin de la sesión',
    example: '2026-01-07T14:30:00.000Z',
    type: String,
    format: 'date-time',
  })
  fechaFin?: Date;

  @ApiProperty({ description: 'ip del cliente', example: '127.0.0.1' })
  ip: string;

  @ApiProperty({ description: 'se realizo con exito', example: 'true' })
  exitoso: boolean;

  @ApiProperty({
    description: 'obtiene el jwt',
    example: 'vkAFefvoIUPFuxQSve.9dru2zfSj69xjzSuF9GykLEw',
  })
  token: string;

  @ApiProperty({ description: 'identificador de status', example: 1 })
  idStatus: number;

  @ApiProperty({
    description: 'una nota para ver que paso',
    example: 'en algun lugar de la macha don quijote esta ........',
  })
  comentarios?: string;
}

export class DetalleSesionDataResponse {
  @ApiProperty({ description: 'identificado', example: -1 })
  idUsuario: number;

  @ApiProperty({
    description: 'Fecha y hora de inicio de la sesión',
    example: '2026-01-07T14:30:00.000Z',
    type: String,
    format: 'date-time',
  })
  fechaInicio: Date;

  @ApiProperty({
    description: 'Fecha y hora del fin de la sesión',
    example: '2026-01-07T14:30:00.000Z',
    type: String,
    format: 'date-time',
  })
  fechaFin?: Date;

  @ApiProperty({ description: 'ip del cliente', example: '127.0.0.1' })
  ip: string;

  @ApiProperty({ description: 'se realizo con exito', example: 'true' })
  exitoso: boolean;

  @ApiProperty({
    description: 'obtiene el jwt',
    example: 'vkAFefvoIUPFuxQSve.9dru2zfSj69xjzSuF9GykLEw',
  })
  token: string;

  @ApiProperty({ description: 'identificador de status', example: 1 })
  idStatus: number;

  @ApiProperty({
    description: 'una nota para ver que paso',
    example: 'en algun lugar de la macha don quijote esta ........',
  })
  comentarios?: string;
}

export class createDetalleSesionDTO {
  @ApiProperty({
    description: 'Indica si el usuario pudo ser dado de alta.',
    example: true,
  })
  creado: boolean;
  @ApiProperty({ description: 'Detalle de errores' })
  errores?: DetalleSesionDataResponse;
}
