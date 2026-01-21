import { Test, TestingModule } from '@nestjs/testing';
import { RevisionesExpose } from './revisiones-expose';
import { RevisionesService } from '../../services/from-front/revisiones-service';
import { RESPONSE_CODES, INTERNAL_CODES, INTERNAL_MESSAGES } from '@principal/commons-module/proyecto/utils/messages-enum';

describe('RevisionesExpose', () => {
  let expose: RevisionesExpose;
  let revisionesService: RevisionesService;

  const mockRevisionesService = {
    getRevisiones: jest.fn(),
    getRevisionById: jest.fn(),
    getRevisionesBySolicitud: jest.fn(),
    getRevisionesByRevisor: jest.fn(),
    createRevision: jest.fn(),
    updateRevision: jest.fn(),
    deleteRevision: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RevisionesExpose,
        {
          provide: RevisionesService,
          useValue: mockRevisionesService,
        },
      ],
    }).compile();

    expose = module.get<RevisionesExpose>(RevisionesExpose);
    revisionesService = module.get<RevisionesService>(RevisionesService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('revisiones', () => {
    it('should return all revisiones', async () => {
      const mockResponse = {
        revisiones: [
          { id: 1, idsolicitud: 1, idrevisor: 1 },
          { id: 2, idsolicitud: 2, idrevisor: 2 },
        ],
      };

      mockRevisionesService.getRevisiones.mockResolvedValue(mockResponse);

      const result = await expose.revisiones();

      expect(result.code).toBe(RESPONSE_CODES.SUCCESFULL);
      expect(result.internalCode).toBe(INTERNAL_CODES.SUCCESFULL);
      expect(result.message).toBe(INTERNAL_MESSAGES.SUCCESFULL);
      expect(result.data).toEqual(mockResponse);
      expect(mockRevisionesService.getRevisiones).toHaveBeenCalledTimes(1);
    });
  });

  describe('revisionById', () => {
    it('should return revision by id', async () => {
      const request = { id: 1 };
      const mockResponse = {
        id: 1,
        idsolicitud: 1,
        idrevisor: 1,
        idestatus: 1,
      };

      mockRevisionesService.getRevisionById.mockResolvedValue(mockResponse);

      const result = await expose.revisionById(request);

      expect(result.code).toBe(RESPONSE_CODES.SUCCESFULL);
      expect(result.data).toEqual(mockResponse);
      expect(mockRevisionesService.getRevisionById).toHaveBeenCalledWith(request);
    });
  });

  describe('revisionesBySolicitud', () => {
    it('should return revisiones by solicitud id', async () => {
      const request = { idsolicitud: 1 };
      const mockResponse = {
        revisiones: [{ id: 1, idsolicitud: 1, idrevisor: 1 }],
      };

      mockRevisionesService.getRevisionesBySolicitud.mockResolvedValue(mockResponse);

      const result = await expose.revisionesBySolicitud(request);

      expect(result.code).toBe(RESPONSE_CODES.SUCCESFULL);
      expect(result.data).toEqual(mockResponse);
      expect(mockRevisionesService.getRevisionesBySolicitud).toHaveBeenCalledWith(request);
    });
  });

  describe('revisionesByRevisor', () => {
    it('should return revisiones by revisor id', async () => {
      const request = { idrevisor: 1 };
      const mockResponse = {
        revisiones: [{ id: 1, idsolicitud: 1, idrevisor: 1 }],
      };

      mockRevisionesService.getRevisionesByRevisor.mockResolvedValue(mockResponse);

      const result = await expose.revisionesByRevisor(request);

      expect(result.code).toBe(RESPONSE_CODES.SUCCESFULL);
      expect(result.data).toEqual(mockResponse);
      expect(mockRevisionesService.getRevisionesByRevisor).toHaveBeenCalledWith(request);
    });
  });

  describe('createRevision', () => {
    it('should create a revision', async () => {
      const request = {
        idsolicitud: 1,
        idrevisor: 1,
        idestatus: 1,
        fecharevision: '2024-01-01',
        comentarios: 'Revision inicial',
      };

      mockRevisionesService.createRevision.mockResolvedValue(undefined);

      const result = await expose.createRevision(request);

      expect(result.code).toBe(RESPONSE_CODES.SUCCESFULL);
      expect(result.internalCode).toBe(INTERNAL_CODES.SUCCESFULL);
      expect(result.message).toBe('Revisión creada exitosamente');
      expect(mockRevisionesService.createRevision).toHaveBeenCalledWith(request);
    });
  });

  describe('updateRevision', () => {
    it('should update a revision', async () => {
      const request = {
        id: 1,
        idestatus: 2,
        comentarios: 'Revision actualizada',
      };

      mockRevisionesService.updateRevision.mockResolvedValue(undefined);

      const result = await expose.updateRevision(request);

      expect(result.code).toBe(RESPONSE_CODES.SUCCESFULL);
      expect(result.internalCode).toBe(INTERNAL_CODES.SUCCESFULL);
      expect(result.message).toBe('Revisión actualizada exitosamente');
      expect(mockRevisionesService.updateRevision).toHaveBeenCalledWith(request);
    });
  });

  describe('deleteRevision', () => {
    it('should delete a revision', async () => {
      const request = { id: 1 };

      mockRevisionesService.deleteRevision.mockResolvedValue(undefined);

      const result = await expose.deleteRevision(request);

      expect(result.code).toBe(RESPONSE_CODES.SUCCESFULL);
      expect(result.internalCode).toBe(INTERNAL_CODES.SUCCESFULL);
      expect(result.message).toBe('Revisión eliminada exitosamente');
      expect(mockRevisionesService.deleteRevision).toHaveBeenCalledWith(request);
    });
  });
});
