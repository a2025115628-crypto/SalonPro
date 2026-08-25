# Plan de migración V1 — SalonPro

## 1. Objetivo

Definir cómo se transformará el modelo físico v0.1 de SalonPro en la primera migración PostgreSQL reproducible.

La migración V1 debe crear únicamente una base coherente del núcleo del dominio, respetando el orden de dependencias y evitando incorporar lógica que todavía pertenece al backend.

---

## 2. Principios

- La migración debe ser reproducible desde una base vacía.
- Las tablas padre se crean antes que las tablas hijas.
- Las FK sólo se agregan cuando las tablas referenciadas ya existen.
- Las restricciones simples se implementan en base de datos.
- Las reglas transaccionales complejas permanecen en backend.
- No se usan borrados en cascada que destruyan historial de citas.
- Los nombres físicos deben coincidir con `modelo-fisico-v0.1.md`.

---

## 3. Alcance propuesto para V1

### Núcleo a crear

1. `rol`
2. `usuario`
3. `profesional`
4. `servicio`
5. `profesional_servicio`
6. `horario`
7. `bloqueo_horario`
8. `cliente`
9. `cita`
10. `cita_servicio`
11. `atencion`
12. `pago`
13. `auditoria`

> Si la guía de Clase 06 exige implementar primero sólo 4–6 tablas núcleo, este orden sirve como plan completo, pero la primera ejecución puede limitarse al subconjunto solicitado por el docente sin alterar el diseño.

---

## 4. Orden de creación

### Paso 1 — Catálogos e identidad base
Crear:
- `rol`
- `usuario`

Motivo: `usuario` depende de `rol`.

### Paso 2 — Entidades principales independientes del flujo de cita
Crear:
- `profesional`
- `servicio`
- `cliente`

Motivo: son referencias necesarias para las tablas operativas posteriores.

### Paso 3 — Configuración de profesionales
Crear:
- `profesional_servicio`
- `horario`
- `bloqueo_horario`

Motivo: dependen de `profesional` y/o `servicio`.

### Paso 4 — Reserva
Crear:
- `cita`
- `cita_servicio`

Motivo: `cita` depende de `cliente` y `profesional`; `cita_servicio` depende de `cita` y `servicio`.

### Paso 5 — Operación posterior a la cita
Crear:
- `atencion`
- `pago`

Motivo: ambas dependen de `cita`.

### Paso 6 — Trazabilidad
Crear:
- `auditoria`

Motivo: puede referenciar `usuario`.

---

## 5. Restricciones que sí deben entrar en V1

### PK
Todas las tablas deben tener PK.

### FK
Deben implementarse las FK descritas en el modelo físico.

### UNIQUE
Implementar inicialmente:
- `rol.nombre_rol`
- PK compuesta de `profesional_servicio`
- `cliente.usuario_id` cuando no sea NULL
- `profesional.usuario_id` cuando no sea NULL
- (`cita_id`, `servicio_id`) en `cita_servicio`
- `atencion.cita_id`
- `pago.cita_id`

### CHECK
Implementar:
- `servicio.duracion > 0`
- `horario.dia_semana BETWEEN 1 AND 7`
- `horario.hora_fin > horario.hora_inicio`
- `bloqueo_horario.fecha_hora_fin > fecha_hora_inicio`
- `cita.fecha_hora_fin > fecha_hora_inicio`
- dominio permitido de `cita.estado`
- `cita_servicio.precio_aplicado IS NULL OR precio_aplicado >= 0`
- `atencion.fecha_hora_fin IS NULL OR fecha_hora_fin > fecha_hora_inicio`
- `pago.monto >= 0`

---

## 6. Reglas que NO deben resolverse sólo en la migración

### RN-01 — solapamiento de profesional
Debe implementarse mediante validación transaccional/backend.

### RN-03 — profesional habilitado
Debe validarse en backend usando `profesional_servicio`.

### RN-05 — transición de estados
La BD limita valores posibles; la transición válida depende del estado anterior y del caso de uso.

### RN-07 — bloqueos
El backend debe consultar bloqueos y disponibilidad antes de reservar/reprogramar.

### RN-08 — congelamiento del precio
El backend debe copiar el precio aplicable a `cita_servicio.precio_aplicado` al confirmar.

### RN-09 — solapamiento personal configurable
Debe validarse en backend según configuración.

### RN-06 — conservación histórica
Debe protegerse con política de persistencia y permisos, no sólo con estructura.

---

## 7. Índices propuestos para V1 o V1.1

Prioridad alta:
- `idx_cita_profesional_inicio`
- `idx_cita_cliente_inicio`
- `idx_horario_profesional_dia`
- `idx_bloqueo_profesional_inicio`

Prioridad media:
- `idx_profesional_servicio_servicio`
- `idx_pago_fecha_hora`
- `idx_auditoria_usuario_fecha`

Si la Clase 06 limita la primera implementación, los índices no esenciales pueden pasar a una migración posterior.

---

## 8. Datos semilla mínimos

V1 puede incluir únicamente datos de catálogo estrictamente estables.

### Candidato
Tabla `rol`:
- Administrador
- Recepcionista
- Profesional
- Cliente
- Supervisor

No insertar todavía:
- clientes ficticios masivos
- profesionales reales
- citas
- pagos
- auditorías

Esos datos pertenecen al dataset de la etapa DML.

---

## 9. Estrategia de archivos de migración

Estructura candidata:

```text
src/main/resources/db/migration/
└── V1__create_salonpro_core.sql
```

Si el docente prefiere separar:

```text
V1__create_base_catalogs.sql
V2__create_professionals_and_services.sql
V3__create_appointments.sql
```

Para la primera evidencia se recomienda seguir exactamente el esquema de versionado que indique la guía de la clase de implementación.

---

## 10. Pruebas mínimas posteriores a la migración

Después de ejecutar V1, comprobar:

1. Base vacía → migración completa sin intervención manual.
2. Todas las tablas esperadas existen.
3. Todas las PK existen.
4. Todas las FK referencian la tabla correcta.
5. Se rechaza una duración de servicio <= 0.
6. Se rechaza un horario con fin <= inicio.
7. Se rechaza un estado de cita fuera del dominio.
8. Se rechaza un pago negativo.
9. Se rechaza una atención con fin anterior al inicio.
10. Se rechaza duplicar una habilitación `profesional_servicio`.

---

## 11. Pruebas controladas de violación

### Caso A — FK inválida
Intentar crear una cita con `cliente_id` inexistente.

**Resultado esperado:** rechazo por FK.

### Caso B — dominio inválido
Intentar guardar `cita.estado = 'pagada'`.

**Resultado esperado:** rechazo por CHECK.

### Caso C — intervalo inválido
Intentar guardar una cita con fin anterior al inicio.

**Resultado esperado:** rechazo por CHECK.

### Caso D — duplicación
Intentar duplicar el mismo par (`profesional_id`, `servicio_id`).

**Resultado esperado:** rechazo por PK compuesta.

---

## 12. Política de reversión

En desarrollo, la base debe poder reconstruirse desde cero usando las migraciones versionadas.

No se considera válido depender de:
- cambios manuales hechos en DataGrip;
- tablas creadas fuera de migraciones;
- correcciones directas no versionadas.

La migración es la fuente reproducible de la estructura física.

---

## 13. Evidencia esperada en Git

Al cerrar Clase 05 deben existir:

```text
docs/04-model/modelo-fisico-v0.1.md
docs/04-model/plan-migracion-v1.md
```

Commit sugerido:

```text
docs: define SalonPro physical model and migration plan
```

No incluir todavía un script SQL ejecutado si la clase actual sigue siendo exclusivamente de diseño físico.

---

## 14. Checklist de cierre

- [ ] Los nombres físicos son consistentes.
- [ ] Los tipos candidatos son compatibles con PostgreSQL.
- [ ] La estrategia de IDs está definida.
- [ ] Se decidió nulabilidad.
- [ ] Se identificaron PK, FK, UQ y CHECK.
- [ ] Las reglas complejas quedaron asignadas al backend.
- [ ] Los índices candidatos están justificados.
- [ ] El orden de creación respeta dependencias.
- [ ] No se propone borrado histórico incompatible con RN-06.
- [ ] El plan permite reconstruir la base de forma reproducible.

---

## 15. Estado

**Plan de migración V1 preparado para revisión y cierre de Clase 05.**

El siguiente paso, una vez aprobado, será la **Clase 06: primera implementación PostgreSQL mediante migración versionada**.
