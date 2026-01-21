import { Test, TestingModule } from '@nestjs/testing';
import { DashboardExpose } from './dashboard-expose';
import { DashboardService } from '../../services/from-front/dashboard-service';
import { getDashboardTramiteReq, getDashboardRevisorReq } from '../../models/from-tables/dashboard-dto';
import { RESPONSE_CODES, INTERNAL_CODES, INTERNAL_MESSAGES } from '@principal/commons-module/proyecto/utils/messages-enum';

describe('DashboardExpose', () => {
  let expose: DashboardExpose;
  let dashboardService: DashboardService;

  const mockDashboardService = {
    getDashboardTramite: jest.fn(),
    getDashboardRevisor: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DashboardExpose,
        {
          provide: DashboardService,
          useValue: mockDashboardService,
        },
      ],
    }).compile();

    expose = module.get<DashboardExpose>(DashboardExpose);
    dashboardService = module.get<DashboardService>(DashboardService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(expose).toBeDefined();
  });

  describe('getDashboardTramite', () => {
    it('should return formatted tramite statistics', async () => {
      const request: getDashboardTramiteReq = {
        FechaInicio: '2026-01-01',
        FechaFin: '2026-01-31',
      };

      const mockData = {
        tramitesCreados: 50,
        recaudacionTotal: 5000,
        desglose: [
          {
            municipio: 'El Oro',
            licenciaTotal: 30,
            tipos: [
              { cantidad: 20, nombre: 'Primera vez', porcentaje: 66.67 },
              { cantidad: 10, nombre: 'Renovación', porcentaje: 33.33 },
            ],
          },
        ],
      };

      mockDashboardService.getDashboardTramite.mockResolvedValue(mockData);

      const result = await expose.getDashboardTramite(request);

      expect(result.code).toBe(RESPONSE_CODES.SUCCESFULL);
      expect(result.internalCode).toBe(INTERNAL_CODES.SUCCESFULL);
      expect(result.message).toBe(INTERNAL_MESSAGES.SUCCESFULL);
      expect(result.data).toEqual(mockData);
      expect(mockDashboardService.getDashboardTramite).toHaveBeenCalledWith(request);
    });
  });

  describe('getDashboardRevisor', () => {
    it('should return formatted revisor statistics', async () => {
      const request: getDashboardRevisorReq = {
        id: 7,
        FechaInicio: '2026-01-01',
        FechaFin: '2026-01-31',
      };

      const mockData = {
        Nombre: 'Juan Perez',
        Correo: 'juan@gmail.com',
        solicitudes: {
          Aprobado: 15,
          Rechazados: 3,
          'En Curso': 5,
        },
        idEstatus: 1,
        estatus: 'Activo',
      };

      mockDashboardService.getDashboardRevisor.mockResolvedValue(mockData);

      const result = await expose.getDashboardRevisor(request);

      expect(result.code).toBe(RESPONSE_CODES.SUCCESFULL);
      expect(result.internalCode).toBe(INTERNAL_CODES.SUCCESFULL);
      expect(result.message).toBe(INTERNAL_MESSAGES.SUCCESFULL);
      expect(result.data).toEqual(mockData);
      expect(mockDashboardService.getDashboardRevisor).toHaveBeenCalledWith(request);
    });
  });
});
