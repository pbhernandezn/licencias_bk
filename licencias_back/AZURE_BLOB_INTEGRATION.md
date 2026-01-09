# Integración con Azure Blob Storage para Documentos

Esta implementación permite almacenar archivos de documentos en Azure Blob Storage de forma segura y escalable.

## Configuración

### 1. Variables de Entorno

Asegúrate de tener las siguientes variables configuradas en tu archivo `.env`:

```env
AZURE_STORAGE_CONNECTION_STRING=DefaultEndpointsProtocol=https;AccountName=tuStorage;AccountKey=tuKey;EndpointSuffix=core.windows.net
AZURE_STORAGE_CONTAINER_NAME=documentos
```

### 2. Migración de Base de Datos

Ejecuta el script SQL para agregar las columnas necesarias:

```bash
psql -h dgolicencias.postgres.database.azure.com -U dgolicencias -d licencias -f migrations/add-azure-blob-fields.sql
```

O ejecuta manualmente:

```sql
ALTER TABLE documentos 
ADD COLUMN IF NOT EXISTS urlarchivo VARCHAR(500),
ADD COLUMN IF NOT EXISTS nombreblob VARCHAR(500);

CREATE INDEX IF NOT EXISTS idx_documentos_nombreblob ON documentos(nombreblob);
CREATE INDEX IF NOT EXISTS idx_documentos_idusuario ON documentos(idusuario);
CREATE INDEX IF NOT EXISTS idx_documentos_idsolicitud ON documentos(idsolicitud);
```

### 3. Instalar Dependencias

La dependencia de Azure ya está instalada:

```bash
npm install @azure/storage-blob
```

## Arquitectura

### Estructura de Archivos

Los archivos se organizan en Azure Blob Storage con la siguiente estructura:

```
usuario_{id}/solicitud_{id}/timestamp_nombrearchivo.extension
```

Ejemplo:
```
usuario_123/solicitud_456/1704844800000_licencia.pdf
```

### Base de Datos

La tabla `documentos` ahora incluye:

- `urlarchivo`: URL de referencia del archivo en Azure Blob Storage (privada)
- `nombreblob`: Nombre único del blob (ruta del archivo)

**Nota Importante**: El contenedor de Azure Blob Storage es **privado**. Las URLs almacenadas en `urlarchivo` son solo para referencia interna y no son accesibles públicamente. Los archivos deben descargarse a través del endpoint `/downloadDocumento` que maneja la autenticación con Azure.

## API Endpoints

### 1. Crear Documento (Upload)

**POST** `/api/documentos/createDocumento`

**Body:**
```json
{
  "idusuario": 1,
  "idsolicitud": 1,
  "idtipodocumento": 1,
  "formato": "pdf",
  "nombreoriginal": "licencia.pdf",
  "tamanio": 102400,
  "archivoBase64": "JVBERi0xLjQKJeLjz9MKMy4uLg=="
}
```

**Response:**
```json
{
  "code": 200,
  "internalCode": "SUCCESS",
  "message": "Documento creado y subido a Azure Blob Storage exitosamente",
  "data": null
}
```

### 2. Descargar Documento

**POST** `/api/documentos/downloadDocumento`

**Body:**
```json
{
  "id": 1
}
```

**Response:** Archivo binario con headers apropiados

### 3. Eliminar Documento

**POST** `/api/documentos/deleteDocumento`

**Body:**
```json
{
  "id": 1
}
```

**Response:**
```json
{
  "code": 200,
  "internalCode": "SUCCESS",
  "message": "Documento eliminado exitosamente de Azure Blob Storage y base de datos",
  "data": null
}
```

### 4. Listar Documentos

**GET** `/api/documentos/documentos`

**Response:**
```json
{
  "code": 200,
  "internalCode": "SUCCESS",
  "message": "Operación exitosa",
  "data": {
    "existe": true,
    "documentosData": [
      {
        "id": 1,
        "idusuario": 1,
        "nombreusuario": "Juan Pérez",
        "idsolicitud": 1,
        "numerosolicitud": "LIC-001",
        "creacion": "2026-01-09",
        "idtipodocumento": 1,
        "tipodocumento": "INE",
        "formato": "pdf",
        "nombreoriginal": "ine.pdf",
        "tamanio": 102400,
        "urlarchivo": "https://storage.blob.core.windows.net/documentos/usuario_1/solicitud_1/1704844800000_ine.pdf",
        "nombreblob": "usuario_1/solicitud_1/1704844800000_ine.pdf",
        "validacion": "pendiente",
        "idestatus": 1,
        "estatus": "Activo"
      }
    ]
  }
}
```

### 5. Obtener Documento por ID

**POST** `/api/documentos/documentoById`

**Body:**
```json
{
  "id": 1
}
```

### 6. Obtener Documentos por Usuario

**POST** `/api/documentos/documentosByUsuario`

**Body:**
```json
{
  "idusuario": 1
}
```

### 7. Obtener Documentos por Solicitud

**POST** `/api/documentos/documentosBySolicitud`

**Body:**
```json
{
  "idsolicitud": 1
}
```

## Servicios Implementados

### AzureBlobService

Servicio principal para interactuar con Azure Blob Storage:

- `uploadFile(buffer, blobName, contentType)`: Sube un archivo
- `downloadFile(blobName)`: Descarga un archivo
- `deleteFile(blobName)`: Elimina un archivo
- `getBlobUrl(blobName)`: Obtiene la URL de un blob
- `generateBlobName(idusuario, idsolicitud, nombreoriginal)`: Genera un nombre único

### DocumentosTService

Servicio de tabla que maneja la lógica de negocio:

- `createDocumento()`: Sube archivo a Azure y guarda metadata en BD
- `downloadDocumento()`: Descarga archivo desde Azure
- `deleteDocumento()`: Elimina archivo de Azure y BD

## Seguridad

- Los archivos se almacenan en un contenedor **privado** de Azure Blob Storage
- El acceso a los archivos se controla completamente por el backend
- La autenticación con Azure se maneja mediante connection string
- Los archivos solo pueden descargarse a través del endpoint `/downloadDocumento`
- Se valida la existencia del documento antes de operaciones
- Se manejan errores de forma consistente
- **No hay acceso público directo** a los archivos almacenados

## Manejo de Errores

Códigos de error específicos:

- `AZURE-BLOB-001`: Error al configurar Azure Storage
- `AZURE-BLOB-002`: Error al subir archivo
- `AZURE-BLOB-003`: Error al descargar archivo
- `AZURE-BLOB-004`: Error al eliminar archivo
- `TYPE-D-documentos-create-001`: Error al crear documento
- `TYPE-A-documentos-download-001/002`: Error al descargar documento
- `TYPE-E-documentos-delete-001/002`: Error al eliminar documento

## Testing

Puedes probar los endpoints usando Swagger en:

```
http://localhost:3001/api/docs
```

## Ejemplo de Uso desde Frontend

```javascript
// Subir documento
const file = document.querySelector('input[type="file"]').files[0];
const reader = new FileReader();

reader.onload = async (e) => {
  const base64 = e.target.result.split(',')[1];
  
  const response = await fetch('http://localhost:3001/api/documentos/createDocumento', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      idusuario: 1,
      idsolicitud: 1,
      idtipodocumento: 1,
      formato: file.name.split('.').pop(),
      nombreoriginal: file.name,
      tamanio: file.size,
      archivoBase64: base64
    })
  });
  
  const result = await response.json();
  console.log('Documento subido:', result);
};

reader.readAsDataURL(file);

// Descargar documento
const downloadResponse = await fetch('http://localhost:3001/api/documentos/downloadDocumento', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ id: 1 })
});

const blob = await downloadResponse.blob();
const url = window.URL.createObjectURL(blob);
const a = document.createElement('a');
a.href = url;
a.download = 'documento.pdf';
a.click();
```

## Notas Importantes

1. **Tamaño de archivos**: Azure Blob Storage soporta archivos de hasta 4.75 TB
2. **Formato base64**: El frontend debe enviar el archivo codificado en base64
3. **Nombres únicos**: Los archivos se almacenan con timestamp para evitar colisiones
4. **Metadata en BD**: Solo se guarda metadata en PostgreSQL, no el archivo
5. **Contenedor privado**: Los archivos NO son accesibles públicamente. Deben descargarse a través del endpoint `/downloadDocumento`
6. **URLs de referencia**: Las URLs almacenadas en `urlarchivo` son solo para referencia interna

## Próximos Pasos

- [ ] Agregar autenticación/autorización para los endpoints de documentos
- [ ] Implementar validación de tipo de archivo
- [ ] Implementar límites de tamaño de archivo
- [ ] Agregar compresión de imágenes
- [ ] Implementar thumbnails para imágenes
- [ ] Agregar logging de operaciones
- [ ] Implementar retry logic para operaciones fallidas
- [ ] Agregar generación de SAS tokens para acceso temporal (opcional)
