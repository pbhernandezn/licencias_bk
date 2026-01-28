import { Injectable, Logger } from '@nestjs/common';
import { EmailClient, KnownEmailSendStatus } from '@azure/communication-email';

export interface EmailOptions {
  to: string;
  subject: string;
  htmlContent: string;
  plainTextContent?: string;
}

@Injectable()
export class AzureEmailService {
  private emailClient: EmailClient;
  private senderAddress: string;
  private readonly logger = new Logger(AzureEmailService.name);

  constructor() {
    const connectionString = process.env.AZURE_COMMUNICATION_CONNECTION_STRING;
    this.senderAddress = process.env.AZURE_COMMUNICATION_SENDER_ADDRESS || 'DoNotReply@licenciasdurango.com';

    if (!connectionString) {
      this.logger.warn('AZURE_COMMUNICATION_CONNECTION_STRING no configurado. El servicio de email no estará disponible.');
      return;
    }

    try {
      this.emailClient = new EmailClient(connectionString);
      this.logger.log('Azure Email Service inicializado correctamente');
    } catch (error) {
      this.logger.error('Error al inicializar Azure Email Service:', error);
    }
  }

  /**
   * Enviar un email
   */
  async sendEmail(options: EmailOptions): Promise<string> {
    if (!this.emailClient) {
      throw new Error('Azure Email Service no está configurado');
    }

    try {
      const message = {
        senderAddress: this.senderAddress,
        content: {
          subject: options.subject,
          plainText: options.plainTextContent || this.stripHtml(options.htmlContent),
          html: options.htmlContent,
        },
        recipients: {
          to: [
            {
              address: options.to,
              displayName: options.to,
            },
          ],
        },
      };

      this.logger.log(`Enviando email a ${options.to} con asunto: ${options.subject}`);

      const poller = await this.emailClient.beginSend(message);
      const result = await poller.pollUntilDone();

      if (result.status === KnownEmailSendStatus.Succeeded) {
        this.logger.log(`Email enviado exitosamente a ${options.to}. Message ID: ${result.id}`);
        return result.id;
      } else {
        this.logger.error(`Error al enviar email: ${result.status}`);
        throw new Error(`Error al enviar email: ${result.status}`);
      }
    } catch (error) {
      this.logger.error(`Error al enviar email a ${options.to}:`, error);
      throw error;
    }
  }

  /**
   * Remover tags HTML para crear versión plain text
   */
  private stripHtml(html: string): string {
    return html.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
  }

  /**
   * Verificar si el servicio está configurado
   */
  isConfigured(): boolean {
    return !!this.emailClient;
  }
}
