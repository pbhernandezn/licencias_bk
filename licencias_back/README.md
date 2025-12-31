<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
</p>

## Descripción

Proyecto de servicios para gestión de Licencias de Conducir construido con [Nest](https://github.com/nestjs/nest) framework.

## Instalación del Proyecto

```bash
$ npm install
```

## Compilar y ejecutar el proyecto

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Ejecutar pruebas

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Estructura del Proyecto

```
src/
├── main.ts                 # Punto de entrada principal
├── main-module/            # Módulo principal de la aplicación
│   └── proyecto/
│       ├── app.module.ts
│       ├── models/
│       ├── services/
│       ├── static/
│       └── triggers/
├── core-module/            # Módulo core con lógica principal
│   └── proyecto/
│       ├── core-module.ts
│       ├── config/         # Configuraciones (BD, IA, etc.)
│       ├── models/
│       │   ├── entities/   # Entidades de base de datos
│       │   ├── from-front/ # Modelos desde frontend
│       │   └── from-tables/# Modelos desde tablas
│       ├── expose/         # Interfaces públicas
│       ├── proxies/        # Proxies para servicios externos
│       ├── repository/     # Repositorios de datos
│       ├── services/       # Servicios de negocio
│       └── utils/
└── commons-module/         # Módulo común reutilizable
    ├── health-check-module/# Módulo de health check
    ├── shutdown-module/    # Módulo de shutdown
    └── proyecto/
        ├── models/
        └── utils/
```

## Licencia

UNLICENSED
