# Decisiones de integridad v0.1 — SalonPro

## 1. Fuente y alcance

- Proyecto oficial: **SalonPro**
- Base: `model-relational-v0.1.md`, `der-logico-v0.1.md` y `diccionario-datos-v0.1.md`
- Etapa: **Clase 04 — diseño lógico**
- Objetivo: relacionar RN/RF con mecanismos de integridad previstos y justificar qué debe protegerse en base de datos y qué requiere lógica de backend.

> En esta etapa los mecanismos son decisiones previstas. Todavía no se escribe `CREATE TABLE` ni se implementan constraints físicos.

---

## 2. Convenciones de protección prevista

- **PK**: identidad única de cada fila.
- **FK**: integridad referencial entre entidades.
- **UQ**: evita duplicados lógicamente inválidos.
- **NN**: atributo obligatorio.
- **CHECK**: dominio o condición simple verificable.
- **Backend / transacción**: regla que requiere consultar múltiples filas, estado previo, configuración o lógica temporal.
- **Política de persistencia**: regla de conservación histórica.
- **Auditoría**: trazabilidad de acciones críticas.

---

## 3. Matriz de decisiones de integridad

| RN/RF | Regla / necesidad | Protección prevista | Justificación |
|---|---|---|---|
| RF-01 | Gestionar profesionales. | PK, FK | `profesional_id` identifica al profesional; vínculo opcional con `usuario`. |
| RF-02 / RN-02 | Gestionar servicio y duración; duración de cita depende del servicio. | PK, NN, CHECK preliminar, backend | `servicio.duracion` debe existir y ser positiva; la lógica de cita usa esa duración. |
| RF-03 / RN-03 | Sólo profesionales habilitados pueden realizar un servicio. | PK compuesta, FK, backend | `profesional_servicio` evita asociaciones duplicadas y el backend valida la habilitación al reservar. |
| RF-04 | Configurar horarios. | PK, FK, NN, CHECK preliminar | Cada horario pertenece a un profesional y debe tener intervalo coherente. |
| RF-05 / RN-07 | Registrar bloqueos; bloqueados no disponibles. | PK, FK, NN, CHECK, backend | El rango de bloqueo debe ser válido y la disponibilidad debe excluirlo. |
| RF-06 | Consultar slots disponibles. | Índices candidatos posteriores + backend | La disponibilidad resulta de horarios, bloqueos, citas e habilitación de servicio. |
| RF-07 | Registrar clientes. | PK; FK opcional a usuario | Un cliente tiene identidad propia aun si todavía no posee cuenta de acceso. |
| RF-08 / RN-01 | Crear cita sin doble reserva profesional. | FK, NN, backend transaccional | El solapamiento depende de otras citas existentes y del intervalo solicitado; no basta un CHECK local. |
| RF-09 / RN-01 / RN-07 / RN-09 | Reprogramar cita respetando disponibilidad. | Backend transaccional | Al mover una cita se deben volver a validar profesional, bloqueos, intervalos y solapamiento personal configurable. |
| RF-10 / RN-04 / RN-06 | Cancelar cita con motivo y conservar historial. | Estado + auditoría + política de persistencia | La cita no se borra; la cancelación debe permanecer trazable. |
| RF-11 / RN-05 / RN-08 | Confirmar asistencia y congelar precio. | Backend + dominio de estado + persistencia del snapshot | Al confirmar, se valida transición de estado y se conserva `precio_aplicado`. |
| RF-12 | Iniciar/finalizar atención. | FK, UQ, NN parcial, backend | `atencion.cita_id` vincula la atención; el fin puede faltar mientras esté en curso; el backend controla transición. |
| RF-13 / RN-05 | Registrar no asistencia. | Dominio de estado + backend | Sólo debe alcanzarse mediante una transición coherente. |
| RF-14 / RN-10 | Registrar pago simplificado. | PK, FK, NN, UQ según decisión v0.1 | El pago es operativo y queda asociado a una cita, sin pasarela real. |
| RF-15 | Consultar agenda diaria/semanal. | FK + índices candidatos posteriores | Las consultas usarán profesional y rango temporal. |
| RF-16 / RN-06 | Consultar historial del cliente. | FK + política de persistencia | Las citas históricas deben conservarse y estar vinculadas al cliente. |
| RF-17 | Mostrar ocupación e ingresos operativos. | Datos consistentes + índices candidatos | Ocupación usa citas/horarios; ingresos usan pagos operativos. |
| RF-18 | Auditar cambios de agenda. | Auditoría + FK opcional a usuario | Debe conservarse quién hizo qué y cuándo, según el criterio global de trazabilidad. |
| RN-01 | No solapamiento de citas para mismo profesional. | Backend transaccional | Requiere comparar intervalos con otras filas activas/relevantes. |
| RN-04 | Cancelaciones tardías quedan registradas. | Auditoría + estado/histórico | No se debe perder la evidencia de cancelación. |
| RN-05 | Estados válidos de cita. | CHECK/dominio + backend | CHECK limita valores; backend controla transiciones entre estados. |
| RN-06 | No eliminar citas históricas. | Política de persistencia + backend/permisos | No debe depender de una operación DELETE indiscriminada. |
| RN-08 | Precio aplicado congelado al confirmar. | Snapshot + backend | `cita_servicio.precio_aplicado` conserva el valor histórico aplicado. |
| RN-09 | Solapamiento personal configurable del cliente. | Backend + configuración | La regla depende de un parámetro configurable y de otras citas del cliente. |
| RN-10 | Pago operativo, no integración bancaria. | Límite de alcance | La tabla `pago` no representa autorización bancaria, gateway ni conciliación externa. |

---

## 4. Decisiones lógicas v0.1 del equipo

Estas decisiones no provienen literalmente de una RN/RF; se adoptan para que el modelo lógico sea coherente y deben poder defenderse.

### DI-01 — Cliente puede existir sin Usuario

`cliente.usuario_id` será opcional en el modelo lógico.

**Justificación:** Recepción puede registrar clientes operativamente y la ficha no obliga a que toda persona registrada tenga cuenta autenticada desde el primer momento.

### DI-02 — Profesional puede existir sin Usuario

`profesional.usuario_id` será opcional en el modelo lógico.

**Justificación:** El administrador debe poder configurar profesionales como parte del dominio operativo sin forzar que la cuenta de acceso exista simultáneamente.

### DI-03 — Un Usuario no debe duplicarse dentro del mismo subtipo

Cuando exista `cliente.usuario_id` o `profesional.usuario_id`, se propone unicidad en esa columna.

**Justificación:** evita vincular la misma cuenta a dos clientes o a dos profesionales distintos.

### DI-04 — BloqueoHorario afecta directamente a Profesional

`bloqueo_horario.profesional_id` identifica al profesional cuya disponibilidad queda bloqueada.

**Justificación:** RN-07 y RF-05 requieren poder excluir intervalos concretos de la agenda disponible de un profesional.

### DI-05 — Una cita tiene como máximo una Atención en el MVP

`atencion.cita_id` se propone como UQ.

**Justificación:** el flujo crítico describe iniciar y finalizar la atención correspondiente a una cita como un único ciclo operativo. Si posteriormente el alcance exige múltiples sesiones, esta decisión deberá versionarse.

### DI-06 — Una cita tiene como máximo un Pago operativo en el MVP

`pago.cita_id` se propone como UQ.

**Justificación:** simplifica el registro operativo del MVP sin convertirlo en un sistema de pagos parciales. Esta decisión no se presenta como texto literal de RN-10 y deberá revisarse si el docente exige otra cardinalidad.

### DI-07 — Fecha de fin de Atención puede ser NULL

`atencion.fecha_hora_fin` puede faltar mientras la atención está en curso.

**Justificación:** RF-12 separa iniciar y finalizar atención; durante el intervalo entre ambas acciones aún no existe hora de finalización.

### DI-08 — CitaServicio no implica por sí solo múltiples servicios obligatorios

Se conserva `cita_servicio` porque forma parte del modelo mínimo oficial.

**Justificación:** la ficha no define expresamente la cantidad funcional exacta de servicios por cita. Cualquier restricción adicional se documentará de manera explícita.

### DI-09 — El identificador de autenticación queda pendiente

No se agregan todavía `email`, `username`, `password_hash` u otros campos de autenticación al modelo lógico.

**Justificación:** la ficha oficial exige `Usuario`, pero no define esos atributos.

---

## 5. Prueba obligatoria de contradicción

| Regla | Dato inválido posible sin protección | Protección prevista |
|---|---|---|
| RN-01 | Profesional 12 tiene cita 10:00–11:00 y se intenta registrar otra 10:30–11:30. | Validación transaccional/backend antes de crear o reprogramar. |
| RN-03 | Una cita asigna el servicio 7 al profesional 4 aunque no existe (`4`,`7`) en `profesional_servicio`. | FK para asociaciones válidas + validación backend contra `profesional_servicio`. |
| RN-07 | Se intenta reservar al profesional 8 durante un intervalo presente en `bloqueo_horario`. | Consulta de disponibilidad + validación backend antes de confirmar reserva. |
| RN-05 | Se intenta guardar `estado = "pagada"` aunque no pertenece al conjunto oficial de estados de cita. | Dominio/CHECK preliminar de estados válidos. |
| RN-08 | Después de confirmar la cita se cambia el precio actual de `servicio` y el historial de la cita cambia también. | Snapshot `cita_servicio.precio_aplicado` congelado al confirmar. |
| RN-06 | Un operador intenta borrar físicamente una cita finalizada para “limpiar” datos. | Política de persistencia y permisos/backend que preserven históricos. |

---

## 6. Reglas que NO se resuelven sólo con constraints simples

### RN-01 — Solapamiento de profesional

Una restricción simple sobre una sola fila no puede determinar si otro intervalo existente se superpone. Requiere consulta y control transaccional.

### RN-03 — Profesional habilitado para servicio

Las FK garantizan que profesional y servicio existan, pero no que el profesional de `cita` coincida con una combinación válida en `profesional_servicio`. Requiere validación de negocio.

### RN-05 — Transiciones de estado

Un dominio puede impedir valores inventados, pero no puede decidir por sí solo si la transición desde el estado anterior al nuevo es válida. Requiere lógica de backend.

### RN-07 — Bloqueos de agenda

Un CHECK puede validar que el inicio sea anterior al fin, pero no puede impedir por sí solo que una reserva coincida con otro intervalo almacenado.

### RN-09 — Solapamiento personal configurable

Depende de otras citas del cliente y de un parámetro configurable; requiere backend.

### RN-08 — Congelamiento del precio

La base puede conservar el snapshot, pero el momento exacto en que debe fijarse el valor depende del evento de confirmación y de la lógica transaccional.

---

## 7. Índices candidatos para la etapa física

Todavía no se crean, pero deben evaluarse en Clase 05/06:

| Tabla | Columnas candidatas | Motivo |
|---|---|---|
| `cita` | (`profesional_id`, `fecha_hora_inicio`) | Búsqueda de agenda y validación de solapamientos. |
| `cita` | (`cliente_id`, `fecha_hora_inicio`) | Historial y solapamiento personal. |
| `horario` | (`profesional_id`, `dia_semana`) | Consulta de disponibilidad base. |
| `bloqueo_horario` | (`profesional_id`, `fecha_hora_inicio`) | Descontar bloqueos durante búsqueda de slots. |
| `profesional_servicio` | (`servicio_id`, `profesional_id`) | Buscar profesionales habilitados por servicio. |
| `pago` | `fecha_hora` | Consultas de ingresos por período. |
| `auditoria` | (`usuario_id`, `fecha_hora`) | Trazabilidad por actor y momento. |

---

## 8. Revisión cruzada del equipo

Antes del commit, un integrante distinto del autor debe verificar:

- [ ] Cada PK identifica una fila de forma inequívoca.
- [ ] Cada FK está ubicada en el lado correcto.
- [ ] La nulabilidad tiene una justificación de negocio.
- [ ] Las UQ no fueron inventadas por costumbre técnica.
- [ ] RN-01 y RN-09 están reconocidas como reglas transaccionales.
- [ ] RN-05 diferencia dominio de valores y transición de estados.
- [ ] RN-06 conserva históricos.
- [ ] RN-08 conserva el precio aplicado.
- [ ] RN-10 no introduce integración bancaria real.
- [ ] El flujo crítico completo puede explicarse utilizando el DER.
- [ ] Las decisiones DI-01 a DI-09 pueden ser defendidas por cualquier integrante.

---

## 9. Estado de cierre de Clase 04

Con los siguientes archivos:

- `docs/04-model/der-logico-v0.1.md`
- `docs/04-model/diccionario-datos-v0.1.md`
- `docs/04-model/decisiones-integridad-v0.1.md`

el equipo cuenta con los tres artefactos documentales obligatorios de la Clase 04.

Antes de hacer commit:
1. realizar revisión cruzada;
2. confirmar que los tres archivos usan los mismos nombres y relaciones;
3. verificar que no se haya agregado SQL ni tipos PostgreSQL;
4. comprobar que cualquier integrante pueda explicar las decisiones principales.

Después de eso, la Clase 04 puede cerrarse y el siguiente paso es la **Clase 05 — diseño físico previo a PostgreSQL**.
