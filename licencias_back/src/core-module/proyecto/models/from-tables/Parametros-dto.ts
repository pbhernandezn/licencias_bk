import { ApiProperty } from '@nestjs/swagger';
import { IntegerType } from 'typeorm';

export class ParametroDTO {
  id: number;

  parametro: string;

  valor: string;
}
