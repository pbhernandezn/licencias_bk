import { ApiProperty } from "@nestjs/swagger";


export class getParametrosDTO {
  @ApiProperty({ description: 'Indica si el parámetro fue encontrado.', example: true })
  encontrado: boolean;
  @ApiProperty({ description: 'Contenido del parámetro' })
  parametro?: string;
}