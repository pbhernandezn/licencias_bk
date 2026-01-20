import { Test, TestingModule } from '@nestjs/testing';
import { DashboardController } from './dashboard-controller';
import { DashboardExpose } from '@principal/core-module/proyecto/expose/from-front/dashboard-expose';
import { getDashboardTramiteReq, getDashboardRevisorReq } from '@principal/core-module/proyecto/models/from-tables/dashboard-dto';
import { BaseResponse } from '@principal/commons-module/proyecto/models/base-response';

describe('DashboardController', () => {
  let controller: DashboardController;
  let dashboardExpose: DashboardExpose;

  const mockDashboardExpose = {
    getDashboardTramite: jest.fn(),
    getDashboardRevisor: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DashboardController],
      providers: [
        {
          provide: DashboardExpose,
          useValue: mockDashboardExpose,
        },
      ],
    }).compile();

    controller = module.get<DashboardController>(DashboardController);
    dashboardExpose = module.get<DashboardExpose>(DashboardExpose);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getDashboardTramite', () => {
    it('should return tramites statistics', async () => {
      const request: getDashboardTramiteReq = {
        FechaInicio: '2026-01-01',
        FechaFin: '2026-01-31',
      };

      const mockResponse = {
        code: 'S0000',
        internalCode: 'I0000',
        message: 'Successful',
        data: {
          tramitesCreados: 10,
          recaudacionTotal: 1000,
          desglose: [
            {
              municipio: 'El Oro',
              licenciaTotal: 10,
              tipos: [
                {
                  cantidad: 6,
                  nombre: 'Primera vez',
                  porcentaje: 60,
                },
                {
                  cantidad: 4,
                  nombre: 'Renovación',
                  porcentaje: 40,
                },
              ],
            },
          ],
        },
      };

      mockDashboardExpose.getDashboardTramite.mockResolvedValue(mockResponse);

      const result = await controller.getDashboardTramite(request, {} as any);

      expect(result).toEqual(mockResponse);
      expect(mockDashboardExpose.getDashboardTramite).toHaveBeenCalledWith(request);
      expect(mockDashboardExpose.getDashboardTramite).toHaveBeenCalledTimes(1);
    });

    it('should handle date range requests', async () => {
      const request: getDashboardTramiteReq = {
        FechaInicio: '2025-12-01',
        FechaFin: '2025-12-31',
      };

      const mockResponse = {
        code: 'S0000',
        internalCode: 'I0000',
        message: 'Successful',
        data: {
          tramitesCreados: 0,
          recaudacionTotal: 0,
          desglose: [],
        },
      };

      mockDashboardExpose.getDashboardTramite.mockResolvedValue(mockResponse);

      const result = await controller.getDashboardTramite(request, {} as any);

      expect(result).toEqual(mockResponse);
      expect(mockDashboardExpose.getDashboardTramite).toHaveBeenCalledWith(request);
    });
  });

  describe('getDashboardRevisor', () => {
    it('should return revisor statistics', async () => {
      const request: getDashboardRevisorReq = {
        id: 7,
        FechaInicio: '2026-01-01',
        FechaFin: '2026-01-31',
      };

      const mockResponse = {
        code: 'S0000',
        internalCode: 'I0000',
        message: 'Successful',
        data: {
          Nombre: 'Juan Perez',
          Correo: 'juan@gmail.com',
          solicitudes: {
            Aprobado: 10,
            Rechazados: 5,
            'En Curso': 2,
          },
          idEstatus: 1,
          estatus: 'Activo',
        },
      };

      mockDashboardExpose.getDashboardRevisor.mockResolvedValue(mockResponse);

      const result = await controller.getDashboardRevisor(request, {} as any);

      expect(result).toEqual(mockResponse);
      expect(mockDashboardExpose.getDashboardRevisor).toHaveBeenCalledWith(request);
      expect(mockDashboardExpose.getDashboardRevisor).toHaveBeenCalledTimes(1);
    });

    it('should handle revisor with no reviews', async () => {
      const request: getDashboardRevisorReq = {
        id: 10,
        FechaInicio: '2026-01-01',
        FechaFin: '2026-01-31',
      };

      const mockResponse = {
        code: 'S0000',
        internalCode: 'I0000',
        message: 'Successful',
        data: {
          Nombre: 'Maria Lopez',
          Correo: 'maria@gmail.com',
          solicitudes: {},
          idEstatus: 1,
          estatus: 'Activo',
        },
      };

      mockDashboardExpose.getDashboardRevisor.mockResolvedValue(mockResponse);

      const result = await controller.getDashboardRevisor(request, {} as any);

      expect(result).toEqual(mockResponse);
      expect(mockDashboardExpose.getDashboardRevisor).toHaveBeenCalledWith(request);
    });
  });
});
