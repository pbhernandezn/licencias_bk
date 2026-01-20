import { Test, TestingModule } from '@nestjs/testing';
import { UsuariosController } from './usuarios-controller';
import { UsuariosExpose } from '@principal/core-module/proyecto/expose/from-front/usuarios-expose';
import { createUsuarioReq, getUsuarioByIdReq, updateUsuarioReq } from '@principal/core-module/proyecto/models/from-tables/usuarios-dto';

describe('UsuariosController', () => {
  let controller: UsuariosController;
  let usuariosExpose: UsuariosExpose;

  const mockUsuariosExpose = {
    getUsuarioById: jest.fn(),
    createUsuario: jest.fn(),
    updateUsuario: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsuariosController],
      providers: [
        {
          provide: UsuariosExpose,
          useValue: mockUsuariosExpose,
        },
      ],
    }).compile();

    controller = module.get<UsuariosController>(UsuariosController);
    usuariosExpose = module.get<UsuariosExpose>(UsuariosExpose);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getUsuarioById', () => {
    it('should return a user by id', async () => {
      const request: getUsuarioByIdReq = { id: 1 };
      const mockResponse = {
        code: 'S0000',
        internalCode: 'I0000',
        message: 'Successful',
        data: {
          id: 1,
          nombres: 'Juan',
          apellidopaterno: 'Perez',
        },
      };

      mockUsuariosExpose.getUsuarioById.mockResolvedValue(mockResponse);

      const result = await controller.getUsuarioById(request, {} as any);

      expect(result).toEqual(mockResponse);
      expect(mockUsuariosExpose.getUsuarioById).toHaveBeenCalledWith(request);
      expect(mockUsuariosExpose.getUsuarioById).toHaveBeenCalledTimes(1);
    });
  });

  describe('createUsuario', () => {
    it('should create a new user', async () => {
      const request: createUsuarioReq = {
        tipoUsuario: 1,
        nombres: 'Juan',
        password: 'password123',
        apellidopaterno: 'Perez',
        apellidomaterno: 'Garcia',
        curp: 'PEGA900101HDFRR01',
        email: 'juan@example.com',
        fechanacimiento: '1990-01-01',
      };

      const mockResponse = {
        code: 'S0000',
        internalCode: 'I0000',
        message: 'Successful',
        data: {
          creado: true,
          errores: {},
        },
      };

      mockUsuariosExpose.createUsuario.mockResolvedValue(mockResponse);

      const result = await controller.createUsuario(request);

      expect(result).toEqual(mockResponse);
      expect(mockUsuariosExpose.createUsuario).toHaveBeenCalledWith(request);
      expect(mockUsuariosExpose.createUsuario).toHaveBeenCalledTimes(1);
    });

    it('should handle validation errors', async () => {
      const request: createUsuarioReq = {
        tipoUsuario: 1,
        nombres: 'Juan123',
        password: 'password123',
        apellidopaterno: 'Perez',
        apellidomaterno: 'Garcia',
        curp: 'INVALID',
        email: 'juan@example.com',
        fechanacimiento: '1990-01-01',
      };

      const mockResponse = {
        code: 'E0001',
        internalCode: 'I0001',
        message: 'Validation error',
        data: {
          creado: false,
          errores: {
            nombres: 'El nombre contiene caracteres no válidos.',
            curp: 'CURP no válido.',
          },
        },
      };

      mockUsuariosExpose.createUsuario.mockResolvedValue(mockResponse);

      const result = await controller.createUsuario(request);

      expect(result.data.creado).toBe(false);
      expect(result.data.errores).toBeDefined();
    });
  });

  describe('updateUsuario', () => {
    it('should update a user', async () => {
      const request: any = {
        idUsuario: 1,
        nombres: 'Juan',
        apellidopaterno: 'Perez',
        curp: 'PEGA900101HDFRR01',
      };

      const mockResponse = {
        code: 'S0000',
        internalCode: 'I0000',
        message: 'Successful',
        data: {
          actualizado: true,
          errores: {},
        },
      };

      mockUsuariosExpose.updateUsuario.mockResolvedValue(mockResponse);

      const result = await controller.updateUsuario(request, {} as any);

      expect(result).toEqual(mockResponse);
      expect(mockUsuariosExpose.updateUsuario).toHaveBeenCalledWith(request);
      expect(mockUsuariosExpose.updateUsuario).toHaveBeenCalledTimes(1);
    });
  });
});
