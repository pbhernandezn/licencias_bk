import { Test, TestingModule } from '@nestjs/testing';
import { DocumentosController } from './documentos-controller';
import { DocumentosExpose } from '@principal/core-module/proyecto/expose/from-front/documentos-expose';

describe('DocumentosController', () => {
  let controller: DocumentosController;
  let documentosExpose: DocumentosExpose;

  const mockDocumentosExpose = {
    documentos: jest.fn(),
    documentoById: jest.fn(),
    documentosByUsuario: jest.fn(),
    documentosBySolicitud: jest.fn(),
    createDocumento: jest.fn(),
    downloadDocumento: jest.fn(),
    updateDocumento: jest.fn(),
    deleteDocumento: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DocumentosController],
      providers: [
        {
          provide: DocumentosExpose,
          useValue: mockDocumentosExpose,
        },
      ],
    }).compile();

    controller = module.get<DocumentosController>(DocumentosController);
    documentosExpose = module.get<DocumentosExpose>(DocumentosExpose);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getDocumentos', () => {
    it('should return all documentos', async () => {
      const mockResponse = {
        code: 'S0000',
        internalCode: 'I0000',
        message: 'Successful',
        data: {
          documentos: [
            { id: 1, idsolicitud: 1, iddocumento: 1 },
          ],
        },
      };

      mockDocumentosExpose.documentos.mockResolvedValue(mockResponse);

      const result = await controller.getDocumentos({} as any);

      expect(result).toEqual(mockResponse);
      expect(mockDocumentosExpose.documentos).toHaveBeenCalledTimes(1);
    });
  });

  describe('getDocumentoById', () => {
    it('should return a documento by id', async () => {
      const request = { id: 1 };
      const mockResponse = {
        code: 'S0000',
        internalCode: 'I0000',
        message: 'Successful',
        data: {
          id: 1,
          idsolicitud: 1,
          iddocumento: 1,
          url: 'https://example.com/doc.pdf',
        },
      };

      mockDocumentosExpose.documentoById.mockResolvedValue(mockResponse);

      const result = await controller.getDocumentoById(request, {} as any);

      expect(result).toEqual(mockResponse);
      expect(mockDocumentosExpose.documentoById).toHaveBeenCalledWith(request);
    });
  });

  describe('getDocumentosByUsuario', () => {
    it('should return documentos by user id', async () => {
      const request = { idusuario: 1 };
      const mockResponse = {
        code: 'S0000',
        internalCode: 'I0000',
        message: 'Successful',
        data: {
          documentos: [
            { id: 1, idsolicitud: 1, iddocumento: 1 },
          ],
        },
      };

      mockDocumentosExpose.documentosByUsuario.mockResolvedValue(mockResponse);

      const result = await controller.getDocumentosByUsuario(request, {} as any);

      expect(result).toEqual(mockResponse);
      expect(mockDocumentosExpose.documentosByUsuario).toHaveBeenCalledWith(request);
    });
  });

  describe('getDocumentosBySolicitud', () => {
    it('should return documentos by solicitud id', async () => {
      const request = { idsolicitud: 1 };
      const mockResponse = {
        code: 'S0000',
        internalCode: 'I0000',
        message: 'Successful',
        data: {
          documentos: [
            { id: 1, idsolicitud: 1, iddocumento: 1 },
          ],
        },
      };

      mockDocumentosExpose.documentosBySolicitud.mockResolvedValue(mockResponse);

      const result = await controller.getDocumentosBySolicitud(request, {} as any);

      expect(result).toEqual(mockResponse);
      expect(mockDocumentosExpose.documentosBySolicitud).toHaveBeenCalledWith(request);
    });
  });

  describe('createDocumento', () => {
    it('should create a new documento', async () => {
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

      const mockResponse = {
        code: 'S0000',
        internalCode: 'I0000',
        message: 'Successful',
        data: {
          id: 1,
          url: 'https://example.com/doc.pdf',
        },
      };

      mockDocumentosExpose.createDocumento.mockResolvedValue(mockResponse);

      const result = await controller.createDocumento(request, {} as any);

      expect(result).toEqual(mockResponse);
      expect(mockDocumentosExpose.createDocumento).toHaveBeenCalledWith(request);
    });
  });

  describe('downloadDocumento', () => {
    it('should download a documento', async () => {
      const request = { id: 1 };
      const mockBuffer = Buffer.from('file content');
      
      mockDocumentosExpose.downloadDocumento.mockResolvedValue({
        buffer: mockBuffer,
        nombreoriginal: 'document.pdf',
        formato: 'pdf',
      });

      const mockResponse = {
        set: jest.fn(),
      };

      await controller.downloadDocumento(request, mockResponse as any, {} as any);

      expect(mockDocumentosExpose.downloadDocumento).toHaveBeenCalledWith(request);
      expect(mockResponse.set).toHaveBeenCalledWith({
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="document.pdf"',
      });
    });
  });

  describe('updateDocumento', () => {
    it('should update a documento', async () => {
      const request = {
        id: 1,
        nombre: 'Updated Name',
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

      mockDocumentosExpose.updateDocumento.mockResolvedValue(mockResponse);

      const result = await controller.updateDocumento(request, {} as any);

      expect(result).toEqual(mockResponse);
      expect(mockDocumentosExpose.updateDocumento).toHaveBeenCalledWith(request);
    });
  });

  describe('deleteDocumento', () => {
    it('should delete a documento', async () => {
      const request = { id: 1 };

      const mockResponse = {
        code: 'S0000',
        internalCode: 'I0000',
        message: 'Successful',
        data: {
          eliminado: true,
        },
      };

      mockDocumentosExpose.deleteDocumento.mockResolvedValue(mockResponse);

      const result = await controller.deleteDocumento(request, {} as any);

      expect(result).toEqual(mockResponse);
      expect(mockDocumentosExpose.deleteDocumento).toHaveBeenCalledWith(request);
    });
  });
});
