import { ApiProperty } from '@nestjs/swagger';

export class AuthDTO {
  id: number;
  creacion: string;
  modificacion: string;
  idtipousuario: number;
  nombres: string;
  username: string;
  password: string;
  logintype: string;
  apellidopaterno: string;
  apellidomaterno: string;
  rfc: string;
  curp: string;
  domicilio: string;
  colonia: string;
  cp: number;
  municipio: string;
  localidad: string;
  entidad: string;
  email: string;
  nacionalidad: string;
  sexo: string;
  tiposangre: string;
  donador: string;
  lugartrabajo: string;
  restricciones: string;
  observacionmedica: string;
  conocido_nombres: string;
  conocido_apellidopaterno: string;
  conocido_apellidomaterno: string;
  conocido_domicilio: string;
  conodico_cp: number;
  conodico_colonia: string;
  conodico_municipio: string;
  conodico_localidad: string;
  conodico_telefono: string;
  idestatus: number;
}

export class getAuthByEmailDTO {
  existe: boolean;
  usuario?: AuthDataDTO;
}

export class AuthDataDTO {
  user_Id: number;
  username: string;
  nombre_completo: string;
  password: string;
  rfc: string;
  curp: string;
  estatus: string;
  usuario: string;
  statusid: number;
}

export class getAuthByEmailReq {
  @ApiProperty({
    description: 'Email del usuario a buscar',
    example: 'usuario@example.com',
  })
  email: string;
}
