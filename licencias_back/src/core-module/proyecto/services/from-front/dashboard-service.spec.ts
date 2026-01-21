import { Test, TestingModule } from '@nestjs/testing';
import { DashboardService } from './dashboard-service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SolicitudesEntity } from '../../models/entities/solicitudes-entity';
import { UsuariosEntity } from '../../models/entities/usuarios-entity';
import { RevisionesEntity } from '../../models/entities/revisiones-entity';
import { getDashboardTramiteReq, getDashboardRevisorReq } from '../../models/from-tables/dashboard-dto';
import { AccesoNoAutorizado } from '@principal/commons-module/proyecto/utils/errores/acceso-no-autorizado';

describe('DashboardService', () => {
  let service: DashboardService;
  let solicitudesRepository: Repository<SolicitudesEntity>;
  let usuariosRepository: Repository<UsuariosEntity>;
  let revisionesRepository: Repository<RevisionesEntity>;

  const mockQueryBuilder = {
    innerJoin: jest.fn().mockReturnThis(),
    innerJoinAndSelect: jest.fn().mockReturnThis(),
    where: jest.fn().mockReturnThis(),
    andWhere: jest.fn().mockReturnThis(),
    select: jest.fn().mockReturnThis(),
    groupBy: jest.fn().mockReturnThis(),
    addGroupBy: jest.fn().mockReturnThis(),
    getRawMany: jest.fn(),
    getRawOne: jest.fn(),
  };

  const mockSolicitudesRepository = {
    createQueryBuilder: jest.fn(() => mockQueryBuilder),
  };

  const mockUsuariosRepository = {
    createQueryBuilder: jest.fn(() => mockQueryBuilder),
  };

  const mockRevisionesRepository = {
    createQueryBuilder: jest.fn(() => mockQueryBuilder),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DashboardService,
        {
          provide: getRepositoryToken(SolicitudesEntity),
          useValue: mockSolicitudesRepository,
        },
        {
          provide: getRepositoryToken(UsuariosEntity),
          useValue: mockUsuariosRepository,
        },
        {
          provide: getRepositoryToken(RevisionesEntity),
          useValue: mockRevisionesRepository,
        },
      ],
    }).compile();

    service = module.get<DashboardService>(DashboardService);
    solicitudesRepository = module.get<Repository<SolicitudesEntity>>(
      getRepositoryToken(SolicitudesEntity),
    );
    usuariosRepository = module.get<Repository<UsuariosEntity>>(
      getRepositoryToken(UsuariosEntity),
    );
    revisionesRepository = module.get<Repository<RevisionesEntity>>(
      getRepositoryToken(RevisionesEntity),
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getDashboardTramite', () => {
    it('should return tramites statistics grouped by municipio and tipo', async () => {
      const request: getDashboardTramiteReq = {
        FechaInicio: '2026-01-01',
        FechaFin: '2026-01-31',
      };

      const mockRawData = [
        { municipio: 'El Oro', descripcion: 'Primera vez', precio: '100', cantidad: '20' },
        { municipio: 'El Oro', descripcion: 'Renovación', precio: '80', cantidad: '10' },
        { municipio: 'Toluca', descripcion: 'Primera vez', precio: '100', cantidad: '15' },
      ];

      mockQueryBuilder.getRawMany.mockResolvedValue(mockRawData);

      const result = await service.getDashboardTramite(request);

      expect(result).toHaveProperty('tramitesCreados', 45);
      expect(result).toHaveProperty('recaudacionTotal', 4300);
      expect(result.desglose).toHaveLength(2);
      expect(result.desglose[0]).toHaveProperty('municipio');
      expect(result.desglose[0]).toHaveProperty('licenciaTotal');
      expect(result.desglose[0]).toHaveProperty('tipos');
      expect(result.desglose[0].tipos[0]).toHaveProperty('porcentaje');
    });

    it('should handle empty results', async () => {
      const request: getDashboardTramiteReq = {
        FechaInicio: '2025-01-01',
        FechaFin: '2025-01-31',
      };

      mockQueryBuilder.getRawMany.mockResolvedValue([]);

      const result = await service.getDashboardTramite(request);

      expect(result.tramitesCreados).toBe(0);
      expect(result.recaudacionTotal).toBe(0);
      expect(result.desglose).toHaveLength(0);
    });

    it('should calculate percentages correctly', async () => {
      const request: getDashboardTramiteReq = {
        FechaInicio: '2026-01-01',
        FechaFin: '2026-01-31',
      };

      const mockRawData = [
        { municipio: 'El Oro', descripcion: 'Primera vez', precio: '100', cantidad: '30' },
        { municipio: 'El Oro', descripcion: 'Renovación', precio: '80', cantidad: '15' },
      ];

      mockQueryBuilder.getRawMany.mockResolvedValue(mockRawData);

      const result = await service.getDashboardTramite(request);

      const elOroMunicipio = result.desglose.find(d => d.municipio === 'El Oro');
      expect(elOroMunicipio).toBeDefined();
      expect(elOroMunicipio.licenciaTotal).toBe(45);
      
      const primeraVez = elOroMunicipio.tipos.find(t => t.nombre === 'Primera vez');
      expect(primeraVez.porcentaje).toBeCloseTo(66.67, 2);
      
      const renovacion = elOroMunicipio.tipos.find(t => t.nombre === 'Renovación');
      expect(renovacion.porcentaje).toBeCloseTo(33.33, 2);
    });
  });

  describe('getDashboardRevisor', () => {
    it('should return revisor statistics', async () => {
      const request: getDashboardRevisorReq = {
        id: 7,
        FechaInicio: '2026-01-01',
        FechaFin: '2026-01-31',
      };

      const mockUsuarioData = {
        id: 7,
        nombres: 'Juan',
        apellidopaterno: 'Perez',
        apellidomaterno: 'Garcia',
        email: 'juan@gmail.com',
        idestatus: 1,
        tipousuario: 'Revisor',
        estatus: 'Activo',
      };

      const mockRevisionesData = [
        { estatus: 'Aprobado', cantidad: '10' },
        { estatus: 'Rechazados', cantidad: '5' },
        { estatus: 'En Curso', cantidad: '2' },
      ];

      mockQueryBuilder.getRawOne.mockResolvedValue(mockUsuarioData);
      mockQueryBuilder.getRawMany.mockResolvedValue(mockRevisionesData);

      const result = await service.getDashboardRevisor(request);

      expect(result.Nombre).toBe('Juan Perez Garcia');
      expect(result.Correo).toBe('juan@gmail.com');
      expect(result.solicitudes.Aprobado).toBe(10);
      expect(result.solicitudes.Rechazados).toBe(5);
      expect(result.solicitudes['En Curso']).toBe(2);
      expect(result.idEstatus).toBe(1);
      expect(result.estatus).toBe('Activo');
    });

    it('should throw error if user not found', async () => {
      const request: getDashboardRevisorReq = {
        id: 999,
        FechaInicio: '2026-01-01',
        FechaFin: '2026-01-31',
      };

      mockQueryBuilder.getRawOne.mockResolvedValue(null);

      await expect(service.getDashboardRevisor(request)).rejects.toThrow();
    });

    it('should throw AccesoNoAutorizado if user is not Revisor', async () => {
      const request: getDashboardRevisorReq = {
        id: 7,
        FechaInicio: '2026-01-01',
        FechaFin: '2026-01-31',
      };

      const mockUsuarioData = {
        id: 7,
        nombres: 'Juan',
        apellidopaterno: 'Perez',
        apellidomaterno: null,
        email: 'juan@gmail.com',
        idestatus: 1,
        tipousuario: 'Usuario',
        estatus: 'Activo',
      };

      mockQueryBuilder.getRawOne.mockResolvedValue(mockUsuarioData);

      await expect(service.getDashboardRevisor(request)).rejects.toThrow(AccesoNoAutorizado);
    });

    it('should handle revisor with no reviews', async () => {
      const request: getDashboardRevisorReq = {
        id: 7,
        FechaInicio: '2026-01-01',
        FechaFin: '2026-01-31',
      };

      const mockUsuarioData = {
        id: 7,
        nombres: 'Juan',
        apellidopaterno: 'Perez',
        apellidomaterno: null,
        email: 'juan@gmail.com',
        idestatus: 1,
        tipousuario: 'Revisor',
        estatus: 'Activo',
      };

      mockQueryBuilder.getRawOne.mockResolvedValue(mockUsuarioData);
      mockQueryBuilder.getRawMany.mockResolvedValue([]);

      const result = await service.getDashboardRevisor(request);

      expect(result.Nombre).toBe('Juan Perez');
      expect(result.solicitudes).toEqual({});
    });

    it('should format full name correctly with apellidomaterno', async () => {
      const request: getDashboardRevisorReq = {
        id: 7,
        FechaInicio: '2026-01-01',
        FechaFin: '2026-01-31',
      };

      const mockUsuarioData = {
        id: 7,
        nombres: 'Maria',
        apellidopaterno: 'Lopez',
        apellidomaterno: 'Martinez',
        email: 'maria@gmail.com',
        idestatus: 1,
        tipousuario: 'Revisor',
        estatus: 'Activo',
      };

      mockQueryBuilder.getRawOne.mockResolvedValue(mockUsuarioData);
      mockQueryBuilder.getRawMany.mockResolvedValue([]);

      const result = await service.getDashboardRevisor(request);

      expect(result.Nombre).toBe('Maria Lopez Martinez');
    });

    it('should format full name correctly without apellidomaterno', async () => {
      const request: getDashboardRevisorReq = {
        id: 7,
        FechaInicio: '2026-01-01',
        FechaFin: '2026-01-31',
      };

      const mockUsuarioData = {
        id: 7,
        nombres: 'Pedro',
        apellidopaterno: 'Sanchez',
        apellidomaterno: null,
        email: 'pedro@gmail.com',
        idestatus: 1,
        tipousuario: 'Revisor',
        estatus: 'Activo',
      };

      mockQueryBuilder.getRawOne.mockResolvedValue(mockUsuarioData);
      mockQueryBuilder.getRawMany.mockResolvedValue([]);

      const result = await service.getDashboardRevisor(request);

      expect(result.Nombre).toBe('Pedro Sanchez');
    });
  });
});
