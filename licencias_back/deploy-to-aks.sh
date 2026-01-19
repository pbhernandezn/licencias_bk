#!/bin/bash

# Script de despliegue automatizado a AKS
# Uso: ./deploy-to-aks.sh [version]
# Ejemplo: ./deploy-to-aks.sh v1.23

set -e  # Salir si algún comando falla

# Colores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Variables
ACR_NAME="dgolicenciasacr"
ACR_REGISTRY="${ACR_NAME}.azurecr.io"
IMAGE_NAME="licencias-backend"
NAMESPACE="licencias"
DEPLOYMENT_NAME="licencias-backend"

# Función para imprimir mensajes
print_info() {
    echo -e "${BLUE}ℹ ${NC}$1"
}

print_success() {
    echo -e "${GREEN}✓${NC} $1"
}

print_error() {
    echo -e "${RED}✗${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}⚠${NC} $1"
}

# Verificar si se proporcionó la versión
if [ -z "$1" ]; then
    print_error "Debe proporcionar una versión"
    echo "Uso: ./deploy-to-aks.sh [version]"
    echo "Ejemplo: ./deploy-to-aks.sh v1.23"
    exit 1
fi

VERSION=$1
FULL_IMAGE="${ACR_REGISTRY}/${IMAGE_NAME}:${VERSION}"

print_info "Iniciando despliegue de ${IMAGE_NAME}:${VERSION} a AKS"
echo ""

# Paso 1: Limpiar directorio dist
print_info "Paso 1/8: Limpiando directorio dist..."
rm -rf dist
print_success "Directorio dist limpio"
echo ""

# Paso 2: Compilar aplicación
print_info "Paso 2/8: Compilando aplicación NestJS..."
if npx nest build; then
    print_success "Compilación exitosa"
else
    print_error "Error en la compilación"
    exit 1
fi
echo ""

# Paso 3: Verificar que Docker esté corriendo
print_info "Paso 3/8: Verificando Docker..."
if ! docker info > /dev/null 2>&1; then
    print_error "Docker no está corriendo. Iniciando Docker Desktop..."
    open -a Docker
    print_info "Esperando a que Docker inicie..."
    sleep 15
    
    # Verificar nuevamente
    if ! docker info > /dev/null 2>&1; then
        print_error "Docker no pudo iniciarse"
        exit 1
    fi
fi
print_success "Docker está corriendo"
echo ""

# Paso 4: Construir imagen Docker
print_info "Paso 4/8: Construyendo imagen Docker..."
if docker buildx build --platform linux/amd64 -t ${FULL_IMAGE} --load .; then
    print_success "Imagen Docker construida: ${FULL_IMAGE}"
else
    print_error "Error al construir la imagen Docker"
    exit 1
fi
echo ""

# Paso 5: Login a Azure Container Registry
print_info "Paso 5/8: Autenticando con Azure Container Registry..."
if az acr login --name ${ACR_NAME}; then
    print_success "Login exitoso a ACR"
else
    print_error "Error al autenticar con ACR"
    exit 1
fi
echo ""

# Paso 6: Push de imagen a ACR
print_info "Paso 6/8: Subiendo imagen a ACR..."
if docker push ${FULL_IMAGE}; then
    print_success "Imagen subida exitosamente a ACR"
else
    print_error "Error al subir la imagen a ACR"
    exit 1
fi
echo ""

# Paso 7: Actualizar deployment en AKS
print_info "Paso 7/8: Actualizando deployment en AKS..."
if kubectl set image deployment/${DEPLOYMENT_NAME} ${DEPLOYMENT_NAME}=${FULL_IMAGE} -n ${NAMESPACE}; then
    print_success "Deployment actualizado"
else
    print_error "Error al actualizar el deployment"
    exit 1
fi
echo ""

# Paso 8: Esperar rollout
print_info "Paso 8/8: Esperando a que el rollout se complete..."
if kubectl rollout status deployment/${DEPLOYMENT_NAME} -n ${NAMESPACE} --timeout=5m; then
    print_success "Rollout completado exitosamente"
else
    print_error "Error en el rollout"
    exit 1
fi
echo ""

# Verificar estado final
print_info "Verificando estado final..."
echo ""
echo "Pods:"
kubectl get pods -n ${NAMESPACE}
echo ""
echo "Health Check:"
HEALTH_STATUS=$(curl -s http://172.174.80.112/health | jq -r '.status' 2>/dev/null || echo "error")

if [ "$HEALTH_STATUS" == "ok" ]; then
    print_success "Health check: OK"
else
    print_warning "Health check: $HEALTH_STATUS"
fi

echo ""
print_success "================================================"
print_success "   DESPLIEGUE COMPLETADO EXITOSAMENTE"
print_success "================================================"
echo ""
echo "Versión desplegada: ${VERSION}"
echo "Imagen: ${FULL_IMAGE}"
echo "Namespace: ${NAMESPACE}"
echo "URL Health: http://172.174.80.112/health"
echo "URL API: http://172.174.80.112/api"
echo "URL Swagger: http://172.174.80.112/api/docs"
echo ""
