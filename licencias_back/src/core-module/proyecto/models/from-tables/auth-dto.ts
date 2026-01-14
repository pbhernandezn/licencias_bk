import { ApiProperty } from "@nestjs/swagger";



export class LoginReq {
    @ApiProperty({ description: 'Username o correo del usuario', example: 'juan.perez@example.com' })
    username: string;
    @ApiProperty({ description: 'Contraseña encriptada y reducida', example: 'password123' })
    password: string;
}

