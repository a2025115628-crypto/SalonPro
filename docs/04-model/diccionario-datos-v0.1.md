# Diccionario de datos v0.1 — SalonPro

## 1. Fuente y alcance

- Proyecto oficial: **SalonPro**
- Base inmediata: `der-logico-v0.1.md`
- Etapa: **Clase 04 — diseño lógico**
- Este documento describe el significado de los atributos, su obligatoriedad lógica, su rol estructural, sus dominios preliminares y su trazabilidad hacia RN/RF.

> En esta etapa todavía no se asignan tipos PostgreSQL ni se escribe `CREATE TABLE`.

---

## 2. Convenciones

- **PK** = clave primaria
- **FK** = clave foránea
- **UQ** = unicidad
- **NN** = obligatorio
- **NULL** = puede faltar legítimamente
- **Condicional** = obligatorio sólo cuando se cumple una condición del negocio
- **Decisión v0.1** = decisión lógica del equipo, no texto literal de la ficha oficial

---

## 3. Tabla `rol`

| Campo | Significado | Obligatorio | PK/FK/UQ | Dominio / regla | Origen |
|---|---|---:|---|---|---|
| `rol_id` | Identificador técnico del rol. | Sí | PK | Valor único por rol. | Modelo mínimo oficial |
| `nombre_rol` | Nombre del perfil de acceso. | Sí | UQ | Administrador, Recepcionista, Profesional, Cliente o Supervisor. | Actores oficiales |

---

## 4. Tabla `usuario`

| Campo | Significado | Obligatorio | PK/FK/UQ | Dominio / regla | Origen |
|---|---|---:|---|---|---|
| `usuario_id` | Identificador técnico de la identidad de acceso. | Sí | PK | Único por usuario. | Modelo mínimo oficial |
| `rol_id` | Rol asignado al usuario. | Sí | FK → `rol.rol_id` | Debe referenciar un rol existente. | Usuarios / actores |

**Pendiente de etapa posterior:** definir el identificador concreto de autenticación y las credenciales. No se inventan en este diccionario.

---

## 5. Tabla `profesional`

| Campo | Significado | Obligatorio | PK/FK/UQ | Dominio / regla | Origen |
|---|---|---:|---|---|---|
| `profesional_id` | Identificador técnico del profesional. | Sí | PK | Único por profesional. | RF-01 |
| `usuario_id` | Cuenta de usuario vinculada al profesional, cuando exista. | No | FK → `usuario.usuario_id`; UQ candidata | Puede faltar mientras el profesional exista sólo como registro operativo. Si existe, no debe reutilizarse para dos profesionales. | Decisión lógica v0.1 |

---

## 6. Tabla `servicio`

| Campo | Significado | Obligatorio | PK/FK/UQ | Dominio / regla | Origen |
|---|---|---:|---|---|---|
| `servicio_id` | Identificador técnico del servicio. | Sí | PK | Único por servicio. | RF-02 |
| `nombre` | Nombre con el que se identifica el servicio. | Sí | — | Texto no vacío. | RF-02 |
| `duracion` | Duración utilizada para determinar la duración de la cita. | Sí | — | Debe representar una duración positiva. | RN-02, RF-02 |

---

## 7. Tabla `profesional_servicio`

| Campo | Significado | Obligatorio | PK/FK/UQ | Dominio / regla | Origen |
|---|---|---:|---|---|---|
| `profesional_id` | Profesional habilitado para prestar el servicio. | Sí | PK compuesta; FK → `profesional.profesional_id` | Debe referenciar un profesional existente. | RN-03, RF-03 |
| `servicio_id` | Servicio para el que el profesional está habilitado. | Sí | PK compuesta; FK → `servicio.servicio_id` | Debe referenciar un servicio existente. | RN-03, RF-03 |

**Regla:** la combinación (`profesional_id`, `servicio_id`) no puede repetirse.

---

## 8. Tabla `horario`

| Campo | Significado | Obligatorio | PK/FK/UQ | Dominio / regla | Origen |
|---|---|---:|---|---|---|
| `horario_id` | Identificador técnico del horario. | Sí | PK | Único por horario. | RF-04 |
| `profesional_id` | Profesional al que pertenece el horario configurado. | Sí | FK → `profesional.profesional_id` | Debe referenciar un profesional existente. | RF-04 |
| `dia_semana` | Día al que aplica el horario. | Sí | — | Debe pertenecer al conjunto válido de días de la semana. | RF-04 |
| `hora_inicio` | Inicio del tramo horario disponible. | Sí | — | Debe ser anterior a `hora_fin`. | RF-04 |
| `hora_fin` | Fin del tramo horario disponible. | Sí | — | Debe ser posterior a `hora_inicio`. | RF-04 |

---

## 9. Tabla `bloqueo_horario`

| Campo | Significado | Obligatorio | PK/FK/UQ | Dominio / regla | Origen |
|---|---|---:|---|---|---|
| `bloqueo_horario_id` | Identificador técnico del bloqueo. | Sí | PK | Único por bloqueo. | RF-05 |
| `profesional_id` | Profesional cuya disponibilidad queda bloqueada. | Sí | FK → `profesional.profesional_id` | Debe referenciar un profesional existente. | RN-07, RF-05; decisión lógica v0.1 |
| `fecha_hora_inicio` | Inicio del intervalo bloqueado. | Sí | — | Debe ser anterior a `fecha_hora_fin`. | RN-07, RF-05 |
| `fecha_hora_fin` | Fin del intervalo bloqueado. | Sí | — | Debe ser posterior a `fecha_hora_inicio`. | RN-07, RF-05 |

---

## 10. Tabla `cliente`

| Campo | Significado | Obligatorio | PK/FK/UQ | Dominio / regla | Origen |
|---|---|---:|---|---|---|
| `cliente_id` | Identificador técnico del cliente. | Sí | PK | Único por cliente. | RF-07 |
| `usuario_id` | Cuenta de usuario asociada al cliente, cuando exista. | No | FK → `usuario.usuario_id`; UQ candidata | Puede faltar si el cliente es registrado operativamente sin cuenta. Si existe, no debe reutilizarse para dos clientes. | Actor Cliente; decisión lógica v0.1 |

---

## 11. Tabla `cita`

| Campo | Significado | Obligatorio | PK/FK/UQ | Dominio / regla | Origen |
|---|---|---:|---|---|---|
| `cita_id` | Identificador técnico de la cita. | Sí | PK | Único por cita. | RF-08 |
| `cliente_id` | Cliente al que pertenece la cita. | Sí | FK → `cliente.cliente_id` | Debe referenciar un cliente existente. | RN-09, RF-08 |
| `profesional_id` | Profesional asignado a la cita. | Sí | FK → `profesional.profesional_id` | Debe estar habilitado para el servicio asociado. | RN-01, RN-03, RF-08 |
| `fecha_hora_inicio` | Inicio programado de la cita. | Sí | — | Debe ser anterior a `fecha_hora_fin`. | RN-01, RN-09 |
| `fecha_hora_fin` | Fin programado de la cita. | Sí | — | Debe ser posterior a `fecha_hora_inicio`. | RN-01, RN-02, RN-09 |
| `estado` | Estado actual de la cita. | Sí | — | reservada, confirmada, en atención, finalizada, cancelada o no asistió. | RN-05 |

**Reglas asociadas:**
- No se permite solapamiento de citas para un mismo profesional (RN-01).
- El control de solapamiento personal del cliente es configurable (RN-09).
- Las citas históricas se conservan (RN-06).
- Las transiciones de estado deben ser válidas (RN-05).

---

## 12. Tabla `cita_servicio`

| Campo | Significado | Obligatorio | PK/FK/UQ | Dominio / regla | Origen |
|---|---|---:|---|---|---|
| `cita_servicio_id` | Identificador técnico de la asociación cita–servicio. | Sí | PK | Único por registro. | Modelo mínimo oficial |
| `cita_id` | Cita a la que pertenece la asociación. | Sí | FK → `cita.cita_id` | Debe referenciar una cita existente. | Modelo mínimo oficial |
| `servicio_id` | Servicio asociado a la cita. | Sí | FK → `servicio.servicio_id` | Debe referenciar un servicio existente. | RN-02, RN-03 |
| `precio_aplicado` | Precio que queda asociado históricamente a la cita al confirmarse. | Condicional | — | Debe conservarse sin alteración una vez confirmada la cita. | RN-08 |

**UQ candidata:** (`cita_id`, `servicio_id`) para evitar duplicar la misma asociación.

**Nota:** la ficha exige `CitaServicio`, pero no define por sí sola la cantidad funcional exacta de servicios permitidos por cita.

---

## 13. Tabla `atencion`

| Campo | Significado | Obligatorio | PK/FK/UQ | Dominio / regla | Origen |
|---|---|---:|---|---|---|
| `atencion_id` | Identificador técnico de la atención. | Sí | PK | Único por atención. | RF-12 |
| `cita_id` | Cita que origina la atención. | Sí | FK → `cita.cita_id`; UQ | Máximo una atención por cita según decisión lógica v0.1. | RF-12; decisión v0.1 |
| `fecha_hora_inicio` | Momento real en que inicia la atención. | Sí | — | Debe existir al iniciar atención. | RF-12 |
| `fecha_hora_fin` | Momento real en que finaliza la atención. | No | — | Puede ser NULL mientras la atención se encuentre en curso; al existir debe ser posterior al inicio. | RF-12; decisión v0.1 |

---

## 14. Tabla `pago`

| Campo | Significado | Obligatorio | PK/FK/UQ | Dominio / regla | Origen |
|---|---|---:|---|---|---|
| `pago_id` | Identificador técnico del registro de pago. | Sí | PK | Único por pago. | RF-14 |
| `cita_id` | Cita a la que corresponde el pago operativo. | Sí | FK → `cita.cita_id`; UQ | Máximo un pago operativo consolidado por cita según decisión lógica v0.1. | RN-10, RF-14; decisión v0.1 |
| `monto` | Importe registrado operativamente. | Sí | — | Debe ser un valor monetario válido y no negativo. | RF-14, RF-17 |
| `fecha_hora` | Momento en que se registra el pago operativo. | Sí | — | Debe representar una fecha/hora válida. | RF-14 |

**Alcance:** no modela pasarela bancaria ni integración financiera real (RN-10).

---

## 15. Tabla `auditoria`

| Campo | Significado | Obligatorio | PK/FK/UQ | Dominio / regla | Origen |
|---|---|---:|---|---|---|
| `auditoria_id` | Identificador técnico del evento auditado. | Sí | PK | Único por evento. | Modelo mínimo oficial |
| `accion` | Acción relevante que debe conservarse para trazabilidad. | Sí | — | Debe describir una operación crítica del sistema. | RF-18, criterio global de trazabilidad |
| `fecha_hora` | Momento en que ocurrió la acción. | Sí | — | Fecha/hora válida. | RF-18 |
| `usuario_id` | Usuario responsable de la acción cuando pueda identificarse. | No | FK → `usuario.usuario_id` | Puede faltar únicamente si el evento no tiene usuario autenticado atribuible. | RF-18; decisión v0.1 |

**Pendiente para diseño físico:** determinar los campos adicionales mínimos para identificar inequívocamente el registro o entidad afectada por cada evento auditado.

---

## 16. Dominios y reglas preliminares resumidas

| Elemento | Regla preliminar |
|---|---|
| `rol.nombre_rol` | Conjunto controlado de roles oficiales. |
| `servicio.duracion` | Duración positiva. |
| `horario.dia_semana` | Día válido de la semana. |
| `horario` | `hora_fin` > `hora_inicio`. |
| `bloqueo_horario` | `fecha_hora_fin` > `fecha_hora_inicio`. |
| `cita` | `fecha_hora_fin` > `fecha_hora_inicio`. |
| `cita.estado` | Dominio cerrado de estados oficiales de RN-05. |
| `profesional_servicio` | Par profesional–servicio no duplicado. |
| `cita_servicio.precio_aplicado` | Se congela al confirmar la cita. |
| `atencion` | Inicio obligatorio; fin nullable durante atención en curso. |
| `pago.monto` | Valor monetario no negativo. |

---

## 17. Trazabilidad general

| Área | Tablas principales | RN/RF |
|---|---|---|
| Profesionales | `profesional`, `profesional_servicio` | RF-01, RF-03, RN-03 |
| Servicios | `servicio`, `cita_servicio` | RF-02, RN-02, RN-08 |
| Horarios y disponibilidad | `horario`, `bloqueo_horario`, `cita` | RF-04, RF-05, RF-06, RN-01, RN-07 |
| Clientes y citas | `cliente`, `cita`, `cita_servicio` | RF-07 a RF-11, RF-13, RN-04 a RN-06, RN-09 |
| Atención | `atencion`, `cita` | RF-12 |
| Pago | `pago`, `cita` | RF-14, RF-17, RN-10 |
| Agenda e historial | `cita`, `cliente`, `profesional` | RF-15, RF-16 |
| Auditoría | `auditoria`, `usuario` | RF-18 |
| Dashboard | `cita`, `horario`, `atencion`, `pago` | RF-17 |

---

## 18. Estado del documento

**Diccionario de datos v0.1 preparado para revisión cruzada.**

El siguiente documento obligatorio de la Clase 04 es `decisiones-integridad-v0.1.md`.
