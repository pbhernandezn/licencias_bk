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
import { Response } from 'express';
import { FotosRostroExpose } from '../../../core-module/proyecto/expose/from-front/fotos-rostro-expose';
import { BaseResponse } from '../../../commons-module/proyecto/models/base-response';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('api/fotos-rostro')
@UseGuards(JwtAuthGuard)
export class FotosRostroController {
  constructor(private readonly fotosRostroExpose: FotosRostroExpose) {}

  @Post('subir')
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
