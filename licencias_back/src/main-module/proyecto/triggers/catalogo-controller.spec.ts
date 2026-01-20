import { Test, TestingModule } from '@nestjs/testing';
import { CatalogoController } from './catalogo-controller';
import { CatalogoExpose } from '@principal/core-module/proyecto/expose/from-front/catalogo-expose';

describe('CatalogoController', () => {
  let controller: CatalogoController;
  let catalogoExpose: CatalogoExpose;

  const mockCatalogoExpose = {
    catUsuarios: jest.fn(),
    catUsuariosById: jest.fn(),
    catLocalidadByCP: jest.fn(),
    catCPById: jest.fn(),
    catDocumentos: jest.fn(),
    catDocumentoById: jest.fn(),
    catEstatusByTabla: jest.fn(),
    catEstatusById: jest.fn(),
    catLicenciasByLicencia: jest.fn(),
    catLicenciaById: jest.fn(),
    catLicencias: jest.fn(),
    catLugares: jest.fn(),
    catLugarById: jest.fn(),
    catPrueba: jest.fn(),
    catPruebaById: jest.fn(),
    catVigencia: jest.fn(),
    catVigenciaById: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CatalogoController],
      providers: [
        {
          provide: CatalogoExpose,
          useValue: mockCatalogoExpose,
        },
      ],
    }).compile();

    controller = module.get<CatalogoController>(CatalogoController);
    catalogoExpose = module.get<CatalogoExpose>(CatalogoExpose);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('catUsuarios', () => {
    it('should return all cat usuarios', async () => {
      const mockResponse = {
        code: 'S0000',
        internalCode: 'I0000',
        message: 'Successful',
        data: [
          { id: 1, usuario: 'Admin', descripcion: 'Administrador' },
          { id: 2, usuario: 'Revisor', descripcion: 'Revisor' },
        ],
      };

      mockCatalogoExpose.catUsuarios.mockResolvedValue(mockResponse);

      const result = await controller.catUsuarios();

      expect(result).toEqual(mockResponse);
      expect(mockCatalogoExpose.catUsuarios).toHaveBeenCalledTimes(1);
    });
  });

  describe('getUsuarioById', () => {
    it('should return a cat usuario by id', async () => {
      const request = { id: 1 };
      const mockResponse = {
        code: 'S0000',
        internalCode: 'I0000',
        message: 'Successful',
        data: {
          id: 1,
          usuario: 'Admin',
          descripcion: 'Administrador',
        },
      };

      mockCatalogoExpose.catUsuariosById.mockResolvedValue(mockResponse);

      const result = await controller.getUsuarioById(request);

      expect(result).toEqual(mockResponse);
      expect(mockCatalogoExpose.catUsuariosById).toHaveBeenCalledWith(request);
    });
  });

  describe('getLocalidadByCP', () => {
    it('should return localidades by CP', async () => {
      const request = { cp: '50600' };
      const mockResponse = {
        code: 'S0000',
        internalCode: 'I0000',
        message: 'Successful',
        data: {
          localidades: [
            { cp: 50600, municipio: 'El Oro', localidad: 'Centro' },
          ],
        },
      };

      mockCatalogoExpose.catLocalidadByCP.mockResolvedValue(mockResponse);

      const result = await controller.getLocalidadByCP(request);

      expect(result).toEqual(mockResponse);
      expect(mockCatalogoExpose.catLocalidadByCP).toHaveBeenCalledWith(request);
    });
  });

  describe('catDocumentos', () => {
    it('should return all cat documentos', async () => {
      const mockResponse = {
        code: 'S0000',
        internalCode: 'I0000',
        message: 'Successful',
        data: [
          { id: 1, documento: 'INE', descripcion: 'Identificación oficial' },
        ],
      };

      mockCatalogoExpose.catDocumentos.mockResolvedValue(mockResponse);

      const result = await controller.catDocumentos();

      expect(result).toEqual(mockResponse);
      expect(mockCatalogoExpose.catDocumentos).toHaveBeenCalledTimes(1);
    });
  });

  describe('catLicencias', () => {
    it('should return all cat licencias', async () => {
      const mockResponse = {
        code: 'S0000',
        internalCode: 'I0000',
        message: 'Successful',
        data: [
          { id: 1, licencia: 'A', descripcion: 'Motocicleta' },
          { id: 2, licencia: 'B', descripcion: 'Automóvil' },
        ],
      };

      mockCatalogoExpose.catLicencias.mockResolvedValue(mockResponse);

      const result = await controller.catLicencias();

      expect(result).toEqual(mockResponse);
      expect(mockCatalogoExpose.catLicencias).toHaveBeenCalledTimes(1);
    });
  });

  describe('catEstatusByTabla', () => {
    it('should return estatus by tabla', async () => {
      const request = { tabla: 'solicitudes' };
      const mockResponse = {
        code: 'S0000',
        internalCode: 'I0000',
        message: 'Successful',
        data: {
          estatus: [
            { id: 1, estatus: 'Pendiente', tabla: 'solicitudes' },
            { id: 2, estatus: 'Aprobado', tabla: 'solicitudes' },
          ],
        },
      };

      mockCatalogoExpose.catEstatusByTabla.mockResolvedValue(mockResponse);

      const result = await controller.getEstatusByTabla(request);

      expect(result).toEqual(mockResponse);
      expect(mockCatalogoExpose.catEstatusByTabla).toHaveBeenCalledWith(request);
    });
  });

  describe('catLugares', () => {
    it('should return all cat lugares', async () => {
      const mockResponse = {
        code: 'S0000',
        internalCode: 'I0000',
        message: 'Successful',
        data: [
          { id: 1, lugar: 'Oficina Central', direccion: 'Av. Principal' },
        ],
      };

      mockCatalogoExpose.catLugares.mockResolvedValue(mockResponse);

      const result = await controller.catLugares();

      expect(result).toEqual(mockResponse);
      expect(mockCatalogoExpose.catLugares).toHaveBeenCalledTimes(1);
    });
  });

  describe('catPruebas', () => {
    it('should return all cat pruebas', async () => {
      const mockResponse = {
        code: 'S0000',
        internalCode: 'I0000',
        message: 'Successful',
        data: [
          { id: 1, prueba: 'Teórica', descripcion: 'Examen teórico' },
        ],
      };

      mockCatalogoExpose.catPrueba.mockResolvedValue(mockResponse);

      const result = await controller.catPruebas();

      expect(result).toEqual(mockResponse);
      expect(mockCatalogoExpose.catPrueba).toHaveBeenCalledTimes(1);
    });
  });

  describe('catVigencias', () => {
    it('should return all cat vigencias', async () => {
      const mockResponse = {
        code: 'S0000',
        internalCode: 'I0000',
        message: 'Successful',
        data: [
          { id: 1, vigencia: '3 años', descripcion: 'Vigencia estándar' },
        ],
      };

      mockCatalogoExpose.catVigencia.mockResolvedValue(mockResponse);

      const result = await controller.catVigencias();

      expect(result).toEqual(mockResponse);
      expect(mockCatalogoExpose.catVigencia).toHaveBeenCalledTimes(1);
    });
  });
});
