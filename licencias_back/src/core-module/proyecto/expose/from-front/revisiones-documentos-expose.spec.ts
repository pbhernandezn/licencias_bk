import { Test, TestingModule } from '@nestjs/testing';
import { RevisionesDocumentosExpose } from './revisiones-documentos-expose';
import { RevisionesDocumentosService } from '../../services/from-front/revisiones-documentos-service';
import { QueryParams } from '@principal/commons-module/proyecto/utils/query-params';
import { RESPONSE_CODES, INTERNAL_CODES } from '@principal/commons-module/proyecto/utils/messages-enum';

describe('RevisionesDocumentosExpose', () => {
  let expose: RevisionesDocumentosExpose;
  let revisionesDocumentosService: RevisionesDocumentosService;

  const mockRevisionesDocumentosService = {
    getRevisionesDocumentos: jest.fn(),
    getRevisionDocumentoById: jest.fn(),
    getRevisionesDocumentosByRevision: jest.fn(),
    getRevisionesDocumentosByDocumento: jest.fn(),
    createRevisionDocumentos: jest.fn(),
    updateRevisionDocumento: jest.fn(),
    deleteRevisionDocumento: jest.fn(),
    getRevisionConDocumentosCompleta: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RevisionesDocumentosExpose,
        {
          provide: RevisionesDocumentosService,
          useValue: mockRevisionesDocumentosService,
        },
      ],
    }).compile();

    expose = module.get<RevisionesDocumentosExpose>(RevisionesDocumentosExpose);
    revisionesDocumentosService = module.get<RevisionesDocumentosService>(RevisionesDocumentosService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getRevisionesDocumentos', () => {
    it('should return all revisiones documentos', async () => {
      const queryParams = new QueryParams();
      const mockResponse = {
        revisionesDocumentos: [
          { id: 1, idrevision: 1, iddocumento: 1 },
        ],
      };

      mockRevisionesDocumentosService.getRevisionesDocumentos.mockResolvedValue(mockResponse);

      const result = await expose.getRevisionesDocumentos(queryParams);

      expect(result.code).toBe(RESPONSE_CODES.SUCCESFULL);
      expect(result.internalCode).toBe(INTERNAL_CODES.SUCCESFULL);
      expect(result.message).toBe('Revisiones de documentos obtenidas exitosamente');
      expect(result.data).toEqual(mockResponse);
      expect(mockRevisionesDocumentosService.getRevisionesDocumentos).toHaveBeenCalledWith(queryParams);
    });
  });

  describe('getRevisionDocumentoById', () => {
    it('should return revision documento by id', async () => {
      const request = { id: 1 };
      const mockResponse = {
        id: 1,
        idrevision: 1,
        iddocumento: 1,
        aprobado: true,
      };

      mockRevisionesDocumentosService.getRevisionDocumentoById.mockResolvedValue(mockResponse);

      const result = await expose.getRevisionDocumentoById(request);

      expect(result.code).toBe(RESPONSE_CODES.SUCCESFULL);
      expect(result.message).toBe('Documento de revisión obtenido exitosamente');
      expect(result.data).toEqual(mockResponse);
      expect(mockRevisionesDocumentosService.getRevisionDocumentoById).toHaveBeenCalledWith(request);
    });
  });

  describe('getRevisionesDocumentosByRevision', () => {
    it('should return documentos by revision id', async () => {
      const request = { idrevision: 1 };
      const mockResponse = {
        revisionesDocumentos: [
          { id: 1, idrevision: 1, iddocumento: 1 },
        ],
      };

      mockRevisionesDocumentosService.getRevisionesDocumentosByRevision.mockResolvedValue(mockResponse);

      const result = await expose.getRevisionesDocumentosByRevision(request);

      expect(result.code).toBe(RESPONSE_CODES.SUCCESFULL);
      expect(result.message).toBe('Documentos de la revisión obtenidos exitosamente');
      expect(result.data).toEqual(mockResponse);
      expect(mockRevisionesDocumentosService.getRevisionesDocumentosByRevision).toHaveBeenCalledWith(request);
    });
  });

  describe('getRevisionesDocumentosByDocumento', () => {
    it('should return revisiones by documento id', async () => {
      const request = { iddocumento: 1 };
      const mockResponse = {
        revisionesDocumentos: [
          { id: 1, idrevision: 1, iddocumento: 1 },
        ],
      };

      mockRevisionesDocumentosService.getRevisionesDocumentosByDocumento.mockResolvedValue(mockResponse);

      const result = await expose.getRevisionesDocumentosByDocumento(request);

      expect(result.code).toBe(RESPONSE_CODES.SUCCESFULL);
      expect(result.message).toBe('Historial de revisiones del documento obtenido exitosamente');
      expect(result.data).toEqual(mockResponse);
      expect(mockRevisionesDocumentosService.getRevisionesDocumentosByDocumento).toHaveBeenCalledWith(request);
    });
  });

  describe('createRevisionDocumentos', () => {
    it('should create revision documentos', async () => {
      const request = {
        idrevision: 1,
        documentos: [
          {
            iddocumento: 1,
            idestatus: 1,
            aprobado: true,
            comentarios: 'Aprobado',
          },
        ],
      };

      mockRevisionesDocumentosService.createRevisionDocumentos.mockResolvedValue(undefined);

      const result = await expose.createRevisionDocumentos(request);

      expect(result.code).toBe(RESPONSE_CODES.SUCCESFULL);
      expect(result.internalCode).toBe(INTERNAL_CODES.SUCCESFULL);
      expect(result.message).toBe('Documentos de revisión creados exitosamente');
      expect(result.data).toBe(null);
      expect(mockRevisionesDocumentosService.createRevisionDocumentos).toHaveBeenCalledWith(request);
    });
  });

  describe('updateRevisionDocumento', () => {
    it('should update revision documento', async () => {
      const request = {
        id: 1,
        idestatus: 2,
        aprobado: false,
        comentarios: 'Rechazado',
      };

      mockRevisionesDocumentosService.updateRevisionDocumento.mockResolvedValue(undefined);

      const result = await expose.updateRevisionDocumento(request);

      expect(result.code).toBe(RESPONSE_CODES.SUCCESFULL);
      expect(result.internalCode).toBe(INTERNAL_CODES.SUCCESFULL);
      expect(result.message).toBe('Documento de revisión actualizado exitosamente');
      expect(result.data).toBe(null);
      expect(mockRevisionesDocumentosService.updateRevisionDocumento).toHaveBeenCalledWith(request);
    });
  });

  describe('deleteRevisionDocumento', () => {
    it('should delete revision documento', async () => {
      const request = { id: 1 };

      mockRevisionesDocumentosService.deleteRevisionDocumento.mockResolvedValue(undefined);

      const result = await expose.deleteRevisionDocumento(request);

      expect(result.code).toBe(RESPONSE_CODES.SUCCESFULL);
      expect(result.internalCode).toBe(INTERNAL_CODES.SUCCESFULL);
      expect(result.message).toBe('Documento de revisión eliminado exitosamente');
      expect(result.data).toBe(null);
      expect(mockRevisionesDocumentosService.deleteRevisionDocumento).toHaveBeenCalledWith(request);
    });
  });

  describe('getRevisionConDocumentosCompleta', () => {
    it('should return complete revision with documents', async () => {
      const idrevision = 1;
      const mockResponse = {
        idrevision: 1,
        idsolicitud: 1,
        documentos: [
          { iddocumento: 1, aprobado: true, comentarios: 'OK' },
        ],
      };

      mockRevisionesDocumentosService.getRevisionConDocumentosCompleta.mockResolvedValue(mockResponse);

      const result = await expose.getRevisionConDocumentosCompleta(idrevision);

      expect(result.code).toBe(RESPONSE_CODES.SUCCESFULL);
      expect(result.internalCode).toBe(INTERNAL_CODES.SUCCESFULL);
      expect(result.message).toBe('Revisión completa con documentos obtenida exitosamente');
      expect(result.data).toEqual(mockResponse);
      expect(mockRevisionesDocumentosService.getRevisionConDocumentosCompleta).toHaveBeenCalledWith(idrevision);
    });
  });
});
