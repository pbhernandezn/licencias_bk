import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { JwtAuthGuard } from '@principal/main-module/proyecto/auth/jwt-auth.guard';
import { BaseResponse } from '@principal/commons-module/proyecto/models/base-response';
import { ExamenesService } from '@principal/core-module/proyecto/services/from-tables/examenes-service';
import { PruebasFisicasService } from '@principal/core-module/proyecto/services/from-tables/pruebas-fisicas-service';
import {
  ObtenerPreguntasExamenReq,
  ObtenerPreguntasExamenRes,
  EnviarRespuestasExamenReq,
  ResultadoExamenDTO,
  VerificarResultadoExamenReq,
  VerificarAprobacionExamenReq,
  VerificarAprobacionExamenRes,
  ObtenerHorariosDisponiblesReq,
  ObtenerHorariosDisponiblesRes,
  AgendarPruebaFisicaReq,
  AgendarPruebaFisicaRes,
  ObtenerPruebasPorSolicitudReq,
  ObtenerPruebasPorSolicitudRes,
  CancelarPruebaReq,
} from '@principal/core-module/proyecto/models/from-tables/pruebas-dto';

@ApiTags('📝 Pruebas de Manejo')
@ApiBearerAuth('JWT-auth')
@UseGuards(JwtAuthGuard)
@Controller('api/pruebas')
export class PruebasController {
  constructor(
    private examenesService: ExamenesService,
    private pruebasFisicasService: PruebasFisicasService,
  ) {}

  // ==================== EXAMEN TEÓRICO (EN LÍNEA) ====================

  @ApiOperation({
    summary: 'Obtener Preguntas del Examen Teórico',
    description: 'Genera 10 preguntas aleatorias para el examen teórico en línea. Crea un nuevo intento de examen.',
  })
  @ApiBody({ type: ObtenerPreguntasExamenReq })
  @Post('examen-teorico/obtener-preguntas')
  async obtenerPreguntasExamen(
    @Body() request: ObtenerPreguntasExamenReq,
    @Request() req: any,
  ): Promise<BaseResponse<ObtenerPreguntasExamenRes>> {
    const resultado = await this.examenesService.obtenerPreguntasExamen(request);
    
    return {
      code: '200',
      internalCode: '',
      message: 'Preguntas obtenidas correctamente. Tiene tiempo ilimitado para responder.',
      correlationId: '',
      data: resultado,
    };
  }

  @ApiOperation({
    summary: 'Enviar Respuestas del Examen Teórico',
    description: 'Envía las 10 respuestas del usuario y obtiene la calificación inmediata. Se requieren 7 o más respuestas correctas para aprobar.',
  })
  @ApiBody({ type: EnviarRespuestasExamenReq })
  @Post('examen-teorico/enviar-respuestas')
  async enviarRespuestasExamen(
    @Body() request: EnviarRespuestasExamenReq,
    @Request() req: any,
  ): Promise<BaseResponse<ResultadoExamenDTO>> {
    const resultado = await this.examenesService.enviarRespuestasExamen(request);
    
    return {
      code: resultado.aprobado ? '200' : '210',
      internalCode: '',
      message: resultado.mensaje,
      correlationId: '',
      data: resultado,
    };
  }

  @ApiOperation({
    summary: 'Verificar Resultado del Examen',
    description: 'Consulta el resultado de un examen previamente completado.',
  })
  @ApiBody({ type: VerificarResultadoExamenReq })
  @Post('examen-teorico/verificar-resultado')
  async verificarResultadoExamen(
    @Body() request: VerificarResultadoExamenReq,
    @Request() req: any,
  ): Promise<BaseResponse<ResultadoExamenDTO>> {
    const resultado = await this.examenesService.verificarResultadoExamen(request);
    
    return {
      code: '200',
      internalCode: '',
      message: 'Resultado obtenido correctamente',
      correlationId: '',
      data: resultado,
    };
  }

  @ApiOperation({
    summary: 'Verificar si Aprobó Examen Teórico',
    description: 'Verifica si una solicitud tiene un examen teórico aprobado. Devuelve true/false con detalles.',
  })
  @ApiBody({ type: VerificarAprobacionExamenReq })
  @Post('examen-teorico/verificar-aprobacion')
  async verificarAprobacionExamen(
    @Body() request: VerificarAprobacionExamenReq,
    @Request() req: any,
  ): Promise<BaseResponse<VerificarAprobacionExamenRes>> {
    const resultado = await this.examenesService.verificarAprobacionExamen(request);
    
    return {
      code: resultado.aprobo ? '200' : '204',
      internalCode: '',
      message: resultado.mensaje,
      correlationId: '',
      data: resultado,
    };
  }

  // ==================== PRUEBA FÍSICA (PRESENCIAL) ====================

  @ApiOperation({
    summary: 'Obtener Horarios Disponibles',
    description: 'Consulta los horarios disponibles para un lugar y fecha específica.',
  })
  @ApiBody({ type: ObtenerHorariosDisponiblesReq })
  @Post('prueba-fisica/obtener-horarios')
  async obtenerHorariosDisponibles(
    @Body() request: ObtenerHorariosDisponiblesReq,
    @Request() req: any,
  ): Promise<BaseResponse<ObtenerHorariosDisponiblesRes>> {
    const resultado = await this.pruebasFisicasService.obtenerHorariosDisponibles(request);
    
    return {
      code: '200',
      internalCode: '',
      message: 'Horarios obtenidos correctamente',
      correlationId: '',
      data: resultado,
    };
  }

  @ApiOperation({
    summary: 'Agendar Prueba Física',
    description: 'Agenda una cita para realizar la prueba práctica de manejo en un lugar, fecha y hora específicos.',
  })
  @ApiBody({ type: AgendarPruebaFisicaReq })
  @Post('prueba-fisica/agendar')
  async agendarPruebaFisica(
    @Body() request: AgendarPruebaFisicaReq,
    @Request() req: any,
  ): Promise<BaseResponse<AgendarPruebaFisicaRes>> {
    const resultado = await this.pruebasFisicasService.agendarPruebaFisica(request);
    
    return {
      code: '200',
      internalCode: '',
      message: resultado.mensaje,
      correlationId: '',
      data: resultado,
    };
  }

  // ==================== CONSULTAS GENERALES ====================

  @ApiOperation({
    summary: 'Obtener Pruebas por Solicitud',
    description: 'Obtiene todas las pruebas (teóricas y físicas) asociadas a una solicitud.',
  })
  @ApiBody({ type: ObtenerPruebasPorSolicitudReq })
  @Post('obtener-por-solicitud')
  async obtenerPruebasPorSolicitud(
    @Body() request: ObtenerPruebasPorSolicitudReq,
    @Request() req: any,
  ): Promise<BaseResponse<ObtenerPruebasPorSolicitudRes>> {
    const resultado = await this.pruebasFisicasService.obtenerPruebasPorSolicitud(request);
    
    return {
      code: '200',
      internalCode: '',
      message: 'Pruebas obtenidas correctamente',
      correlationId: '',
      data: resultado,
    };
  }

  @ApiOperation({
    summary: 'Cancelar Prueba',
    description: 'Cancela una prueba previamente agendada.',
  })
  @ApiBody({ type: CancelarPruebaReq })
  @Post('cancelar')
  async cancelarPrueba(
    @Body() request: CancelarPruebaReq,
    @Request() req: any,
  ): Promise<BaseResponse<{ mensaje: string }>> {
    const resultado = await this.pruebasFisicasService.cancelarPrueba(request);
    
    return {
      code: '200',
      internalCode: '',
      message: resultado.mensaje,
      correlationId: '',
      data: resultado,
    };
  }
}
