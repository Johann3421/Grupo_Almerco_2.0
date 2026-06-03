# Despliegue en Dokploy (VPS)

## Requisitos previos

- VPS con Dokploy instalado y accesible
- Repositorio Git (GitHub / GitLab / Gitea) con el código del proyecto
- `.env` **no** debe estar en el repositorio (ya está en `.gitignore`)

---

## 1. Preparar variables de entorno

Genera un secret seguro para NextAuth ejecutando esto en tu máquina o en el VPS:

```bash
openssl rand -base64 32
```

Guarda el resultado; lo usarás como `NEXTAUTH_SECRET`.

---

## 2. Crear el proyecto en Dokploy

1. Entra a tu panel Dokploy → **Projects** → **New Project**.
2. Dale un nombre (ej. `techstore`).
3. Dentro del proyecto → **New Service** → **Docker Compose**.
4. Elige la fuente: **Git Repository** y conecta tu repo.
5. Branch: `main` (o el que uses).
6. Compose file path: `docker-compose.yml`

---

## 3. Configurar las variables de entorno en Dokploy

En la sección **Environment** del servicio, agrega:

```env
DATABASE_URL=postgresql://techstore_user:techstore_pass@db:5432/techstore?schema=public
NEXTAUTH_URL=https://TU_DOMINIO.com
NEXTAUTH_SECRET=PEGA_AQUI_EL_SECRET_GENERADO
```

> `NEXTAUTH_URL` debe ser la URL pública exacta que usarás (con `https://` si tienes SSL).
> `DATABASE_URL` usa el hostname `db` porque es el nombre del servicio en el compose.

---

## 4. Verificar el `docker-compose.yml`

El archivo ya está configurado correctamente. Solo asegúrate de que las variables de entorno del servicio `web` **no tengan valores hardcodeados** — deben leerlos desde el entorno de Dokploy.

Versión lista para producción:

```yaml
version: '3.8'

services:
  web:
    build:
      context: .
      dockerfile: Dockerfile
    container_name: techstore-web
    restart: always
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=${DATABASE_URL}
      - NEXTAUTH_URL=${NEXTAUTH_URL}
      - NEXTAUTH_SECRET=${NEXTAUTH_SECRET}
    depends_on:
      db:
        condition: service_healthy

  db:
    image: postgres:15-alpine
    container_name: techstore-db
    restart: always
    environment:
      - POSTGRES_USER=techstore_user
      - POSTGRES_PASSWORD=techstore_pass
      - POSTGRES_DB=techstore
    volumes:
      - pgdata:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U techstore_user -d techstore"]
      interval: 5s
      timeout: 5s
      retries: 5

volumes:
  pgdata:
```

> Se eliminó la exposición del puerto `5433` de la base de datos al exterior por seguridad. Solo `web` accede a `db` internamente.

---

## 5. Hacer el deploy

1. En Dokploy, ve al servicio → **Deploy**.
2. Dokploy clonará el repo, construirá la imagen con el `Dockerfile` y levantará los contenedores.
3. Al iniciar, `docker-entrypoint.sh` ejecuta automáticamente `prisma migrate deploy` antes de arrancar el servidor.

---

## 6. Configurar dominio y SSL (en Dokploy)

1. Ve a **Domains** dentro del servicio `web`.
2. Agrega tu dominio apuntando al puerto `3000`.
3. Activa **Let's Encrypt** para SSL automático.
4. Actualiza la variable `NEXTAUTH_URL` con `https://TU_DOMINIO.com` y vuelve a hacer deploy.

---

## 7. Poblar la base de datos (seed) — opcional

Si necesitas ejecutar el seed después del primer deploy:

1. En Dokploy → servicio `web` → **Terminal** (o conecta por SSH al VPS).
2. Ejecuta:

```bash
docker exec -it techstore-web npx prisma db seed
```

---

## Errores comunes

| Error | Causa | Solución |
|---|---|---|
| `NEXTAUTH_SECRET` not set | Variable no configurada en Dokploy | Agrégala en la sección Environment |
| `Can't reach database` | `db` no está listo aún | El `healthcheck` lo maneja; si persiste, revisa las credenciales en `DATABASE_URL` |
| `prisma migrate deploy` falla | Migraciones no generadas | Asegúrate de hacer push del contenido de `prisma/migrations/` al repo |
| Build falla en `prisma generate` | `schema.prisma` no en repo | Verifica que `prisma/schema.prisma` esté commiteado |
| Puerto 3000 en uso | Otro servicio usa ese puerto | Cambia el puerto host en el compose, ej. `"3001:3000"` |

---

## Estructura de archivos clave para el deploy

```
techstore/
├── Dockerfile              # Build multistage con output standalone
├── docker-compose.yml      # Orquestación web + postgres
├── docker-entrypoint.sh    # Migrations + start server
├── next.config.ts          # output: "standalone" (requerido)
└── prisma/
    ├── schema.prisma
    └── migrations/         # DEBE estar en el repo
```
