import { Test, TestingModule } from '@nestjs/testing';
import { SolicitudesExpose } from './solicitudes-expose';
import { SolicitudesService } from '../../services/from-front/solicitudes-service';
import { RESPONSE_CODES, INTERNAL_CODES, INTERNAL_MESSAGES } from '@principal/commons-module/proyecto/utils/messages-enum';

describe('SolicitudesExpose', () => {
  let expose: SolicitudesExpose;
  let solicitudesService: SolicitudesService;

  const mockSolicitudesService = {
    getSolicitudes: jest.fn(),
    getSolicitudById: jest.fn(),
    getSolicitudesByIdUsuario: jest.fn(),
    getSolicitudesByIdTipoLicencia: jest.fn(),
    getSolicitudesByIdEstatus: jest.fn(),
    createSolicitud: jest.fn(),
    updateSolicitud: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SolicitudesExpose,
        {
          provide: SolicitudesService,
          useValue: mockSolicitudesService,
        },
      ],
    }).compile();

    expose = module.get<SolicitudesExpose>(SolicitudesExpose);
    solicitudesService = module.get<SolicitudesService>(SolicitudesService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('solicitudes', () => {
    it('should return all solicitudes', async () => {
      const mockResponse = {
        solicitudes: [
          { id: 1, idusuario: 1, idtipolicencia: 1 },
          { id: 2, idusuario: 2, idtipolicencia: 2 },
        ],
      };

      mockSolicitudesService.getSolicitudes.mockResolvedValue(mockResponse);

      const result = await expose.solicitudes();

      expect(result.code).toBe(RESPONSE_CODES.SUCCESFULL);
      expect(result.internalCode).toBe(INTERNAL_CODES.SUCCESFULL);
      expect(result.message).toBe(INTERNAL_MESSAGES.SUCCESFULL);
      expect(result.data).toEqual(mockResponse);
      expect(mockSolicitudesService.getSolicitudes).toHaveBeenCalledTimes(1);
    });
  });

  describe('solicitudById', () => {
    it('should return solicitud by id', async () => {
      const request = { id: 1 };
      const mockResponse = {
        id: 1,
        idusuario: 1,
        idtipolicencia: 1,
        idestatus: 1,
      };

      mockSolicitudesService.getSolicitudById.mockResolvedValue(mockResponse);

      const result = await expose.solicitudById(request);

      expect(result.code).toBe(RESPONSE_CODES.SUCCESFULL);
      expect(result.data).toEqual(mockResponse);
      expect(mockSolicitudesService.getSolicitudById).toHaveBeenCalledWith(request);
    });
  });

  describe('solicitudesByIdUsuario', () => {
    it('should return solicitudes by usuario id', async () => {
      const request = { idUsuario: 1 };
      const mockResponse = {
        solicitudes: [{ id: 1, idusuario: 1, idtipolicencia: 1 }],
      };

      mockSolicitudesService.getSolicitudesByIdUsuario.mockResolvedValue(mockResponse);

      const result = await expose.solicitudesByIdUsuario(request);

      expect(result.code).toBe(RESPONSE_CODES.SUCCESFULL);
      expect(result.data).toEqual(mockResponse);
      expect(mockSolicitudesService.getSolicitudesByIdUsuario).toHaveBeenCalledWith(request);
    });
  });

  describe('solicitudesByIdTipoLicencia', () => {
    it('should return solicitudes by tipo licencia', async () => {
      const request = { idTipoLicencia: 1 };
      const mockResponse = {
        solicitudes: [{ id: 1, idusuario: 1, idtipolicencia: 1 }],
      };

      mockSolicitudesService.getSolicitudesByIdTipoLicencia.mockResolvedValue(mockResponse);

      const result = await expose.solicitudesByIdTipoLicencia(request);

      expect(result.code).toBe(RESPONSE_CODES.SUCCESFULL);
      expect(result.data).toEqual(mockResponse);
      expect(mockSolicitudesService.getSolicitudesByIdTipoLicencia).toHaveBeenCalledWith(request);
    });
  });

  describe('solicitudesByIdEstatus', () => {
    it('should return solicitudes by estatus', async () => {
      const request = { idEstatus: 1 };
      const mockResponse = {
        solicitudes: [{ id: 1, idusuario: 1, idestatus: 1 }],
      };

      mockSolicitudesService.getSolicitudesByIdEstatus.mockResolvedValue(mockResponse);

      const result = await expose.solicitudesByIdEstatus(request);

      expect(result.code).toBe(RESPONSE_CODES.SUCCESFULL);
      expect(result.data).toEqual(mockResponse);
      expect(mockSolicitudesService.getSolicitudesByIdEstatus).toHaveBeenCalledWith(request);
    });
  });

  describe('createSolicitud', () => {
    it('should create a solicitud', async () => {
      const request = {
        idusuario: 1,
        idtipolicencia: 1,
        idestatus: 1,
        idmetodopago: 1,
        fechasolicitud: '2024-01-01',
      };

      mockSolicitudesService.createSolicitud.mockResolvedValue(undefined);

      const result = await expose.createSolicitud(request);

      expect(result.code).toBe(RESPONSE_CODES.SUCCESFULL);
      expect(result.internalCode).toBe(INTERNAL_CODES.SUCCESFULL);
      expect(result.message).toBe(INTERNAL_MESSAGES.SUCCESFULL);
      expect(mockSolicitudesService.createSolicitud).toHaveBeenCalledWith(request);
    });
  });

  describe('updateSolicitud', () => {
    it('should update a solicitud', async () => {
      const request = {
        idsolicitud: 1,
        idestatus: 2,
      };

      mockSolicitudesService.updateSolicitud.mockResolvedValue(undefined);

      const result = await expose.updateSolicitud(request);

      expect(result.code).toBe(RESPONSE_CODES.SUCCESFULL);
      expect(result.internalCode).toBe(INTERNAL_CODES.SUCCESFULL);
      expect(result.message).toBe(INTERNAL_MESSAGES.SUCCESFULL);
      expect(mockSolicitudesService.updateSolicitud).toHaveBeenCalledWith(request);
    });
  });
});
