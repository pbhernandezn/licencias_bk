import { Test, TestingModule } from '@nestjs/testing';
import { SolicitudesController } from './solicitudes-controller';
import { SolicitudesExpose } from '@principal/core-module/proyecto/expose/from-front/solicitudes-expose';

describe('SolicitudesController', () => {
  let controller: SolicitudesController;
  let solicitudesExpose: SolicitudesExpose;

  const mockSolicitudesExpose = {
    solicitudes: jest.fn(),
    solicitudById: jest.fn(),
    solicitudesByIdUsuario: jest.fn(),
    solicitudesByIdTipoLicencia: jest.fn(),
    solicitudesByIdEstatus: jest.fn(),
    createSolicitud: jest.fn(),
    updateSolicitud: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SolicitudesController],
      providers: [
        {
          provide: SolicitudesExpose,
          useValue: mockSolicitudesExpose,
        },
      ],
    }).compile();

    controller = module.get<SolicitudesController>(SolicitudesController);
    solicitudesExpose = module.get<SolicitudesExpose>(SolicitudesExpose);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getSolicitudes', () => {
    it('should return all solicitudes', async () => {
      const mockResponse = {
        code: 'S0000',
        internalCode: 'I0000',
        message: 'Successful',
        data: {
          solicitudes: [
            { id: 1, idusuario: 1, idtipolicencia: 1 },
            { id: 2, idusuario: 2, idtipolicencia: 2 },
          ],
        },
      };

      mockSolicitudesExpose.solicitudes.mockResolvedValue(mockResponse);

      const result = await controller.getSolicitudes({} as any);

      expect(result).toEqual(mockResponse);
      expect(mockSolicitudesExpose.solicitudes).toHaveBeenCalledTimes(1);
    });
  });

  describe('getSolicitudById', () => {
    it('should return a solicitud by id', async () => {
      const request = { id: 1 };
      const mockResponse = {
        code: 'S0000',
        internalCode: 'I0000',
        message: 'Successful',
        data: {
          id: 1,
          idusuario: 1,
          idtipolicencia: 1,
        },
      };

      mockSolicitudesExpose.solicitudById.mockResolvedValue(mockResponse);

      const result = await controller.getSolicitudById(request, {} as any);

      expect(result).toEqual(mockResponse);
      expect(mockSolicitudesExpose.solicitudById).toHaveBeenCalledWith(request);
    });
  });

  describe('getSolicitudByIdUsuario', () => {
    it('should return solicitudes by user id', async () => {
      const request = { idUsuario: 1 };
      const mockResponse = {
        code: 'S0000',
        internalCode: 'I0000',
        message: 'Successful',
        data: {
          solicitudes: [
            { id: 1, idusuario: 1, idtipolicencia: 1 },
          ],
        },
      };

      mockSolicitudesExpose.solicitudesByIdUsuario.mockResolvedValue(mockResponse);

      const result = await controller.getSolicitudByIdUsuario(request, {} as any);

      expect(result).toEqual(mockResponse);
      expect(mockSolicitudesExpose.solicitudesByIdUsuario).toHaveBeenCalledWith(request);
    });
  });

  describe('getSolicitudByIdTipoLicencia', () => {
    it('should return solicitudes by license type', async () => {
      const request = { idTipoLicencia: 1 };
      const mockResponse = {
        code: 'S0000',
        internalCode: 'I0000',
        message: 'Successful',
        data: {
          solicitudes: [
            { id: 1, idusuario: 1, idtipolicencia: 1 },
          ],
        },
      };

      mockSolicitudesExpose.solicitudesByIdTipoLicencia.mockResolvedValue(mockResponse);

      const result = await controller.getSolicitudByIdTipoLicencia(request, {} as any);

      expect(result).toEqual(mockResponse);
      expect(mockSolicitudesExpose.solicitudesByIdTipoLicencia).toHaveBeenCalledWith(request);
    });
  });

  describe('getSolicitudByIdEstatus', () => {
    it('should return solicitudes by status', async () => {
      const request = { idEstatus: 1 };
      const mockResponse = {
        code: 'S0000',
        internalCode: 'I0000',
        message: 'Successful',
        data: {
          solicitudes: [
            { id: 1, idusuario: 1, idestatus: 1 },
          ],
        },
      };

      mockSolicitudesExpose.solicitudesByIdEstatus.mockResolvedValue(mockResponse);

      const result = await controller.getSolicitudByIdEstatus(request, {} as any);

      expect(result).toEqual(mockResponse);
      expect(mockSolicitudesExpose.solicitudesByIdEstatus).toHaveBeenCalledWith(request);
    });
  });

  describe('createSolicitud', () => {
    it('should create a new solicitud', async () => {
      const request = {
        idusuario: 1,
        idtipolicencia: 1,
        idestatus: 1,
        idmetodopago: 1,
      };

      const mockResponse = {
        code: 'S0000',
        internalCode: 'I0000',
        message: 'Successful',
        data: {
          id: 1,
          ...request,
        },
      };

      mockSolicitudesExpose.createSolicitud.mockResolvedValue(mockResponse);

      const result = await controller.createSolicitud(request, {} as any);

      expect(result).toEqual(mockResponse);
      expect(mockSolicitudesExpose.createSolicitud).toHaveBeenCalledWith(request);
    });
  });

  describe('updateSolicitud', () => {
    it('should update a solicitud', async () => {
      const request = {
        idsolicitud: 1,
        idestatus: 2,
      };

      const mockResponse = {
        code: 'S0000',
        internalCode: 'I0000',
        message: 'Successful',
        data: {
          id: 1,
          actualizado: true,
        },
      };

      mockSolicitudesExpose.updateSolicitud.mockResolvedValue(mockResponse);

      const result = await controller.updateSolicitud(request, {} as any);

      expect(result).toEqual(mockResponse);
      expect(mockSolicitudesExpose.updateSolicitud).toHaveBeenCalledWith(request);
    });
  });
});
