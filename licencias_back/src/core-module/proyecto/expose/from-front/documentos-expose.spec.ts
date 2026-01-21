import { Test, TestingModule } from '@nestjs/testing';
import { DocumentosExpose } from './documentos-expose';
import { DocumentosService } from '../../services/from-front/documentos-service';
import { RESPONSE_CODES, INTERNAL_CODES, INTERNAL_MESSAGES } from '@principal/commons-module/proyecto/utils/messages-enum';

describe('DocumentosExpose', () => {
  let expose: DocumentosExpose;
  let documentosService: DocumentosService;

  const mockDocumentosService = {
    getDocumentos: jest.fn(),
    getDocumentoById: jest.fn(),
    getDocumentosByUsuario: jest.fn(),
    getDocumentosBySolicitud: jest.fn(),
    createDocumento: jest.fn(),
    downloadDocumento: jest.fn(),
    deleteDocumento: jest.fn(),
    updateDocumento: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DocumentosExpose,
        {
          provide: DocumentosService,
          useValue: mockDocumentosService,
        },
      ],
    }).compile();

    expose = module.get<DocumentosExpose>(DocumentosExpose);
    documentosService = module.get<DocumentosService>(DocumentosService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('documentos', () => {
    it('should return all documentos', async () => {
      const mockResponse = {
        documentos: [
          { id: 1, idusuario: 1, idsolicitud: 1, idtipodocumento: 1 },
          { id: 2, idusuario: 2, idsolicitud: 2, idtipodocumento: 2 },
        ],
      };

      mockDocumentosService.getDocumentos.mockResolvedValue(mockResponse);

      const result = await expose.documentos();

      expect(result.code).toBe(RESPONSE_CODES.SUCCESFULL);
      expect(result.internalCode).toBe(INTERNAL_CODES.SUCCESFULL);
      expect(result.message).toBe(INTERNAL_MESSAGES.SUCCESFULL);
      expect(result.data).toEqual(mockResponse);
      expect(mockDocumentosService.getDocumentos).toHaveBeenCalledTimes(1);
    });
  });

  describe('documentoById', () => {
    it('should return documento by id', async () => {
      const request = { id: 1 };
      const mockResponse = {
        id: 1,
        idusuario: 1,
        idsolicitud: 1,
        idtipodocumento: 1,
        formato: 'pdf',
      };

      mockDocumentosService.getDocumentoById.mockResolvedValue(mockResponse);

      const result = await expose.documentoById(request);

      expect(result.code).toBe(RESPONSE_CODES.SUCCESFULL);
      expect(result.data).toEqual(mockResponse);
      expect(mockDocumentosService.getDocumentoById).toHaveBeenCalledWith(request);
    });
  });

  describe('documentosByUsuario', () => {
    it('should return documentos by usuario id', async () => {
      const request = { idusuario: 1 };
      const mockResponse = {
        documentos: [{ id: 1, idusuario: 1, idsolicitud: 1 }],
      };

      mockDocumentosService.getDocumentosByUsuario.mockResolvedValue(mockResponse);

      const result = await expose.documentosByUsuario(request);

      expect(result.code).toBe(RESPONSE_CODES.SUCCESFULL);
      expect(result.data).toEqual(mockResponse);
      expect(mockDocumentosService.getDocumentosByUsuario).toHaveBeenCalledWith(request);
    });
  });

  describe('documentosBySolicitud', () => {
    it('should return documentos by solicitud id', async () => {
      const request = { idsolicitud: 1 };
      const mockResponse = {
        documentos: [{ id: 1, idusuario: 1, idsolicitud: 1 }],
      };

      mockDocumentosService.getDocumentosBySolicitud.mockResolvedValue(mockResponse);

      const result = await expose.documentosBySolicitud(request);

      expect(result.code).toBe(RESPONSE_CODES.SUCCESFULL);
      expect(result.data).toEqual(mockResponse);
      expect(mockDocumentosService.getDocumentosBySolicitud).toHaveBeenCalledWith(request);
    });
  });

  describe('createDocumento', () => {
    it('should create a documento', async () => {
      const request = {
        idusuario: 1,
        idsolicitud: 1,
        idtipodocumento: 1,
        formato: 'pdf',
        nombreoriginal: 'INE.pdf',
        nombre: 'INE',
        tamanio: 1024,
        archivoBase64: 'base64string',
        file: {} as any,
      };

      mockDocumentosService.createDocumento.mockResolvedValue(undefined);

      const result = await expose.createDocumento(request);

      expect(result.code).toBe(RESPONSE_CODES.SUCCESFULL);
      expect(result.internalCode).toBe(INTERNAL_CODES.SUCCESFULL);
      expect(result.message).toBe('Documento creado y subido a Azure Blob Storage exitosamente');
      expect(mockDocumentosService.createDocumento).toHaveBeenCalledWith(request);
    });
  });

  describe('downloadDocumento', () => {
    it('should download a documento', async () => {
      const request = { id: 1 };
      const mockResponse = {
        buffer: Buffer.from('test'),
        nombreoriginal: 'document.pdf',
        formato: 'pdf',
      };

      mockDocumentosService.downloadDocumento.mockResolvedValue(mockResponse);

      const result = await expose.downloadDocumento(request);

      expect(result).toEqual(mockResponse);
      expect(mockDocumentosService.downloadDocumento).toHaveBeenCalledWith(request);
    });
  });

  describe('deleteDocumento', () => {
    it('should delete a documento', async () => {
      const request = { id: 1 };

      mockDocumentosService.deleteDocumento.mockResolvedValue(undefined);

      const result = await expose.deleteDocumento(request);

      expect(result.code).toBe(RESPONSE_CODES.SUCCESFULL);
      expect(result.internalCode).toBe(INTERNAL_CODES.SUCCESFULL);
      expect(result.message).toBe('Documento eliminado exitosamente de Azure Blob Storage y base de datos');
      expect(mockDocumentosService.deleteDocumento).toHaveBeenCalledWith(request);
    });
  });

  describe('updateDocumento', () => {
    it('should update a documento', async () => {
      const request = {
        id: 1,
        formato: 'pdf',
        nombreoriginal: 'INE_updated.pdf',
        nombre: 'INE Updated',
        tamanio: 2048,
        archivoBase64: 'newbase64string',
        file: {} as any,
      };

      mockDocumentosService.updateDocumento.mockResolvedValue(undefined);

      const result = await expose.updateDocumento(request);

      expect(result.code).toBe(RESPONSE_CODES.SUCCESFULL);
      expect(result.internalCode).toBe(INTERNAL_CODES.SUCCESFULL);
      expect(result.message).toBe('Documento actualizado exitosamente en Azure Blob Storage y base de datos');
      expect(mockDocumentosService.updateDocumento).toHaveBeenCalledWith(request);
    });
  });
});
