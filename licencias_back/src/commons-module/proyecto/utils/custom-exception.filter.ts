import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';
import { ErrorEspecialEnum } from './enums/errores-especiales-enum';

@Catch(HttpException)
export class CustomExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    let status = exception.getStatus();
    if (!status) status = 500;

    const messages = exception.getResponse() as any;
    let resultado = {
      code: status.toString(),
      internalCode: '1000',
      message: `${exception.message}` || 'Error interno del servidor',
      correlationId: '',
      data: {
        error: exception.name,
        messages: messages.message,
        timestamp: new Date().toISOString(),
      },
    } as any;
    if (status === ErrorEspecialEnum.ERROR_INTERNO) {
      resultado.data.stack = exception.stack;
      console.error(resultado);
      resultado = {
        code: status.toString(),
        internalCode: '1000',
        message: 'Error interno del servidor',
        correlationId: '',
        data: {
          error: exception.name,
          messages: undefined,
          timestamp: new Date().toISOString(),
        },
      };
    }

    try {
      const response = ctx.getResponse<Response>();
      response.status(200).json(resultado);
    } catch (error) {
      console.error(error.message);
      console.error('Mensaje que se intentó enviar al frontend:', resultado);
    }
  }
}
