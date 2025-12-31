FROM node:22.9.0-alpine AS dev

# Security: Update packages, install security patches, and create secure environment
RUN apk update && apk upgrade && \
    apk add --no-cache dumb-init tini && \
    rm -rf /var/cache/apk/* /tmp/* /var/tmp/*

# Fix timezone issue
ENV TZ=America/Mexico_City
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

# Security: Create non-root user early with minimal privileges
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nestjs -u 1001 -G nodejs --disabled-password && \
    mkdir -p /home/nestjs && \
    chown nestjs:nodejs /home/nestjs

# Security: Set secure working directory with proper ownership
WORKDIR /usr/src/app
RUN chown nestjs:nodejs /usr/src/app

# Security: Copy only necessary files for dependency installation
COPY --chown=nestjs:nodejs package*.json ./
COPY --chown=nestjs:nodejs tsconfig*.json ./
COPY --chown=nestjs:nodejs nest-cli.json ./

# Security: Install global packages with specific versions and verify integrity
RUN npm install -g typescript@5.6.3 && \
    npm install -g ts-node@10.9.2 && \
    npm cache verify

# Security: Switch to non-root user for dependency installation
USER nestjs

# Security: Install dependencies with audit and vulnerability checks
RUN npm ci --maxsockets=4 --no-optional && \
    (npm audit --audit-level=moderate || echo "Audit completed with warnings") && \
    (npm audit fix --force --audit-level=moderate || echo "Some vulnerabilities could not be fixed automatically")

# Copy source code after dependencies (better cache utilization)
COPY --chown=nestjs:nodejs . .

# Build application
RUN npm run build

# Security: Remove dev dependencies after build and clear all caches
RUN npm prune --production && \
    npm cache clean --force && \
    (rm -rf ~/.npm || true) && \
    (rm -rf /tmp/* || true)

FROM node:22.9.0-alpine

# Security: Update system packages, install security patches, and essential tools
RUN apk update && apk upgrade && \
    apk add --no-cache dumb-init tini && \
    rm -rf /var/cache/apk/* /tmp/* /var/tmp/*

ENV TZ=America/Mexico_City
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

# Security: Create non-root user for production with minimal privileges
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nestjs -u 1001 -G nodejs --disabled-password && \
    mkdir -p /home/nestjs && \
    chown nestjs:nodejs /home/nestjs

# Security: Set secure working directory
WORKDIR /usr/src/app

# Security: Copy files with proper ownership and minimal permissions
COPY --from=dev --chown=nestjs:nodejs /usr/src/app/package.json ./
COPY --from=dev --chown=nestjs:nodejs /usr/src/app/tsconfig.json ./
COPY --from=dev --chown=nestjs:nodejs /usr/src/app/tsconfig.build.json ./
COPY --from=dev --chown=nestjs:nodejs /usr/src/app/node_modules ./node_modules
COPY --from=dev --chown=nestjs:nodejs /usr/src/app/dist ./dist

# Security: Set proper permissions - read-only for application files, executable for binaries
RUN chmod -R 444 /usr/src/app/*.json || true && \
    chmod -R 555 /usr/src/app/dist || true && \
    (find /usr/src/app/node_modules -type f -name "*.js" -exec chmod 555 {} \; 2>/dev/null || true) && \
    (find /usr/src/app/node_modules/.bin -type f -exec chmod 755 {} \; 2>/dev/null || true) && \
    chmod 755 /usr/src/app

# Security: Switch to non-root user before starting application
USER nestjs

# Security: Use non-root port
EXPOSE 3000

# Security: Set environment variables for production and security
ENV NODE_ENV=production \
    NPM_CONFIG_UPDATE_NOTIFIER=false \
    NPM_CONFIG_FUND=false \
    NPM_CONFIG_AUDIT=false

# Security: Use tini as init system to handle signals properly and prevent zombie processes
ENTRYPOINT ["tini", "--"]

# Security: Run with minimal privileges and proper signal handling
CMD [ "node", "dist/main.js" ]
