import { Body, Controller, Post, UseGuards, Request } from '@nestjs/common';
import { ApiBody, ApiResponse, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { BaseResponse } from '@principal/commons-module/proyecto/models/base-response';
import { UsuariosExpose } from '@principal/core-module/proyecto/expose/from-front/usuarios-expose';
import { createUsuarioDTO, createUsuarioReq, getUsuarioByIdDTO, getUsuarioByIdReq, updateUsuarioDTO, updateUsuarioReq } from '@principal/core-module/proyecto/models/from-tables/usuarios-dto';
import axios from 'axios';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('Face')
@ApiBearerAuth('JWT-auth')
@UseGuards(JwtAuthGuard)
@Controller('/api/face')
export class FaceController {
    constructor(
        private readonly usuariosExpose: UsuariosExpose,
    ) { }

    @Post('/session')
    @ApiResponse({ status: 200, description: 'Sesión de liveness creada' })
    @ApiResponse({ status: 401, description: 'No autorizado' })
    async getUsuarioById(@Request() req): Promise<BaseResponse<any>> {


        var res: any;

        try {
            console.log(`${process.env.AZURE_FACE_ENDPOINT}/face/v1.2/livenessSessions`);
            const response = await axios.post(
                `${process.env.AZURE_FACE_ENDPOINT}/face/v1.2/livenessSessions`,
                {},
                {
                    headers: {
                        "Ocp-Apim-Subscription-Key": process.env.AZURE_FACE_KEY,
                        "Content-Type": "application/json",
                    },
                }
            );

            res.json({
                sessionId: response.data.sessionId,
                authToken: response.data.authToken,
            });
        } catch (err) {
            console.error(err?.response?.data || err.message);
            res.status(500).json({ error: "Error creando sesión de liveness" });
        }

        return res

    }

}
