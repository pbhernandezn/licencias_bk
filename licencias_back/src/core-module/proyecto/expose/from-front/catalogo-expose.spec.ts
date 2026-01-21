import { Test, TestingModule } from '@nestjs/testing';
import { CatalogoExpose } from './catalogo-expose';
import { CatalogoService } from '../../services/from-front/catalogo-services';
import { RESPONSE_CODES, INTERNAL_CODES, INTERNAL_MESSAGES } from '@principal/commons-module/proyecto/utils/messages-enum';

describe('CatalogoExpose', () => {
  let expose: CatalogoExpose;
  let catalogoService: CatalogoService;

  const mockCatalogoService = {
    getCatUsuarios: jest.fn(),
    getCatUsuarioById: jest.fn(),
    getLocalidadByCP: jest.fn(),
    getCatCPById: jest.fn(),
    getCatDocumentos: jest.fn(),
    getCatDocumentosById: jest.fn(),
    getCatEstatusByTabla: jest.fn(),
    getCatEstatusById: jest.fn(),
    getCatLicenciasByLicencia: jest.fn(),
    getCatLicenciaById: jest.fn(),
    getCatLicencias: jest.fn(),
    getCatLugares: jest.fn(),
    getCatLugaresById: jest.fn(),
    getCatPruebas: jest.fn(),
    getCatPruebaById: jest.fn(),
    getCatVigencias: jest.fn(),
    getCatVigenciaById: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CatalogoExpose,
        {
          provide: CatalogoService,
          useValue: mockCatalogoService,
        },
      ],
    }).compile();

    expose = module.get<CatalogoExpose>(CatalogoExpose);
    catalogoService = module.get<CatalogoService>(CatalogoService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('catUsuarios', () => {
    it('should return all cat usuarios', async () => {
      const mockResponse = [
        { id: 1, tipo: 'Tramitador', descripcion: 'Usuario que tramita' },
        { id: 2, tipo: 'Revisor', descripcion: 'Usuario que revisa' },
      ];

      mockCatalogoService.getCatUsuarios.mockResolvedValue(mockResponse);

      const result = await expose.catUsuarios();

      expect(result.code).toBe(RESPONSE_CODES.SUCCESFULL);
      expect(result.internalCode).toBe(INTERNAL_CODES.SUCCESFULL);
      expect(result.message).toBe(INTERNAL_MESSAGES.SUCCESFULL);
      expect(result.data).toEqual(mockResponse);
      expect(mockCatalogoService.getCatUsuarios).toHaveBeenCalledTimes(1);
    });
  });

  describe('catUsuariosById', () => {
    it('should return cat usuario by id', async () => {
      const request = { id: 1 };
      const mockResponse = {
        existe: true,
        id: 1,
        tipo: 'Tramitador',
      };

      mockCatalogoService.getCatUsuarioById.mockResolvedValue(mockResponse);

      const result = await expose.catUsuariosById(request);

      expect(result.code).toBe(RESPONSE_CODES.SUCCESFULL);
      expect(result.data).toEqual(mockResponse);
      expect(mockCatalogoService.getCatUsuarioById).toHaveBeenCalledWith(request);
    });
  });

  describe('catLocalidadByCP', () => {
    it('should return localidades by CP', async () => {
      const request = { cp: '12345' };
      const mockResponse = {
        localidades: [
          { id: 1, nombre: 'Colonia Centro' },
        ],
      };

      mockCatalogoService.getLocalidadByCP.mockResolvedValue(mockResponse);

      const result = await expose.catLocalidadByCP(request);

      expect(result.code).toBe(RESPONSE_CODES.SUCCESFULL);
      expect(result.data).toEqual(mockResponse);
      expect(mockCatalogoService.getLocalidadByCP).toHaveBeenCalledWith(request);
    });
  });

  describe('catCPById', () => {
    it('should return CP by id', async () => {
      const request = { id: 1 };
      const mockResponse = {
        existe: true,
        id: 1,
        cp: '12345',
      };

      mockCatalogoService.getCatCPById.mockResolvedValue(mockResponse);

      const result = await expose.catCPById(request);

      expect(result.code).toBe(RESPONSE_CODES.SUCCESFULL);
      expect(result.data).toEqual(mockResponse);
      expect(mockCatalogoService.getCatCPById).toHaveBeenCalledWith(request);
    });
  });

  describe('catDocumentos', () => {
    it('should return all cat documentos', async () => {
      const mockResponse = [
        { id: 1, nombre: 'INE', descripcion: 'Identificación oficial' },
        { id: 2, nombre: 'CURP', descripcion: 'Clave única' },
      ];

      mockCatalogoService.getCatDocumentos.mockResolvedValue(mockResponse);

      const result = await expose.catDocumentos();

      expect(result.code).toBe(RESPONSE_CODES.SUCCESFULL);
      expect(result.data).toEqual(mockResponse);
      expect(mockCatalogoService.getCatDocumentos).toHaveBeenCalledTimes(1);
    });
  });

  describe('catDocumentosById', () => {
    it('should return cat documento by id', async () => {
      const request = { id: 1 };
      const mockResponse = {
        existe: true,
        id: 1,
        nombre: 'INE',
      };

      mockCatalogoService.getCatDocumentosById.mockResolvedValue(mockResponse);

      const result = await expose.catDocumentosById(request);

      expect(result.code).toBe(RESPONSE_CODES.SUCCESFULL);
      expect(result.data).toEqual(mockResponse);
      expect(mockCatalogoService.getCatDocumentosById).toHaveBeenCalledWith(request);
    });
  });

  describe('catEstatusByTabla', () => {
    it('should return estatus by tabla', async () => {
      const request = { tabla: 'solicitudes' };
      const mockResponse = {
        estatus: [
          { id: 1, nombre: 'Pendiente' },
          { id: 2, nombre: 'Aprobado' },
        ],
      };

      mockCatalogoService.getCatEstatusByTabla.mockResolvedValue(mockResponse);

      const result = await expose.catEstatusByTabla(request);

      expect(result.code).toBe(RESPONSE_CODES.SUCCESFULL);
      expect(result.data).toEqual(mockResponse);
      expect(mockCatalogoService.getCatEstatusByTabla).toHaveBeenCalledWith(request);
    });
  });

  describe('catEstatusById', () => {
    it('should return estatus by id', async () => {
      const request = { id: 1 };
      const mockResponse = {
        existe: true,
        id: 1,
        nombre: 'Pendiente',
      };

      mockCatalogoService.getCatEstatusById.mockResolvedValue(mockResponse);

      const result = await expose.catEstatusById(request);

      expect(result.code).toBe(RESPONSE_CODES.SUCCESFULL);
      expect(result.data).toEqual(mockResponse);
      expect(mockCatalogoService.getCatEstatusById).toHaveBeenCalledWith(request);
    });
  });

  describe('catLicenciasByLicencia', () => {
    it('should return licencias by licencia', async () => {
      const request = { licencia: 'A' };
      const mockResponse = {
        licencias: [
          { id: 1, tipo: 'A', descripcion: 'Automovilista' },
        ],
      };

      mockCatalogoService.getCatLicenciasByLicencia.mockResolvedValue(mockResponse);

      const result = await expose.catLicenciasByLicencia(request);

      expect(result.code).toBe(RESPONSE_CODES.SUCCESFULL);
      expect(result.data).toEqual(mockResponse);
      expect(mockCatalogoService.getCatLicenciasByLicencia).toHaveBeenCalledWith(request);
    });
  });

  describe('catLicenciaById', () => {
    it('should return licencia by id', async () => {
      const request = { id: 1 };
      const mockResponse = {
        existe: true,
        id: 1,
        tipo: 'A',
      };

      mockCatalogoService.getCatLicenciaById.mockResolvedValue(mockResponse);

      const result = await expose.catLicenciaById(request);

      expect(result.code).toBe(RESPONSE_CODES.SUCCESFULL);
      expect(result.data).toEqual(mockResponse);
      expect(mockCatalogoService.getCatLicenciaById).toHaveBeenCalledWith(request);
    });
  });

  describe('catLicencias', () => {
    it('should return all cat licencias', async () => {
      const mockResponse = [
        { id: 1, tipo: 'A', descripcion: 'Automovilista' },
        { id: 2, tipo: 'B', descripcion: 'Motociclista' },
      ];

      mockCatalogoService.getCatLicencias.mockResolvedValue(mockResponse);

      const result = await expose.catLicencias();

      expect(result.code).toBe(RESPONSE_CODES.SUCCESFULL);
      expect(result.data).toEqual(mockResponse);
      expect(mockCatalogoService.getCatLicencias).toHaveBeenCalledTimes(1);
    });
  });

  describe('catLugares', () => {
    it('should return all cat lugares', async () => {
      const mockResponse = [
        { id: 1, nombre: 'Centro de Atención Norte' },
        { id: 2, nombre: 'Centro de Atención Sur' },
      ];

      mockCatalogoService.getCatLugares.mockResolvedValue(mockResponse);

      const result = await expose.catLugares();

      expect(result.code).toBe(RESPONSE_CODES.SUCCESFULL);
      expect(result.data).toEqual(mockResponse);
      expect(mockCatalogoService.getCatLugares).toHaveBeenCalledTimes(1);
    });
  });

  describe('catLugarById', () => {
    it('should return lugar by id', async () => {
      const request = { id: 1 };
      const mockResponse = {
        existe: true,
        id: 1,
        nombre: 'Centro de Atención Norte',
      };

      mockCatalogoService.getCatLugaresById.mockResolvedValue(mockResponse);

      const result = await expose.catLugarById(request);

      expect(result.code).toBe(RESPONSE_CODES.SUCCESFULL);
      expect(result.data).toEqual(mockResponse);
      expect(mockCatalogoService.getCatLugaresById).toHaveBeenCalledWith(request);
    });
  });

  describe('catPrueba', () => {
    it('should return all cat pruebas', async () => {
      const mockResponse = [
        { id: 1, nombre: 'Teórica', descripcion: 'Examen teórico' },
        { id: 2, nombre: 'Práctica', descripcion: 'Examen práctico' },
      ];

      mockCatalogoService.getCatPruebas.mockResolvedValue(mockResponse);

      const result = await expose.catPrueba();

      expect(result.code).toBe(RESPONSE_CODES.SUCCESFULL);
      expect(result.data).toEqual(mockResponse);
      expect(mockCatalogoService.getCatPruebas).toHaveBeenCalledTimes(1);
    });
  });

  describe('catPruebaById', () => {
    it('should return prueba by id', async () => {
      const request = { id: 1 };
      const mockResponse = {
        existe: true,
        id: 1,
        nombre: 'Teórica',
      };

      mockCatalogoService.getCatPruebaById.mockResolvedValue(mockResponse);

      const result = await expose.catPruebaById(request);

      expect(result.code).toBe(RESPONSE_CODES.SUCCESFULL);
      expect(result.data).toEqual(mockResponse);
      expect(mockCatalogoService.getCatPruebaById).toHaveBeenCalledWith(request);
    });
  });

  describe('catVigencia', () => {
    it('should return all cat vigencias', async () => {
      const mockResponse = [
        { id: 1, vigencia: '3 años', descripcion: 'Vigencia estándar' },
        { id: 2, vigencia: '5 años', descripcion: 'Vigencia extendida' },
      ];

      mockCatalogoService.getCatVigencias.mockResolvedValue(mockResponse);

      const result = await expose.catVigencia();

      expect(result.code).toBe(RESPONSE_CODES.SUCCESFULL);
      expect(result.data).toEqual(mockResponse);
      expect(mockCatalogoService.getCatVigencias).toHaveBeenCalledTimes(1);
    });
  });

  describe('catVigenciaById', () => {
    it('should return vigencia by id', async () => {
      const request = { id: 1 };
      const mockResponse = {
        existe: true,
        id: 1,
        vigencia: '3 años',
      };

      mockCatalogoService.getCatVigenciaById.mockResolvedValue(mockResponse);

      const result = await expose.catVigenciaById(request);

      expect(result.code).toBe(RESPONSE_CODES.SUCCESFULL);
      expect(result.data).toEqual(mockResponse);
      expect(mockCatalogoService.getCatVigenciaById).toHaveBeenCalledWith(request);
    });
  });
});
