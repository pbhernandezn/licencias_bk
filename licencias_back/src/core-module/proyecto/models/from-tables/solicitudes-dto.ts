import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsInt, IsString } from "class-validator";

export class SolicitudesDTO {
  id: number;
  idusuario: number;
  creacion: string;
  modificacion: string;
  idtipolicencia: number;
  numerolicencia: string;
  expedicion: string;
  vigencia: string;
  idestatus: number;
  idmetodopago: number;

}

export class getSolicitudByIdDTO {
  existe: boolean;
  solicitudData?: SolicitudesDataDTO;
}

export class getSolicitudesDTO {
  existe: boolean;
  solicitudesData: Array<SolicitudesDataDTO>;
}


export class SolicitudesDataDTO {
  id: number;
  idusuario: number;
  nombres: string;
  apellidopaterno: string;
  apellidomaterno: string;
  creacion: string;
  modificacion: string;
  idtipolicencia: number;
  licencia: string;
  descripcion: string;
  numerolicencia: string;
  expedicion: string;
  vigencia: string;
  idestatus: number;
  estatus: string;
  idmetodopago: number;
}

export class getSolicitudByIdReq {
  @ApiProperty({ description: 'ID de la solicitud.', example: 1 })
  id: number;
}

export class getSolicitudByIdUsuarioReq {
  @ApiProperty({ description: 'Solicitud a buscar por usuario', example: 1 })
  idUsuario: number;
}

export class getSolicitudByIdTipoLicenciaReq {
  @ApiProperty({ description: 'Solicitud a buscar por el tipo de licencia', example: 1 })
  idTipoLicencia: number;
}

export class getSolicitudByIdEstatusReq {
  @ApiProperty({ description: 'Solicitud a buscar por el tipo de estatus', example: 20 })
  idEstatus: number;
}

export class CreateSolicitudRequest {
  @ApiProperty({ description: 'ID del usuario', example: 1 })
  @IsInt()
  idusuario: number;

  @ApiProperty({ description: 'ID del tipo de licencia', example: 1 })
  @IsInt()
  idtipolicencia: number;

  @ApiProperty({ description: 'ID del método de pago', example: 1 })
  @IsInt()
  idmetodopago: number;

}

export class UpdateSolicitudRequest {
  @ApiProperty({ description: 'ID de la solicitud', example: 1 })
  @IsInt()
  idsolicitud: number;

 @ApiProperty({ description: 'ID del estatus', example: 1 })
  @IsInt()
  idestatus: number;


}