import { Test, TestingModule } from '@nestjs/testing';
import { RevisionesDocumentosController } from './revisiones-documentos-controller';
import { RevisionesDocumentosExpose } from '@principal/core-module/proyecto/expose/from-front/revisiones-documentos-expose';

describe('RevisionesDocumentosController', () => {
  let controller: RevisionesDocumentosController;
  let revisionesDocumentosExpose: RevisionesDocumentosExpose;

  const mockRevisionesDocumentosExpose = {
    getRevisionesDocumentos: jest.fn(),
    getRevisionDocumentoById: jest.fn(),
    getRevisionesDocumentosByRevision: jest.fn(),
    getRevisionesDocumentosByDocumento: jest.fn(),
    createRevisionDocumentos: jest.fn(),
    createRevisionDocumento: jest.fn(),
    updateRevisionDocumento: jest.fn(),
    deleteRevisionDocumento: jest.fn(),
    getRevisionCompleta: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RevisionesDocumentosController],
      providers: [
        {
          provide: RevisionesDocumentosExpose,
          useValue: mockRevisionesDocumentosExpose,
        },
      ],
    }).compile();

    controller = module.get<RevisionesDocumentosController>(RevisionesDocumentosController);
    revisionesDocumentosExpose = module.get<RevisionesDocumentosExpose>(RevisionesDocumentosExpose);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getRevisionesDocumentos', () => {
    it('should return all revisiones documentos', async () => {
      const mockResponse = {
        code: 'S0000',
        internalCode: 'I0000',
        message: 'Successful',
        data: {
          revisionesDocumentos: [
            { id: 1, idrevision: 1, iddocumento: 1 },
          ],
        },
      };

      mockRevisionesDocumentosExpose.getRevisionesDocumentos.mockResolvedValue(mockResponse);

      const result = await controller.getRevisionesDocumentos({} as any);

      expect(result).toEqual(mockResponse);
      expect(mockRevisionesDocumentosExpose.getRevisionesDocumentos).toHaveBeenCalled();
    });
  });

  describe('getRevisionDocumentoById', () => {
    it('should return a revision documento by id', async () => {
      const request = { id: 1 };
      const mockResponse = {
        code: 'S0000',
        internalCode: 'I0000',
        message: 'Successful',
        data: {
          id: 1,
          idrevision: 1,
          iddocumento: 1,
        },
      };

      mockRevisionesDocumentosExpose.getRevisionDocumentoById.mockResolvedValue(mockResponse);

      const result = await controller.getRevisionDocumentoById(request, {} as any);

      expect(result).toEqual(mockResponse);
      expect(mockRevisionesDocumentosExpose.getRevisionDocumentoById).toHaveBeenCalledWith(request);
    });
  });

  describe('getRevisionesDocumentosByRevision', () => {
    it('should return revisiones documentos by revision id', async () => {
      const request = { idrevision: 1 };
      const mockResponse = {
        code: 'S0000',
        internalCode: 'I0000',
        message: 'Successful',
        data: {
          revisionesDocumentos: [
            { id: 1, idrevision: 1, iddocumento: 1 },
          ],
        },
      };

      mockRevisionesDocumentosExpose.getRevisionesDocumentosByRevision.mockResolvedValue(mockResponse);

      const result = await controller.getRevisionesDocumentosByRevision(request, {} as any);

      expect(result).toEqual(mockResponse);
      expect(mockRevisionesDocumentosExpose.getRevisionesDocumentosByRevision).toHaveBeenCalledWith(request);
    });
  });

  describe('getRevisionesDocumentosByDocumento', () => {
    it('should return revisiones documentos by documento id', async () => {
      const request = { iddocumento: 1 };
      const mockResponse = {
        code: 'S0000',
        internalCode: 'I0000',
        message: 'Successful',
        data: {
          revisionesDocumentos: [
            { id: 1, idrevision: 1, iddocumento: 1 },
          ],
        },
      };

      mockRevisionesDocumentosExpose.getRevisionesDocumentosByDocumento.mockResolvedValue(mockResponse);

      const result = await controller.getRevisionesDocumentosByDocumento(request, {} as any);

      expect(result).toEqual(mockResponse);
      expect(mockRevisionesDocumentosExpose.getRevisionesDocumentosByDocumento).toHaveBeenCalledWith(request);
    });
  });

  describe('createRevisionDocumentos', () => {
    it('should create a new revision documento', async () => {
      const request = {
        idrevision: 1,
        documentos: [
          {
            iddocumento: 1,
            idestatus: 1,
            aprobado: true,
            comentarios: 'Documento aprobado',
          },
        ],
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

      mockRevisionesDocumentosExpose.createRevisionDocumentos.mockResolvedValue(mockResponse);

      const result = await controller.createRevisionDocumentos(request, {} as any);

      expect(result).toEqual(mockResponse);
      expect(mockRevisionesDocumentosExpose.createRevisionDocumentos).toHaveBeenCalledWith(request);
    });
  });

  describe('updateRevisionDocumento', () => {
    it('should update a revision documento', async () => {
      const request = {
        id: 1,
        comentarios: 'Actualizado',
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

      mockRevisionesDocumentosExpose.updateRevisionDocumento.mockResolvedValue(mockResponse);

      const result = await controller.updateRevisionDocumento(request, {} as any);

      expect(result).toEqual(mockResponse);
      expect(mockRevisionesDocumentosExpose.updateRevisionDocumento).toHaveBeenCalledWith(request);
    });
  });

  describe('deleteRevisionDocumento', () => {
    it('should delete a revision documento', async () => {
      const request = { id: 1 };

      const mockResponse = {
        code: 'S0000',
        internalCode: 'I0000',
        message: 'Successful',
        data: {
          eliminado: true,
        },
      };

      mockRevisionesDocumentosExpose.deleteRevisionDocumento.mockResolvedValue(mockResponse);

      const result = await controller.deleteRevisionDocumento(request, {} as any);

      expect(result).toEqual(mockResponse);
      expect(mockRevisionesDocumentosExpose.deleteRevisionDocumento).toHaveBeenCalledWith(request);
    });
  });

});
