import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Param,
  Body,
  ParseIntPipe,
  Res,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBody, ApiParam, ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { Response } from 'express';
import { FotosRostroExpose } from '../../../core-module/proyecto/expose/from-front/fotos-rostro-expose';
import { SubirFotoRostroRequest, ActualizarFotoRostroRequest } from '../../../core-module/proyecto/models/from-tables/fotos-rostro-dto';
import { BaseResponse } from '../../../commons-module/proyecto/models/base-response';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('Fotos de Rostro')
@ApiBearerAuth('JWT-auth')
@Controller('api/fotos-rostro')
@UseGuards(JwtAuthGuard)
export class FotosRostroController {
  constructor(private readonly fotosRostroExpose: FotosRostroExpose) {}

  @Post('subir')
  @ApiOperation({ summary: 'Subir foto de rostro', description: 'Sube una foto de rostro para una solicitud (base64, JPG/PNG, máx 5MB)' })
  @ApiBody({ type: SubirFotoRostroRequest })
  @ApiResponse({ status: 200, description: 'Foto subida exitosamente' })
  @ApiResponse({ status: 400, description: 'Archivo inválido o solicitud no existe' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  async subirFotoRostro(@Body() request: SubirFotoRostroRequest) {
    const data = await this.fotosRostroExpose.subirFotoRostro(request);
    const resultado = new BaseResponse();
    resultado.code = '200';
    resultado.internalCode = 'FOTO_SUBIDA';
    resultado.message = 'Foto de rostro subida exitosamente';
    resultado.data = data;
    return resultado;
  }

  @Get('descargar/:idsolicitud')
  @ApiOperation({ summary: 'Descargar foto de rostro', description: 'Descarga la foto de rostro de una solicitud' })
  @ApiParam({ name: 'idsolicitud', type: Number, description: 'ID de la solicitud' })
  @ApiResponse({ status: 200, description: 'Foto descargada exitosamente', content: { 'image/jpeg': {} } })
  @ApiResponse({ status: 404, description: 'Foto no encontrada' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  async descargarFotoRostro(
    @Param('idsolicitud', ParseIntPipe) idsolicitud: number,
    @Res() res: Response,
  ) {
    const buffer = await this.fotosRostroExpose.descargarFotoRostro(idsolicitud);
    
    res.setHeader('Content-Type', 'image/jpeg');
    res.setHeader('Content-Disposition', `inline; filename="foto_rostro_${idsolicitud}.jpg"`);
    res.send(buffer);
  }

  @Get('url/:idsolicitud')
  @ApiOperation({ summary: 'Obtener URL de foto', description: 'Obtiene los metadatos y URL de la foto de rostro' })
  @ApiParam({ name: 'idsolicitud', type: Number, description: 'ID de la solicitud' })
  @ApiResponse({ status: 200, description: 'URL obtenida exitosamente' })
  @ApiResponse({ status: 404, description: 'Foto no encontrada' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  async obtenerUrlFotoRostro(@Param('idsolicitud', ParseIntPipe) idsolicitud: number) {
    const data = await this.fotosRostroExpose.obtenerUrlFotoRostro(idsolicitud);
    const resultado = new BaseResponse();
    resultado.code = '200';
    resultado.internalCode = 'URL_OBTENIDA';
    resultado.message = 'URL de foto obtenida exitosamente';
    resultado.data = data;
    return resultado;
  }

  @Put('modificar/:idsolicitud')
  @ApiOperation({ summary: 'Modificar foto de rostro', description: 'Reemplaza la foto de rostro existente con una nueva (base64, JPG/PNG, máx 5MB)' })
  @ApiParam({ name: 'idsolicitud', type: Number, description: 'ID de la solicitud' })
  @ApiBody({ type: ActualizarFotoRostroRequest })
  @ApiResponse({ status: 200, description: 'Foto modificada exitosamente' })
  @ApiResponse({ status: 400, description: 'Archivo inválido' })
  @ApiResponse({ status: 404, description: 'Foto no encontrada' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  async modificarFotoRostro(@Body() request: ActualizarFotoRostroRequest) {
    const data = await this.fotosRostroExpose.modificarFotoRostro(request);
    const resultado = new BaseResponse();
    resultado.code = '200';
    resultado.internalCode = 'FOTO_MODIFICADA';
    resultado.message = 'Foto de rostro modificada exitosamente';
    resultado.data = data;
    return resultado;
  }

  @Delete('eliminar/:idsolicitud')
  @ApiOperation({ summary: 'Eliminar foto de rostro', description: 'Elimina la foto de rostro de una solicitud (soft delete en BD, eliminación física en Azure)' })
  @ApiParam({ name: 'idsolicitud', type: Number, description: 'ID de la solicitud' })
  @ApiResponse({ status: 200, description: 'Foto eliminada exitosamente' })
  @ApiResponse({ status: 404, description: 'Foto no encontrada' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  async eliminarFotoRostro(@Param('idsolicitud', ParseIntPipe) idsolicitud: number) {
    await this.fotosRostroExpose.eliminarFotoRostro(idsolicitud);
    const resultado = new BaseResponse();
    resultado.code = '200';
    resultado.internalCode = 'FOTO_ELIMINADA';
    resultado.message = 'Foto de rostro eliminada exitosamente';
    resultado.data = null;
    return resultado;
  }
}
