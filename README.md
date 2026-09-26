# SalonPro

## Descripción general

SalonPro es un sistema de gestión para salones de belleza y spa, desarrollado para la materia **Programación Aplicada (2026-2)**.

El sistema busca gestionar usuarios, profesionales, servicios, horarios, disponibilidad, clientes, citas, atención, pagos y dashboard.

## Problema

SalonPro busca reducir problemas operativos como:

- dobles reservas de un mismo profesional;
- desconocimiento de la disponibilidad real de los profesionales;
- dificultad para dar seguimiento a citas y atenciones;
- falta de organización en la gestión de servicios y horarios.

## Actores

- **Administrador**: configura servicios, profesionales, horarios y parámetros del sistema.
- **Recepcionista**: agenda, reprograma y cancela citas.
- **Profesional**: consulta su agenda y actualiza el estado de la atención.
- **Cliente**: reserva, consulta y cancela citas según las reglas del negocio.
- **Supervisor**: consulta KPIs y excepciones operativas.

## Módulos del sistema

- Usuarios
- Profesionales
- Servicios
- Horarios
- Disponibilidad
- Clientes
- Citas
- Atención
- Pagos
- Dashboard

> Los módulos anteriores corresponden al **alcance funcional completo** definido para el proyecto. Esto **no significa que todos estén implementados actualmente**: su grado de avance depende del progreso real de la materia (ver [Estado actual del proyecto](#estado-actual-del-proyecto)).

## Tecnologías utilizadas

### Backend
- Java 21
- Spring Boot
- Spring Web
- Spring Data JPA
- Hibernate
- Jakarta Validation

### Base de datos
- PostgreSQL

### Herramientas
- IntelliJ IDEA
- DataGrip
- Git y GitHub
- Swagger / OpenAPI
- Postman

### Tecnologías previstas para etapas posteriores

- React + TypeScript
- React Native + TypeScript

## Estructura del repositorio

```
SalonPro/
│
├── docs/
│   ├── 01-vision/
│   ├── 02-requirements/
│   ├── 03-decisions/
│   └── 04-model/
│
├── salonpro-backend/
│
└── README.md
```

- `docs/`: documentación de análisis, requisitos y diseño elaborada durante las distintas etapas de la materia.
- `salonpro-backend/`: implementación actual del backend en Java y Spring Boot.

## Nota sobre la documentación (`docs/`)

La carpeta `docs/` conserva distintas etapas de análisis y diseño desarrolladas durante la materia. Algunos documentos representan propuestas **conceptuales, relacionales o físicas** elaboradas **antes** de la implementación actual del backend (por ejemplo, el modelo conceptual, el DER lógico o el plan de migración de base de datos).

Por ese motivo, **no todos los documentos de `docs/04-model` reflejan necesariamente el estado actual del código** — en algunos casos porque todavía no se implementaron, y en otros porque el código avanzó más allá de lo documentado (por ejemplo, `usuario` ya tiene campos de autenticación que el diseño lógico había dejado explícitamente pendientes). Ante cualquier duda sobre qué existe realmente hoy, el backend (`salonpro-backend/`) es la fuente de verdad.

## Estado actual del proyecto

El desarrollo del backend está **en curso**. Actualmente el proyecto cuenta con:

- documentación inicial del dominio (visión, glosario y backlog de historias de usuario);
- documentación de diseño de base de datos (en distintas etapas, según lo indicado arriba);
- backend desarrollado con Spring Boot, con arquitectura modular/hexagonal;
- **dos módulos persistidos e implementados funcionalmente: Usuarios y Roles**, con sus respectivas tablas en PostgreSQL y endpoints REST disponibles (incluyendo alta, consulta, actualización y baja).

El resto de los módulos listados en el alcance (Profesionales, Servicios, Horarios, Disponibilidad, Clientes, Citas, Atención, Pagos, Dashboard) **aún no cuenta con persistencia ni implementación en el backend**. El estado funcional exacto de cada módulo se refleja en el código actual de `salonpro-backend/`.

## Arquitectura

```
Controller
    ↓
Port IN
    ↓
Application Service
    ↓
Domain
    ↓
Port OUT
    ↓
Persistence Adapter
    ↓
Spring Data JPA
    ↓
PostgreSQL
```

El backend sigue una arquitectura modular con principios de arquitectura hexagonal, separando dominio, aplicación e infraestructura dentro de cada módulo (por ejemplo, `usuario/` y `rol/`).

## Ejecución local

### Requisitos previos

- JDK 21
- PostgreSQL
- Maven
- Git

### 1. Clonar el repositorio

```bash
git clone https://github.com/a2025115628-crypto/SalonPro.git
```

### 2. Entrar a la carpeta del backend

```bash
cd SalonPro/salonpro-backend
```

### 3. Configurar PostgreSQL

**Primera vez en una máquina nueva:** la base de datos y las tablas deben crearse manualmente antes de correr el backend — Hibernate está configurado para solo *validar* el esquema (`ddl-auto=validate`), nunca crearlo. Sin este paso, el backend falla al arrancar con un error de tipo `missing table [rol]`.

Conectado a PostgreSQL como superusuario (`postgres`), por ejemplo desde DataGrip:

```sql
CREATE USER salonpro_admin WITH PASSWORD 'salonpro123!';

CREATE DATABASE salonpro
    WITH
    OWNER = salonpro_admin
    ENCODING = 'UTF8';
```

Ya conectado a la base **`salonpro`**:

```sql
CREATE TABLE rol (
    rol_id BIGINT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
    nombre_rol VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE usuario (
    usuario_id BIGINT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
    rol_id BIGINT NOT NULL,
    nombre VARCHAR(80) NOT NULL,
    apellido VARCHAR(80) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    telefono VARCHAR(30),
    activo BOOLEAN NOT NULL,
    fecha_creacion TIMESTAMP NOT NULL,
    CONSTRAINT fk_usuario_rol FOREIGN KEY (rol_id) REFERENCES rol(rol_id)
);
```

Estos valores (`salonpro_admin` / `salonpro123!` / base `salonpro`) son los que ya están configurados en `src/main/resources/application.properties` — usar los mismos evita tener que editar ese archivo. Son credenciales de desarrollo compartidas para la materia, no reales/productivas.

Después, verificar que `application.properties` efectivamente apunte a esto:

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/salonpro
spring.datasource.username=salonpro_admin
spring.datasource.password=salonpro123!
```

No subir credenciales *reales* (de producción) al repositorio — las de arriba son solo para desarrollo local en la materia.

### 4. Ejecutar el backend

Desde IntelliJ:

1. Abrir el proyecto `salonpro-backend`.
2. Esperar a que Maven cargue las dependencias.
3. Ejecutar la clase principal `SalonproBackendApplication`.
4. Verificar que no existan errores en consola.

Por Maven, desde `salonpro-backend/`:

```bash
./mvnw spring-boot:run
```

En Windows:

```bash
mvnw.cmd spring-boot:run
```

## Puerto

La API se ejecuta en:

```
http://localhost:8082
```

Documentación interactiva (Swagger UI):

```
http://localhost:8082/swagger-ui/index.html
```
