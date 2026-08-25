# Modelo físico v0.1 — SalonPro

## 1. Fuente y alcance

- Proyecto oficial: **SalonPro**
- Base: `model-relational-v0.1.md`, `der-logico-v0.1.md`, `diccionario-datos-v0.1.md`, `decisiones-integridad-v0.1.md`
- Etapa: **Clase 05 — diseño físico previo a PostgreSQL**
- Objetivo: convertir el diseño lógico en una especificación física candidata para PostgreSQL, todavía sin ejecutar `CREATE TABLE`.

---

## 2. Convenciones físicas propuestas

### Nombres
- Tablas: `snake_case`
- Columnas: `snake_case`
- PK técnicas: `<tabla>_id`
- FK: mismo nombre que la PK referenciada
- Constraints: nombres descriptivos con prefijos `pk_`, `fk_`, `uq_`, `ck_`

### Identificadores
- Estrategia candidata: `BIGINT` con identidad generada por PostgreSQL para PK simples.
- En tablas asociativas con PK compuesta, se conserva la combinación de FK como PK cuando corresponda.

### Fechas y horas
- Fechas y horas de negocio: `TIMESTAMP`
- Horas recurrentes de horario: `TIME`
- Día de semana: `SMALLINT` o dominio equivalente con CHECK.

### Montos
- Valores monetarios: `NUMERIC(12,2)`

### Texto
- Nombres cortos/catálogos: `VARCHAR`
- Texto libre o de auditoría: `TEXT`

---

## 3. Tabla `rol`

| Columna | Tipo PostgreSQL candidato | Nulabilidad | Restricciones |
|---|---|---|---|
| `rol_id` | `BIGINT` | NOT NULL | PK, identidad |
| `nombre_rol` | `VARCHAR(50)` | NOT NULL | UQ |

### Constraints candidatas
- `pk_rol`
- `uq_rol_nombre_rol`

### Regla de dominio
`nombre_rol` debe representar los roles oficiales del sistema.

---

## 4. Tabla `usuario`

| Columna | Tipo PostgreSQL candidato | Nulabilidad | Restricciones |
|---|---|---|---|
| `usuario_id` | `BIGINT` | NOT NULL | PK, identidad |
| `rol_id` | `BIGINT` | NOT NULL | FK → `rol.rol_id` |

### Constraints candidatas
- `pk_usuario`
- `fk_usuario_rol`

### Pendiente
El identificador concreto de autenticación y sus credenciales no se agregan aún porque la ficha oficial no los define.

---

## 5. Tabla `profesional`

| Columna | Tipo PostgreSQL candidato | Nulabilidad | Restricciones |
|---|---|---|---|
| `profesional_id` | `BIGINT` | NOT NULL | PK, identidad |
| `usuario_id` | `BIGINT` | NULL | FK → `usuario.usuario_id`, UQ candidata |

### Constraints candidatas
- `pk_profesional`
- `fk_profesional_usuario`
- `uq_profesional_usuario`

---

## 6. Tabla `servicio`

| Columna | Tipo PostgreSQL candidato | Nulabilidad | Restricciones |
|---|---|---|---|
| `servicio_id` | `BIGINT` | NOT NULL | PK, identidad |
| `nombre` | `VARCHAR(120)` | NOT NULL | — |
| `duracion` | `INTEGER` | NOT NULL | CHECK > 0 |

### Interpretación física
`duracion` se representa en minutos enteros.

### Constraints candidatas
- `pk_servicio`
- `ck_servicio_duracion_positiva`

---

## 7. Tabla `profesional_servicio`

| Columna | Tipo PostgreSQL candidato | Nulabilidad | Restricciones |
|---|---|---|---|
| `profesional_id` | `BIGINT` | NOT NULL | PK compuesta, FK |
| `servicio_id` | `BIGINT` | NOT NULL | PK compuesta, FK |

### Constraints candidatas
- `pk_profesional_servicio`
- `fk_profesional_servicio_profesional`
- `fk_profesional_servicio_servicio`

La PK compuesta evita duplicar la misma habilitación profesional–servicio.

---

## 8. Tabla `horario`

| Columna | Tipo PostgreSQL candidato | Nulabilidad | Restricciones |
|---|---|---|---|
| `horario_id` | `BIGINT` | NOT NULL | PK, identidad |
| `profesional_id` | `BIGINT` | NOT NULL | FK |
| `dia_semana` | `SMALLINT` | NOT NULL | CHECK |
| `hora_inicio` | `TIME` | NOT NULL | — |
| `hora_fin` | `TIME` | NOT NULL | CHECK |

### Dominio propuesto
- `dia_semana` entre 1 y 7.
- `hora_fin > hora_inicio`.

### Constraints candidatas
- `pk_horario`
- `fk_horario_profesional`
- `ck_horario_dia_semana`
- `ck_horario_intervalo_valido`

---

## 9. Tabla `bloqueo_horario`

| Columna | Tipo PostgreSQL candidato | Nulabilidad | Restricciones |
|---|---|---|---|
| `bloqueo_horario_id` | `BIGINT` | NOT NULL | PK, identidad |
| `profesional_id` | `BIGINT` | NOT NULL | FK |
| `fecha_hora_inicio` | `TIMESTAMP` | NOT NULL | — |
| `fecha_hora_fin` | `TIMESTAMP` | NOT NULL | CHECK |

### Constraints candidatas
- `pk_bloqueo_horario`
- `fk_bloqueo_horario_profesional`
- `ck_bloqueo_horario_intervalo_valido`

---

## 10. Tabla `cliente`

| Columna | Tipo PostgreSQL candidato | Nulabilidad | Restricciones |
|---|---|---|---|
| `cliente_id` | `BIGINT` | NOT NULL | PK, identidad |
| `usuario_id` | `BIGINT` | NULL | FK, UQ candidata |

### Constraints candidatas
- `pk_cliente`
- `fk_cliente_usuario`
- `uq_cliente_usuario`

---

## 11. Tabla `cita`

| Columna | Tipo PostgreSQL candidato | Nulabilidad | Restricciones |
|---|---|---|---|
| `cita_id` | `BIGINT` | NOT NULL | PK, identidad |
| `cliente_id` | `BIGINT` | NOT NULL | FK |
| `profesional_id` | `BIGINT` | NOT NULL | FK |
| `fecha_hora_inicio` | `TIMESTAMP` | NOT NULL | — |
| `fecha_hora_fin` | `TIMESTAMP` | NOT NULL | CHECK |
| `estado` | `VARCHAR(30)` | NOT NULL | CHECK |

### Dominio físico candidato para `estado`
- `reservada`
- `confirmada`
- `en_atencion`
- `finalizada`
- `cancelada`
- `no_asistio`

### Constraints candidatas
- `pk_cita`
- `fk_cita_cliente`
- `fk_cita_profesional`
- `ck_cita_intervalo_valido`
- `ck_cita_estado_valido`

### Reglas que NO se resuelven con CHECK simple
- RN-01: solapamiento de citas por profesional.
- RN-09: solapamiento personal configurable.
- RN-05: validez de transición entre estados.

Estas reglas quedan para validación transaccional/backend.

---

## 12. Tabla `cita_servicio`

| Columna | Tipo PostgreSQL candidato | Nulabilidad | Restricciones |
|---|---|---|---|
| `cita_servicio_id` | `BIGINT` | NOT NULL | PK, identidad |
| `cita_id` | `BIGINT` | NOT NULL | FK |
| `servicio_id` | `BIGINT` | NOT NULL | FK |
| `precio_aplicado` | `NUMERIC(12,2)` | NULL inicialmente | CHECK >= 0 |

### Constraints candidatas
- `pk_cita_servicio`
- `fk_cita_servicio_cita`
- `fk_cita_servicio_servicio`
- `uq_cita_servicio`
- `ck_cita_servicio_precio_no_negativo`

### Nota
`precio_aplicado` puede permanecer NULL antes de la confirmación y debe quedar fijado al confirmar la cita, conforme RN-08.

---

## 13. Tabla `atencion`

| Columna | Tipo PostgreSQL candidato | Nulabilidad | Restricciones |
|---|---|---|---|
| `atencion_id` | `BIGINT` | NOT NULL | PK, identidad |
| `cita_id` | `BIGINT` | NOT NULL | FK, UQ |
| `fecha_hora_inicio` | `TIMESTAMP` | NOT NULL | — |
| `fecha_hora_fin` | `TIMESTAMP` | NULL | CHECK condicional |

### Constraints candidatas
- `pk_atencion`
- `fk_atencion_cita`
- `uq_atencion_cita`
- `ck_atencion_intervalo_valido`

La regla del intervalo debe permitir `fecha_hora_fin IS NULL` mientras la atención está en curso.

---

## 14. Tabla `pago`

| Columna | Tipo PostgreSQL candidato | Nulabilidad | Restricciones |
|---|---|---|---|
| `pago_id` | `BIGINT` | NOT NULL | PK, identidad |
| `cita_id` | `BIGINT` | NOT NULL | FK, UQ |
| `monto` | `NUMERIC(12,2)` | NOT NULL | CHECK >= 0 |
| `fecha_hora` | `TIMESTAMP` | NOT NULL | — |

### Constraints candidatas
- `pk_pago`
- `fk_pago_cita`
- `uq_pago_cita`
- `ck_pago_monto_no_negativo`

### Alcance
Registro operativo del MVP; no representa integración bancaria real.

---

## 15. Tabla `auditoria`

| Columna | Tipo PostgreSQL candidato | Nulabilidad | Restricciones |
|---|---|---|---|
| `auditoria_id` | `BIGINT` | NOT NULL | PK, identidad |
| `accion` | `TEXT` | NOT NULL | — |
| `fecha_hora` | `TIMESTAMP` | NOT NULL | — |
| `usuario_id` | `BIGINT` | NULL | FK |

### Constraints candidatas
- `pk_auditoria`
- `fk_auditoria_usuario`

### Pendiente
Antes de implementación final deben definirse los campos mínimos adicionales para identificar inequívocamente el registro afectado por la acción auditada.

---

## 16. Índices candidatos

| Índice candidato | Columnas | Justificación |
|---|---|---|
| `idx_cita_profesional_inicio` | `cita(profesional_id, fecha_hora_inicio)` | Agenda y validación de solapamiento. |
| `idx_cita_cliente_inicio` | `cita(cliente_id, fecha_hora_inicio)` | Historial y RN-09. |
| `idx_horario_profesional_dia` | `horario(profesional_id, dia_semana)` | Disponibilidad base. |
| `idx_bloqueo_profesional_inicio` | `bloqueo_horario(profesional_id, fecha_hora_inicio)` | Consulta de bloqueos. |
| `idx_profesional_servicio_servicio` | `profesional_servicio(servicio_id, profesional_id)` | Buscar profesionales habilitados. |
| `idx_pago_fecha_hora` | `pago(fecha_hora)` | Ingresos operativos por período. |
| `idx_auditoria_usuario_fecha` | `auditoria(usuario_id, fecha_hora)` | Trazabilidad. |

---

## 17. Política de borrado

### Cita
No debe eliminarse físicamente cuando forma parte del historial, conforme RN-06.

### Entidades relacionadas
No se propone `ON DELETE CASCADE` indiscriminado sobre entidades históricas como:
- `cita`
- `cita_servicio`
- `atencion`
- `pago`
- `auditoria`

La estrategia exacta de acciones referenciales se definirá en la migración/implementación cuidando no destruir trazabilidad.

---

## 18. Reglas físicas vs backend

| Regla | BD | Backend |
|---|---:|---:|
| PK/FK | Sí | — |
| Estados permitidos | CHECK | Sí para transición |
| Duración positiva | CHECK | Sí |
| Intervalos inicio < fin | CHECK | Sí |
| No solapamiento profesional | No suficiente | Sí |
| Profesional habilitado para servicio | FK parciales no suficientes | Sí |
| Bloqueo de agenda | No suficiente | Sí |
| Congelamiento de precio | Persistencia | Sí |
| Solapamiento cliente configurable | No suficiente | Sí |
| Conservación histórica | Restricciones/política | Sí |
| Pago operativo | Estructura | Sí |

---

## 19. Estado del documento

**Modelo físico v0.1 preparado para revisión.**

Todavía no se ejecuta SQL. El siguiente artefacto de la Clase 05 es `plan-migracion-v1.md`.
