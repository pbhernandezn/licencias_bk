import { ApiProperty } from '@nestjs/swagger';

export class getDashboardTramiteReq {
  @ApiProperty({ example: '2026-01-01', description: 'Fecha de inicio (aaaa-mm-dd)' })
  FechaInicio: string;

  @ApiProperty({ example: '2026-01-31', description: 'Fecha de fin (aaaa-mm-dd)' })
  FechaFin: string;
}

export class TipoLicencia {
  @ApiProperty({ description: 'Cantidad de trámites de este tipo' })
  cantidad: number;

  @ApiProperty({ description: 'Nombre del tipo de licencia' })
  nombre: string;

  @ApiProperty({ description: 'Porcentaje respecto al total del municipio' })
  porcentaje: number;
}

export class DesgloseMunicipio {
  @ApiProperty({ description: 'Nombre del municipio' })
  municipio: string;

  @ApiProperty({ description: 'Total de licencias en este municipio' })
  licenciaTotal: number;

  @ApiProperty({ description: 'Desglose por tipo de licencia', type: [TipoLicencia] })
  tipos: TipoLicencia[];
}

export class getDashboardTramiteDTO {
  @ApiProperty({ description: 'Total de trámites creados en el periodo' })
  tramitesCreados: number;

  @ApiProperty({ description: 'Recaudación total en el periodo' })
  recaudacionTotal: number;

  @ApiProperty({ description: 'Desglose por municipio', type: [DesgloseMunicipio] })
  desglose: DesgloseMunicipio[];
}

export class getDashboardRevisorReq {

  @ApiProperty({ example: '2026-01-01', description: 'Fecha de inicio (aaaa-mm-dd)' })
  FechaInicio: string;

  @ApiProperty({ example: '2026-01-31', description: 'Fecha de fin (aaaa-mm-dd)' })
  FechaFin: string;
}

export class SolicitudesRevisor {
  @ApiProperty({ description: 'Cantidad de solicitudes aprobadas' })
  Aprobado?: number;

  @ApiProperty({ description: 'Cantidad de solicitudes rechazadas' })
  Rechazados?: number;

  @ApiProperty({ description: 'Cantidad de solicitudes en curso' })
  'En Curso'?: number;

  [key: string]: number | undefined;
}

export class getDashboardRevisorDTO {
  @ApiProperty({ description: 'Nombre completo del revisor' })
  Nombre: string;

  @ApiProperty({ description: 'Correo electrónico del revisor' })
  Correo: string;

  @ApiProperty({ description: 'Solicitudes agrupadas por estatus', type: SolicitudesRevisor })
  solicitudes: SolicitudesRevisor;

  @ApiProperty({ description: 'ID del estatus del revisor' })
  idEstatus: number;

  @ApiProperty({ description: 'Descripción del estatus del revisor' })
  estatus: string;
}
