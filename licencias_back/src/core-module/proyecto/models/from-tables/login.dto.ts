import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({
    example: 'draco.hanzo.hattori@yopmail.com',
    description: 'Correo',
    maxLength: 254,
  })
  username: string;

  @ApiProperty({
    example: 'Admin2024@',
    description: 'Contraseña del usuario',
    minLength: 8,
    maxLength: 128,
  })
  password: string;
}
