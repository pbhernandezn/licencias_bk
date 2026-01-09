import { Injectable } from "@nestjs/common";
import { SolicitudesTService } from "../from-tables/solicitudes-service";
import { ManejadorErrores } from "@principal/commons-module/proyecto/utils/manejador-errores";
import { CreateSolicitudRequest, getSolicitudByIdDTO, getSolicitudByIdEstatusReq, getSolicitudByIdReq, getSolicitudByIdTipoLicenciaReq, getSolicitudByIdUsuarioReq, getSolicitudesDTO, SolicitudesDTO } from "../../models/from-tables/solicitudes-dto";
import { QueryParams } from "@principal/commons-module/proyecto/utils/query-params";

@Injectable()
export class SolicitudesService {
    constructor(
        private readonly solicitudesTService: SolicitudesTService,
    ) { }

    public async getSolicitudes(): Promise<getSolicitudesDTO> {
        const queryParams = new QueryParams();
        const respuesta = await this.solicitudesTService.getSolicitudes(queryParams);
        if (!respuesta.solicitudesData || respuesta.solicitudesData.length === 0) {
            throw ManejadorErrores.getBusquedaVacia(
            'No se encontraron datos en las solicitudes. ',
            'TYPE-A-6a09d086-e7c1-4d36-8367-66bc832_sol1',
            );
        }

        return respuesta;
    }
        
    public async getSolicitudById(request: getSolicitudByIdReq): Promise<getSolicitudByIdDTO> {
        const respuesta = await this.solicitudesTService.getSolicitudById(request);
        if (!respuesta.existe) {
            throw ManejadorErrores.getBusquedaVacia(
            'No se encontro el dato de la solicitud. ',
            'TYPE-A-6a09d086-e7c1-4d36-8367-66bc832_sol2',
            );
        }
        return respuesta;
    }

    public async getSolicitudesByIdUsuario(request: getSolicitudByIdUsuarioReq): Promise<getSolicitudesDTO> {
        const respuesta = await this.solicitudesTService.getSolicitudesByIdUsuario(request);
        if (!respuesta.solicitudesData || respuesta.solicitudesData.length === 0) {
            throw ManejadorErrores.getBusquedaVacia(
            'No se encontraron datos en la solicitud por usuario. ',
            'TYPE-A-6a09d086-e7c1-4d36-8367-66bc832_sol1',
            );
        }

        return respuesta;
    }

    public async getSolicitudesByIdTipoLicencia(request: getSolicitudByIdTipoLicenciaReq): Promise<getSolicitudesDTO> {
       const respuesta = await this.solicitudesTService.getSolicitudesByIdTipoLicencia(request);
        if (!respuesta.solicitudesData || respuesta.solicitudesData.length === 0) {
            throw ManejadorErrores.getBusquedaVacia(
            'No se encontraron datos en la solicitud por tipo de licencia. ',
            'TYPE-A-6a09d086-e7c1-4d36-8367-66bc832_sol1',
            );
        }

        return respuesta;
    }

    public async getSolicitudesByIdEstatus(request: getSolicitudByIdEstatusReq): Promise<getSolicitudesDTO> {
        const respuesta = await this.solicitudesTService.getSolicitudesByIdEstatus(request);
        if (!respuesta.solicitudesData || respuesta.solicitudesData.length === 0) {
            throw ManejadorErrores.getBusquedaVacia(
            'No se encontraron datos en la solicitud por estatus. ',
            'TYPE-A-6a09d086-e7c1-4d36-8367-66bc832_sol1',
            );
        }

        return respuesta;
    }

    public async createSolicitud(payload: CreateSolicitudRequest): Promise<void> {
        await this.solicitudesTService.createSolicitud(payload);
      }
      
      
      public async updateSolicitud(id: number, payload: Partial<SolicitudesDTO>): Promise<void> {
        await this.solicitudesTService.updateSolicitud(id, payload);
      }
}