import { ApiProperty } from '@nestjs/swagger';
import { IntegerType } from 'typeorm';

export class UsuariosDTO {
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

export class getUsuarioByIdDTO {
  existe: boolean;
  usuario?: UsuariosDataDTO;
}

export class UsuariosDataDTO {
  nombres: string;
  apellidopaterno: string;
  apellidomaterno: string;
  rfc: string;
  curp: string;
  email: string;
  sexo: string;
  telefono: string;
  estatus: string;
}

export class getUsuarioByIdReq {
  @ApiProperty({ description: 'ID del usuario a buscar', example: 1 })
  id: number;
}

export class createUsuarioReq {
  @ApiProperty({ description: 'Tipo del usuario', example: 3 })
  tipoUsuario: number; 
  @ApiProperty({ description: 'Nombres del usuario', example: 'Juan' })
  nombres: string; 
  @ApiProperty({ description: 'Apellido paterno del usuario', example: 'Pérez' })
  apellidopaterno: string;
  @ApiProperty({ description: 'Apellido materno del usuario', example: 'Gómez' })
  apellidomaterno: string;
  @ApiProperty({ description: 'CURP del usuario', example: 'PEGA800101HDFRMS09' })
  curp: string;
  @ApiProperty({ description: 'Email del usuario', example: 'juan.perez@example.com' })
  email: string;
  @ApiProperty({ description: 'Contrase�a encriptada del usuario', example: 'password123' })
  password: string;
  @ApiProperty({ description: 'Fecha de nacimiento del usuario', example: '1980-01-01' })
  fechanacimiento: string;
}

export class usuarioDataResponse {
  @ApiProperty({ description: 'Descripci�n del error de Nombre', example: 'No puede contener n�meros ni s�mbolos' })
  nombres: string; 
  @ApiProperty({ description: 'Descripci�n del error de Apellido paterno del usuario', example: 'No puede ir vac�o' })
  apellidopaterno: string;
  @ApiProperty({ description: 'Descripci�n del error de Apellido materno del usuario', example: 'No puede ser menor de 3 letras' })
  apellidomaterno: string;
  @ApiProperty({ description: 'Descripci�n del error de CURP del usuario', example: 'No coincide con el formato' })
  curp: string;
  @ApiProperty({ description: 'Descripci�n del error de Email del usuario', example: 'No coincide con el formato' })
  email: string;
  @ApiProperty({ description: 'Descripci�n del error de Contrase�a encriptada del usuario', example: 'Contrase�a no cumple con los par�metros de seguridad' })
  password: string;
  @ApiProperty({ description: 'Descripci�n del error de Fecha de nacimiento del usuario', example: 'La fecha de nacimiento no coincide con la CURP.' })
  fechanacimiento: string;
  @ApiProperty({ description: 'Informaci�n sobre campos requeridos', example: 'Nombre, Apellidos Paterno y Materno, CURP, Email, Contrase�a y Fecha de Nacimiento son obligatorios.' })
  necesarios: string;
}

export class createUsuarioDTO {
  @ApiProperty({ description: 'Indica si el usuario pudo ser dado de alta.', example: true })
  creado: boolean;
  @ApiProperty({ description: 'Detalle de errores' })
  errores?: usuarioDataResponse;
}
