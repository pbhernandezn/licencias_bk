import { Test, TestingModule } from '@nestjs/testing';
import { RevisionesController } from './revisiones-controller';
import { RevisionesExpose } from '@principal/core-module/proyecto/expose/from-front/revisiones-expose';

describe('RevisionesController', () => {
  let controller: RevisionesController;
  let revisionesExpose: RevisionesExpose;

  const mockRevisionesExpose = {
    revisiones: jest.fn(),
    revisionById: jest.fn(),
    revisionesBySolicitud: jest.fn(),
    revisionesByRevisor: jest.fn(),
    createRevision: jest.fn(),
    updateRevision: jest.fn(),
    deleteRevision: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RevisionesController],
      providers: [
        {
          provide: RevisionesExpose,
          useValue: mockRevisionesExpose,
        },
      ],
    }).compile();

    controller = module.get<RevisionesController>(RevisionesController);
    revisionesExpose = module.get<RevisionesExpose>(RevisionesExpose);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getRevisiones', () => {
    it('should return all revisiones', async () => {
      const mockResponse = {
        code: 'S0000',
        internalCode: 'I0000',
        message: 'Successful',
        data: {
          revisiones: [
            { id: 1, idsolicitud: 1, idrevisor: 1 },
          ],
        },
      };

      mockRevisionesExpose.revisiones.mockResolvedValue(mockResponse);

      const result = await controller.getRevisiones({} as any);

      expect(result).toEqual(mockResponse);
      expect(mockRevisionesExpose.revisiones).toHaveBeenCalledTimes(1);
    });
  });

  describe('getRevisionById', () => {
    it('should return a revision by id', async () => {
      const request = { id: 1 };
      const mockResponse = {
        code: 'S0000',
        internalCode: 'I0000',
        message: 'Successful',
        data: {
          id: 1,
          idsolicitud: 1,
          idrevisor: 1,
        },
      };

      mockRevisionesExpose.revisionById.mockResolvedValue(mockResponse);

      const result = await controller.getRevisionById(request, {} as any);

      expect(result).toEqual(mockResponse);
      expect(mockRevisionesExpose.revisionById).toHaveBeenCalledWith(request);
    });
  });

  describe('getRevisionesBySolicitud', () => {
    it('should return revisiones by solicitud id', async () => {
      const request = { idsolicitud: 1 };
      const mockResponse = {
        code: 'S0000',
        internalCode: 'I0000',
        message: 'Successful',
        data: {
          revisiones: [
            { id: 1, idsolicitud: 1, idrevisor: 1 },
          ],
        },
      };

      mockRevisionesExpose.revisionesBySolicitud.mockResolvedValue(mockResponse);

      const result = await controller.getRevisionesBySolicitud(request, {} as any);

      expect(result).toEqual(mockResponse);
      expect(mockRevisionesExpose.revisionesBySolicitud).toHaveBeenCalledWith(request);
    });
  });

  describe('getRevisionesByRevisor', () => {
    it('should return revisiones by revisor id', async () => {
      const request = { idrevisor: 1 };
      const mockResponse = {
        code: 'S0000',
        internalCode: 'I0000',
        message: 'Successful',
        data: {
          revisiones: [
            { id: 1, idsolicitud: 1, idrevisor: 1 },
          ],
        },
      };

      mockRevisionesExpose.revisionesByRevisor.mockResolvedValue(mockResponse);

      const result = await controller.getRevisionesByRevisor(request, {} as any);

      expect(result).toEqual(mockResponse);
      expect(mockRevisionesExpose.revisionesByRevisor).toHaveBeenCalledWith(request);
    });
  });

  describe('createRevision', () => {
    it('should create a new revision', async () => {
      const request = {
        idsolicitud: 1,
        idrevisor: 1,
        comentarios: 'Revision completa',
        idestatus: 1,
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

      mockRevisionesExpose.createRevision.mockResolvedValue(mockResponse);

      const result = await controller.createRevision(request, {} as any);

      expect(result).toEqual(mockResponse);
      expect(mockRevisionesExpose.createRevision).toHaveBeenCalledWith(request);
    });
  });

  describe('updateRevision', () => {
    it('should update a revision', async () => {
      const request = {
        id: 1,
        comentarios: 'Revision actualizada',
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

      mockRevisionesExpose.updateRevision.mockResolvedValue(mockResponse);

      const result = await controller.updateRevision(request, {} as any);

      expect(result).toEqual(mockResponse);
      expect(mockRevisionesExpose.updateRevision).toHaveBeenCalledWith(request);
    });
  });

  describe('deleteRevision', () => {
    it('should delete a revision', async () => {
      const request = { id: 1 };

      const mockResponse = {
        code: 'S0000',
        internalCode: 'I0000',
        message: 'Successful',
        data: {
          eliminado: true,
        },
      };

      mockRevisionesExpose.deleteRevision.mockResolvedValue(mockResponse);

      const result = await controller.deleteRevision(request, {} as any);

      expect(result).toEqual(mockResponse);
      expect(mockRevisionesExpose.deleteRevision).toHaveBeenCalledWith(request);
    });
  });
});
