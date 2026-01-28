import { Injectable, Logger } from '@nestjs/common';
import { AzureEmailService } from '../from-tables/azure-email-service';

@Injectable()
export class EmailNotificationsService {
  private readonly logger = new Logger(EmailNotificationsService.name);

  constructor(private readonly azureEmailService: AzureEmailService) {}

  /**
   * Notificar cuando se sube un documento
   */
  async notificarDocumentoSubido(
    emailUsuario: string,
    nombreUsuario: string,
    idsolicitud: number,
    nombreDocumento: string,
  ): Promise<void> {
    if (!this.azureEmailService.isConfigured()) {
      this.logger.warn('Email service no configurado. Notificación no enviada.');
      return;
    }

    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background-color: #4CAF50; color: white; padding: 20px; text-align: center; }
          .content { padding: 20px; background-color: #f9f9f9; }
          .footer { padding: 20px; text-align: center; font-size: 12px; color: #666; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2>Documento Subido Exitosamente</h2>
          </div>
          <div class="content">
            <p>Hola <strong>${nombreUsuario}</strong>,</p>
            <p>Te informamos que se ha subido un documento a tu solicitud de licencia.</p>
            <p><strong>Detalles:</strong></p>
            <ul>
              <li>Solicitud ID: ${idsolicitud}</li>
              <li>Documento: ${nombreDocumento}</li>
            </ul>
            <p>Puedes revisar el estado de tu solicitud en el portal de licencias.</p>
          </div>
          <div class="footer">
            <p>Este es un mensaje automático. Por favor no respondas a este correo.</p>
            <p>&copy; 2026 Licencias Durango</p>
          </div>
        </div>
      </body>
      </html>
    `;

    try {
      await this.azureEmailService.sendEmail({
        to: emailUsuario,
        subject: `Documento subido - Solicitud ${idsolicitud}`,
        htmlContent,
      });
    } catch (error) {
      this.logger.error('Error al enviar notificación de documento subido:', error);
    }
  }

  /**
   * Notificar cuando se sube una foto de rostro
   */
  async notificarFotoRostroSubida(
    emailUsuario: string,
    nombreUsuario: string,
    idsolicitud: number,
  ): Promise<void> {
    if (!this.azureEmailService.isConfigured()) {
      this.logger.warn('Email service no configurado. Notificación no enviada.');
      return;
    }

    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background-color: #2196F3; color: white; padding: 20px; text-align: center; }
          .content { padding: 20px; background-color: #f9f9f9; }
          .footer { padding: 20px; text-align: center; font-size: 12px; color: #666; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2>Foto de Rostro Subida Exitosamente</h2>
          </div>
          <div class="content">
            <p>Hola <strong>${nombreUsuario}</strong>,</p>
            <p>Tu foto de rostro ha sido subida correctamente para la solicitud de licencia.</p>
            <p><strong>Detalles:</strong></p>
            <ul>
              <li>Solicitud ID: ${idsolicitud}</li>
            </ul>
            <p>Tu solicitud está siendo procesada. Te notificaremos cuando haya actualizaciones.</p>
          </div>
          <div class="footer">
            <p>Este es un mensaje automático. Por favor no respondas a este correo.</p>
            <p>&copy; 2026 Licencias Durango</p>
          </div>
        </div>
      </body>
      </html>
    `;

    try {
      await this.azureEmailService.sendEmail({
        to: emailUsuario,
        subject: `Foto de rostro subida - Solicitud ${idsolicitud}`,
        htmlContent,
      });
    } catch (error) {
      this.logger.error('Error al enviar notificación de foto subida:', error);
    }
  }

  /**
   * Notificar cuando una revisión es completada
   */
  async notificarRevisionCompletada(
    emailUsuario: string,
    nombreUsuario: string,
    idsolicitud: number,
    estatusRevision: string,
    comentarios?: string,
  ): Promise<void> {
    if (!this.azureEmailService.isConfigured()) {
      this.logger.warn('Email service no configurado. Notificación no enviada.');
      return;
    }

    const color = estatusRevision.toLowerCase() === 'aprobado' ? '#4CAF50' : '#FF9800';
    const comentariosHtml = comentarios
      ? `<p><strong>Comentarios:</strong> ${comentarios}</p>`
      : '';

    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background-color: ${color}; color: white; padding: 20px; text-align: center; }
          .content { padding: 20px; background-color: #f9f9f9; }
          .footer { padding: 20px; text-align: center; font-size: 12px; color: #666; }
          .status { font-size: 18px; font-weight: bold; color: ${color}; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2>Revisión de Solicitud Completada</h2>
          </div>
          <div class="content">
            <p>Hola <strong>${nombreUsuario}</strong>,</p>
            <p>La revisión de tu solicitud de licencia ha sido completada.</p>
            <p><strong>Detalles:</strong></p>
            <ul>
              <li>Solicitud ID: ${idsolicitud}</li>
              <li>Estatus: <span class="status">${estatusRevision}</span></li>
            </ul>
            ${comentariosHtml}
            <p>Puedes revisar los detalles completos en el portal de licencias.</p>
          </div>
          <div class="footer">
            <p>Este es un mensaje automático. Por favor no respondas a este correo.</p>
            <p>&copy; 2026 Licencias Durango</p>
          </div>
        </div>
      </body>
      </html>
    `;

    try {
      await this.azureEmailService.sendEmail({
        to: emailUsuario,
        subject: `Revisión completada - Solicitud ${idsolicitud}`,
        htmlContent,
      });
    } catch (error) {
      this.logger.error('Error al enviar notificación de revisión:', error);
    }
  }

  /**
   * Notificar cuando se crea una nueva solicitud
   */
  async notificarSolicitudCreada(
    emailUsuario: string,
    nombreUsuario: string,
    idsolicitud: number,
    tipoLicencia: string,
  ): Promise<void> {
    if (!this.azureEmailService.isConfigured()) {
      this.logger.warn('Email service no configurado. Notificación no enviada.');
      return;
    }

    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background-color: #673AB7; color: white; padding: 20px; text-align: center; }
          .content { padding: 20px; background-color: #f9f9f9; }
          .footer { padding: 20px; text-align: center; font-size: 12px; color: #666; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2>Solicitud de Licencia Creada</h2>
          </div>
          <div class="content">
            <p>Hola <strong>${nombreUsuario}</strong>,</p>
            <p>Tu solicitud de licencia ha sido creada exitosamente.</p>
            <p><strong>Detalles:</strong></p>
            <ul>
              <li>Solicitud ID: ${idsolicitud}</li>
              <li>Tipo de Licencia: ${tipoLicencia}</li>
            </ul>
            <p>A continuación, deberás subir los documentos requeridos para continuar con el proceso.</p>
          </div>
          <div class="footer">
            <p>Este es un mensaje automático. Por favor no respondas a este correo.</p>
            <p>&copy; 2026 Licencias Durango</p>
          </div>
        </div>
      </body>
      </html>
    `;

    try {
      await this.azureEmailService.sendEmail({
        to: emailUsuario,
        subject: `Solicitud creada - ID ${idsolicitud}`,
        htmlContent,
      });
    } catch (error) {
      this.logger.error('Error al enviar notificación de solicitud creada:', error);
    }
  }
}
