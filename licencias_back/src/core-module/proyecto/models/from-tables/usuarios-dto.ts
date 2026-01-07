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
  @ApiProperty({ description: 'Tipo de usuario', example: 3 })
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
  @ApiProperty({ description: 'Contraseña encriptada del usuario', example: 'password123' })
  password: string;
  @ApiProperty({ description: 'Fecha de nacimiento del usuario', example: '1980-01-01' })
  fechanacimiento: string;
}

export class usuarioDataResponse {
  @ApiProperty({ description: 'Descripción del error de Nombre', example: 'No puede contener números ni símbolos' })
  nombres?: string; 
  @ApiProperty({ description: 'Descripción del error de Apellido paterno del usuario', example: 'No puede ir vacío' })
  apellidopaterno?: string;
  @ApiProperty({ description: 'Descripción del error de Apellido materno del usuario', example: 'No puede ser menor de 3 letras' })
  apellidomaterno?: string;
  @ApiProperty({ description: 'Descripción del error de CURP del usuario', example: 'No coincide con el formato' })
  curp?: string;
  @ApiProperty({ description: 'Descripción del error de Email del usuario', example: 'No coincide con el formato' })
  email?: string;
  @ApiProperty({ description: 'Descripción del error de Contraseña encriptada del usuario', example: 'Contraseña no cumple con los parámetros de seguridad' })
  password?: string;
  @ApiProperty({ description: 'Descripción del error de Fecha de nacimiento del usuario', example: 'La fecha de nacimiento no coincide con la CURP.' })
  fechanacimiento?: string;
  @ApiProperty({ description: 'Información sobre campos requeridos', example: 'Nombre, Apellidos Paterno y Materno, CURP, Email, Contraseña y Fecha de Nacimiento son obligatorios.' })
  necesarios?: string;
  @ApiProperty({ description: 'RFC del usuario', example: 'PEGA800101XXX' })
  rfc?: string;
  @ApiProperty({ description: 'Domicilio del usuario', example: 'Calle 123' })
  domicilio?: string;
  @ApiProperty({ description: 'Colonia del usuario', example: 'Colonia 123' })
  colonia?: string;
  @ApiProperty({ description: 'CP del usuario', example: '12345' })
  cp?: string;
  @ApiProperty({ description: 'Municipio del usuario', example: 'Municipio 1' })
  municipio?: string;
  @ApiProperty({ description: 'Localidad del usuario', example: 'Localidad 1' })
  localidad?: string;
  @ApiProperty({ description: 'Entidad del usuario', example: 'Durango' })
  entidad?: string;
  @ApiProperty({ description: 'Nacionalidad del usuario', example: 'Mexicana' })
  nacionalidad?: string;
  @ApiProperty({ description: 'Sexo del usuario', example: 'Femenino' })
  sexo?: string;
  @ApiProperty({ description: 'Tipo de Sangre del usuario', example: 'O+' })
  tipoSangre?: string;
  @ApiProperty({ description: 'Indica si el usuario es donador', example: 'Si' })
  donador?: string;
  @ApiProperty({ description: 'Lugar de trabajo del usuario', example: 'Empresa 123' })
  lugarTrabajo?: string;
  @ApiProperty({ description: 'Restricciones médicas del usuario', example: 'Ninguna' })
  restricciones?: string;
  @ApiProperty({ description: 'Observaciones médicas del usuario', example: 'Ninguna' })
  observaciones?: string;
  @ApiProperty({ description: 'Nombre del conocido del usuario', example: 'Petra' })
  conocidoNombre?: string;
  @ApiProperty({ description: 'Apellido paterno del conocido del usuario', example: 'Fernández' })
  conocidoApellidoPaterno?: string;
  @ApiProperty({ description: 'Apellido materno del usuario', example: 'López' })
  conocidoApellidoMaterno?: string;
  @ApiProperty({ description: 'Domicilio del conocido del usuario', example: 'Calle 5432' })
  conocidoDomicilio?: string;
  @ApiProperty({ description: 'CP del conocido del usuario', example: '09876' })
  conocidoCp?: string;
  @ApiProperty({ description: 'Colonia del conocido del usuario', example: 'Colonia 2' })
  conocidoColonia?: string;
  @ApiProperty({ description: 'Municipio del conocido del usuario', example: 'Municipio 2' })
  conocidoMunicipio?: string;
  @ApiProperty({ description: 'Localidad del conocido del usuario', example: 'Localidad 2' })
  conocidoLocalidad?: string;
  @ApiProperty({ description: 'Teléfono del conocido del usuario', example: '55-1234-4321' })
  conocidoTelefono?: string;
  @ApiProperty({ description: 'Id de estatus del usuario', example: 1 })
  idEstatus?: string;
}

export class createUsuarioDTO {
  @ApiProperty({ description: 'Indica si el usuario pudo ser dado de alta.', example: true })
  creado: boolean;
  @ApiProperty({ description: 'Detalle de errores' })
  errores?: usuarioDataResponse;
}


export class updateUsuarioReq {
  @ApiProperty({ description: 'Id de usuario', example: 1 })
  idUsuario: number;
  @ApiProperty({ description: 'Tipo de usuario', example: 3 })
  tipoUsuario: number;
  @ApiProperty({ description: 'Nombres del usuario', example: 'Juan' })
  nombres: string; 
  @ApiProperty({ description: 'Apellido paterno del usuario', example: 'Pérez' })
  apellidopaterno: string;
  @ApiProperty({ description: 'Apellido materno del usuario', example: 'Gómez' })
  apellidomaterno: string;
  @ApiProperty({ description: 'CURP del usuario', example: 'PEGA800101HDFRMS09' })
  curp: string;
  @ApiProperty({ description: 'Contraseña encriptada del usuario', example: 'password123' })
  password: string;
  @ApiProperty({ description: 'Fecha de nacimiento del usuario', example: '1980-01-01' })
  fechanacimiento: string;
  @ApiProperty({ description: 'RFC del usuario', example: 'PEGA800101XXX' })
  rfc?: string;
  @ApiProperty({ description: 'Domicilio del usuario', example: 'Calle 123' })
  domicilio?: string;
  @ApiProperty({ description: 'Colonia del usuario', example: 'Colonia 123' })
  colonia?: string;
  @ApiProperty({ description: 'CP del usuario', example: '12345' })
  cp?: string;
  @ApiProperty({ description: 'Municipio del usuario', example: 'Municipio 1' })
  municipio?: string;
  @ApiProperty({ description: 'Localidad del usuario', example: 'Localidad 1' })
  localidad?: string;
  @ApiProperty({ description: 'Entidad del usuario', example: 'Durango' })
  entidad?: string;
  @ApiProperty({ description: 'Nacionalidad del usuario', example: 'Mexicana' })
  nacionalidad?: string;
  @ApiProperty({ description: 'Sexo del usuario', example: 'Femenino' })
  sexo?: string;
  @ApiProperty({ description: 'Tipo de Sangre del usuario', example: 'O+' })
  tipoSangre?: string;
  @ApiProperty({ description: 'Indica si el usuario es donador', example: 'Si' })
  donador?: string;
  @ApiProperty({ description: 'Lugar de trabajo del usuario', example: 'Empresa 123' })
  lugarTrabajo?: string;
  @ApiProperty({ description: 'Restricciones médicas del usuario', example: 'Ninguna' })
  restricciones?: string;
  @ApiProperty({ description: 'Observaciones médicas del usuario', example: 'Ninguna' })
  observaciones?: string;
  @ApiProperty({ description: 'Nombre del conocido del usuario', example: 'Petra' })
  conocidoNombre?: string;
  @ApiProperty({ description: 'Apellido paterno del conocido del usuario', example: 'Fernández' })
  conocidoApellidoPaterno?: string;
  @ApiProperty({ description: 'Apellido materno del usuario', example: 'López' })
  conocidoApellidoMaterno?: string;
  @ApiProperty({ description: 'Domicilio del conocido del usuario', example: 'Calle 5432' })
  conocidoDomicilio: string;
  @ApiProperty({ description: 'CP del conocido del usuario', example: '09876' })
  conocidoCp?: string;
  @ApiProperty({ description: 'Colonia del conocido del usuario', example: 'Colonia 2' })
  conocidoColonia?: string;
  @ApiProperty({ description: 'Municipio del conocido del usuario', example: 'Municipio 2' })
  conocidoMunicipio?: string;
  @ApiProperty({ description: 'Localidad del conocido del usuario', example: 'Localidad 2' })
  conocidoLocalidad?: string;
  @ApiProperty({ description: 'Teléfono del conocido del usuario', example: '55-1234-4321' })
  conocidoTelefono?: string;
  @ApiProperty({ description: 'Id de estatus del usuario', example: 1 })
  idEstatus?: number;
}

export class updateUsuarioDTO {
  @ApiProperty({ description: 'Indica si la actualización fue exitosa.', example: true })
  actualizado: boolean;
  @ApiProperty({ description: 'Detalle de errores' })
  errores?: usuarioDataResponse;
}