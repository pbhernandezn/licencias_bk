import { ApiProperty } from '@nestjs/swagger';

export class FotoRostroDto {
  @ApiProperty({ description: 'ID de la foto', example: 1 })
  id: number;

  @ApiProperty({ description: 'ID de la solicitud', example: 123 })
  idsolicitud: number;

  @ApiProperty({ description: 'URL de la foto en Azure Blob Storage', example: 'https://storage.blob.core.windows.net/fotos-rostro/solicitud_123_1234567890.jpg' })
  urlFoto: string;

  @ApiProperty({ description: 'Nombre del archivo en Azure', example: 'solicitud_123_1234567890.jpg' })
  nombreArchivo: string;

  @ApiProperty({ description: 'Contenedor de Azure Blob', example: 'fotos-rostro' })
  contenedor: string;

  @ApiProperty({ description: 'Fecha de subida', example: '2026-01-21T10:30:00.000Z' })
  fechaSubida: Date;

  @ApiProperty({ description: 'Estado activo/inactivo', example: true })
  activo: boolean;
}

export class SubirFotoRostroRequest {
  @ApiProperty({ description: 'ID de la solicitud', example: 123 })
  idsolicitud: number;

  @ApiProperty({ 
    description: 'Archivo de imagen codificado en base64 (sin prefijo data:image)', 
    example: '/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAH/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCwAB//2Q==' 
  })
  archivoBase64: string;

  @ApiProperty({ description: 'Nombre original del archivo', example: 'foto_rostro.jpg' })
  nombreoriginal: string;

  @ApiProperty({ 
    description: 'Formato del archivo (jpg, jpeg, png)', 
    example: 'jpg',
    enum: ['jpg', 'jpeg', 'png']
  })
  formato: string;
}

export class ActualizarFotoRostroRequest {
  @ApiProperty({ description: 'ID de la solicitud', example: 123 })
  idsolicitud: number;

  @ApiProperty({ 
    description: 'Archivo de imagen codificado en base64 (sin prefijo data:image)', 
    example: '/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAH/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCwAB//2Q==' 
  })
  archivoBase64: string;

  @ApiProperty({ description: 'Nombre original del archivo', example: 'nueva_foto.jpg' })
  nombreoriginal: string;

  @ApiProperty({ 
    description: 'Formato del archivo (jpg, jpeg, png)', 
    example: 'jpg',
    enum: ['jpg', 'jpeg', 'png']
  })
  formato: string;
}
