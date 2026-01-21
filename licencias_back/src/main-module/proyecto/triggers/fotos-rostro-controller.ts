import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Param,
  Query,
  UseInterceptors,
  UploadedFile,
  ParseIntPipe,
  Res,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags, ApiOperation, ApiConsumes, ApiBody, ApiParam, ApiQuery, ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { Response } from 'express';
import { FotosRostroExpose } from '../../../core-module/proyecto/expose/from-front/fotos-rostro-expose';
import { BaseResponse } from '../../../commons-module/proyecto/models/base-response';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('Fotos de Rostro')
@ApiBearerAuth('JWT-auth')
@Controller('api/fotos-rostro')
@UseGuards(JwtAuthGuard)
export class FotosRostroController {
  constructor(private readonly fotosRostroExpose: FotosRostroExpose) {}

  @Post('subir')
  @ApiOperation({ summary: 'Subir foto de rostro', description: 'Sube una foto de rostro para una solicitud (JPG/PNG, máx 5MB)' })
  @ApiConsumes('multipart/form-data')
  @ApiQuery({ name: 'idsolicitud', type: Number, description: 'ID de la solicitud' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        archivo: {
          type: 'string',
          format: 'binary',
          description: 'Archivo de imagen (JPG/PNG, máx 5MB)'
        },
      },
    },
  })
  @ApiResponse({ status: 200, description: 'Foto subida exitosamente' })
  @ApiResponse({ status: 400, description: 'Archivo inválido o solicitud no existe' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  @UseInterceptors(FileInterceptor('archivo'))
  async subirFotoRostro(
    @Query('idsolicitud', ParseIntPipe) idsolicitud: number,
    @UploadedFile() archivo: any,
  ) {
    const data = await this.fotosRostroExpose.subirFotoRostro(idsolicitud, archivo);
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
  @ApiOperation({ summary: 'Modificar foto de rostro', description: 'Reemplaza la foto de rostro existente con una nueva' })
  @ApiConsumes('multipart/form-data')
  @ApiParam({ name: 'idsolicitud', type: Number, description: 'ID de la solicitud' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        archivo: {
          type: 'string',
          format: 'binary',
          description: 'Nuevo archivo de imagen (JPG/PNG, máx 5MB)'
        },
      },
    },
  })
  @ApiResponse({ status: 200, description: 'Foto modificada exitosamente' })
  @ApiResponse({ status: 400, description: 'Archivo inválido' })
  @ApiResponse({ status: 404, description: 'Foto no encontrada' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  @UseInterceptors(FileInterceptor('archivo'))
  async modificarFotoRostro(
    @Param('idsolicitud', ParseIntPipe) idsolicitud: number,
    @UploadedFile() archivo: any,
  ) {
    const data = await this.fotosRostroExpose.modificarFotoRostro(idsolicitud, archivo);
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
