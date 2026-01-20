import { Test, TestingModule } from '@nestjs/testing';
import { UsuariosExpose } from './usuarios-expose';
import { UsuariosService } from '../../services/from-front/usuarios-service';
import { RESPONSE_CODES, INTERNAL_CODES, INTERNAL_MESSAGES } from '@principal/commons-module/proyecto/utils/messages-enum';

describe('UsuariosExpose', () => {
  let expose: UsuariosExpose;
  let usuariosService: UsuariosService;

  const mockUsuariosService = {
    getUsuarioById: jest.fn(),
    createUsuario: jest.fn(),
    updateUsuario: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsuariosExpose,
        {
          provide: UsuariosService,
          useValue: mockUsuariosService,
        },
      ],
    }).compile();

    expose = module.get<UsuariosExpose>(UsuariosExpose);
    usuariosService = module.get<UsuariosService>(UsuariosService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getUsuarioById', () => {
    it('should return usuario by id', async () => {
      const request = { id: 1 };
      const mockResponse = {
        id: 1,
        nombres: 'Juan',
        apellidopaterno: 'Perez',
        apellidomaterno: 'Lopez',
        curp: 'PELJ900101HDFRR01',
      };

      mockUsuariosService.getUsuarioById.mockResolvedValue(mockResponse);

      const result = await expose.getUsuarioById(request);

      expect(result.code).toBe(RESPONSE_CODES.SUCCESFULL);
      expect(result.internalCode).toBe(INTERNAL_CODES.SUCCESFULL);
      expect(result.message).toBe(INTERNAL_MESSAGES.SUCCESFULL);
      expect(result.data).toEqual(mockResponse);
      expect(mockUsuariosService.getUsuarioById).toHaveBeenCalledWith(request);
    });
  });

  describe('createUsuario', () => {
    it('should create a usuario successfully', async () => {
      const request = {
        tipoUsuario: 1,
        nombres: 'Juan',
        apellidopaterno: 'Perez',
        apellidomaterno: 'Lopez',
        curp: 'PELJ900101HDFRR01',
        email: 'juan@example.com',
        password: 'password123',
        fechanacimiento: '1990-01-01',
        conocidoDomicilio: 'Casa blanca',
        cp: '12345',
        idlocalidad: 1,
      };

      const mockResponse = {
        creado: true,
        id: 1,
      };

      mockUsuariosService.createUsuario.mockResolvedValue(mockResponse);

      const result = await expose.createUsuario(request);

      expect(result.code).toBe(RESPONSE_CODES.SUCCESFULL);
      expect(result.internalCode).toBe(INTERNAL_CODES.SUCCESFULL);
      expect(result.message).toBe(INTERNAL_MESSAGES.SUCCESFULL);
      expect(result.data).toEqual(mockResponse);
      expect(mockUsuariosService.createUsuario).toHaveBeenCalledWith(request);
    });

    it('should handle failed usuario creation', async () => {
      const request = {
        tipoUsuario: 1,
        nombres: 'Juan',
        apellidopaterno: 'Perez',
        apellidomaterno: 'Lopez',
        curp: 'PELJ900101HDFRR01',
        email: 'juan@example.com',
        password: 'password123',
        fechanacimiento: '1990-01-01',
        conocidoDomicilio: 'Casa blanca',
        cp: '12345',
        idlocalidad: 1,
      };

      const mockResponse = {
        creado: false,
        id: null,
      };

      mockUsuariosService.createUsuario.mockResolvedValue(mockResponse);

      const result = await expose.createUsuario(request);

      expect(result.code).toBe(RESPONSE_CODES.ERROR_CUSTOM);
      expect(result.internalCode).toBe(INTERNAL_CODES.ERROR_CODE);
      expect(result.message).toBe(INTERNAL_MESSAGES.NOT_VALID_ERROR_CODE);
      expect(result.data).toEqual(mockResponse);
    });
  });

  describe('updateUsuario', () => {
    it('should update a usuario successfully', async () => {
      const request = {
        idUsuario: 1,
        tipoUsuario: 1,
        nombres: 'Juan Carlos',
        apellidopaterno: 'Perez',
        apellidomaterno: 'Lopez',
        curp: 'PELJ900101HDFRR01',
        password: 'newpassword',
        fechanacimiento: '1990-01-01',
        conocidoDomicilio: 'Casa azul',
        cp: 54321,
        idlocalidad: 2,
      };

      const mockResponse = {
        actualizado: true,
      };

      mockUsuariosService.updateUsuario.mockResolvedValue(mockResponse);

      const result = await expose.updateUsuario(request);

      expect(result.code).toBe(RESPONSE_CODES.SUCCESFULL);
      expect(result.internalCode).toBe(INTERNAL_CODES.SUCCESFULL);
      expect(result.message).toBe(INTERNAL_MESSAGES.SUCCESFULL);
      expect(result.data).toEqual(mockResponse);
      expect(mockUsuariosService.updateUsuario).toHaveBeenCalledWith(request);
    });

    it('should handle failed usuario update', async () => {
      const request = {
        idUsuario: 1,
        tipoUsuario: 1,
        nombres: 'Juan Carlos',
        apellidopaterno: 'Perez',
        apellidomaterno: 'Lopez',
        curp: 'PELJ900101HDFRR01',
        password: 'newpassword',
        fechanacimiento: '1990-01-01',
        conocidoDomicilio: 'Casa azul',
        cp: 54321,
        idlocalidad: 2,
      };

      const mockResponse = {
        actualizado: false,
      };

      mockUsuariosService.updateUsuario.mockResolvedValue(mockResponse);

      const result = await expose.updateUsuario(request);

      expect(result.code).toBe(RESPONSE_CODES.ERROR_CUSTOM);
      expect(result.internalCode).toBe(INTERNAL_CODES.ERROR_CODE);
      expect(result.message).toBe(INTERNAL_MESSAGES.NOT_VALID_ERROR_CODE);
      expect(result.data).toEqual(mockResponse);
    });
  });
});
