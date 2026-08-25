# SalonPro — Modelo relacional v0.1

## 1. Fuente

- Proyecto oficial: **SalonPro**
- Modelo conceptual base: `model-conceptual-v0.1.md`
- Backlog base: `backlog-v0.1.md`
- Flujo crítico utilizado: **Administrador configura servicio/profesional/horario → cliente consulta disponibilidad y reserva → recepcionista confirma → profesional inicia y finaliza atención → se registra pago → dashboard refleja ocupación.**

Este documento transforma el modelo conceptual aprobado en una primera propuesta relacional. Cuando la ficha oficial o el modelo conceptual no permiten cerrar una decisión con suficiente respaldo, se registra explícitamente como **PENDIENTE DE DECISIÓN**.

---

## 2. Criterios de transformación

- Las relaciones **1:N** se transforman colocando la FK en el lado N.
- Las relaciones **N:M** se resuelven mediante una tabla puente.
- La optionalidad se documenta antes de decidir físicamente `NULL` / `NOT NULL`.
- Las claves naturales o combinaciones candidatas a `UNIQUE` sólo se proponen cuando existe justificación suficiente.
- Las reglas transaccionales se documentan y se mantienen trazables, pero todavía no se implementan físicamente.
- No se agregan atributos, cardinalidades o restricciones que no estén justificadas por la ficha oficial, el backlog aprobado o el modelo conceptual aprobado.

---

## 3. Tablas candidatas

### rol

**Propósito:** Representar los roles de acceso definidos para el sistema.

- `rol_id` [PK]
- `nombre_rol`

**Observación:** La relación exacta entre `Usuario` y `Rol` se mantiene conforme al modelo conceptual aprobado.

### usuario

**Propósito:** Representar la identidad de acceso al sistema cuando un actor requiera autenticación.

- `usuario_id` [PK]
- `rol_id` [FK -> `rol.rol_id`]

**PENDIENTE DE DECISIÓN:** El identificador concreto de autenticación del usuario, sus credenciales y las reglas de unicidad asociadas no están definidos por la ficha oficial ni deben asumirse en esta etapa.

### profesional

**Propósito:** Representar al profesional que presta servicios dentro de SalonPro.

- `profesional_id` [PK]
- `usuario_id` [FK -> `usuario.usuario_id`] **si corresponde según la relación aprobada en el modelo conceptual**

**PENDIENTE DE DECISIÓN:** La obligatoriedad de `usuario_id` no debe cerrarse todavía si el modelo conceptual no la definió expresamente.

### servicio

**Propósito:** Representar el catálogo de servicios ofrecidos por el salón.

- `servicio_id` [PK]
- `nombre`
- `duracion` — justificado por RN-02.

**Observación:** RN-02 establece que la duración de una cita depende del servicio seleccionado.

### profesional_servicio

**Propósito:** Resolver la asociación entre profesionales y servicios y representar qué profesionales están habilitados para prestar cada servicio.

- `profesional_id` [PK, FK -> `profesional.profesional_id`]
- `servicio_id` [PK, FK -> `servicio.servicio_id`]

**Justificación:** RN-03.

### horario

**Propósito:** Representar la configuración base de horarios de los profesionales.

- `horario_id` [PK]
- `profesional_id` [FK -> `profesional.profesional_id`]
- `dia_semana`
- `hora_inicio`
- `hora_fin`

### bloqueo_horario

**Propósito:** Representar intervalos de agenda que no están disponibles para reserva.

- `bloqueo_horario_id` [PK]
- `profesional_id` [FK -> `profesional.profesional_id`] **si esta relación quedó aprobada en el modelo conceptual**
- `fecha_hora_inicio`
- `fecha_hora_fin`

**PENDIENTE DE DECISIÓN:** Mantener la relación exacta de `BloqueoHorario` conforme al modelo conceptual aprobado. No deben inventarse nuevas relaciones físicas en esta etapa.

### cliente

**Propósito:** Representar a la persona que utiliza los servicios del salón y puede tener citas.

- `cliente_id` [PK]
- `usuario_id` [FK -> `usuario.usuario_id`] **si corresponde según el modelo conceptual**

**PENDIENTE DE DECISIÓN:** La obligatoriedad y cardinalidad exacta de la relación entre `Cliente` y `Usuario` sólo se cerrará si el modelo conceptual la respalda expresamente.

### cita

**Propósito:** Representar la reserva de un cliente con un profesional en un intervalo determinado.

- `cita_id` [PK]
- `cliente_id` [FK -> `cliente.cliente_id`]
- `profesional_id` [FK -> `profesional.profesional_id`]
- `fecha_hora_inicio`
- `fecha_hora_fin`
- `estado` — justificado por RN-05.

**Estados oficiales contemplados por RN-05:** reservada, confirmada, en atención, finalizada, cancelada y no asistió.

**Observación:** La matriz exacta de transiciones entre estados se mantiene como una regla de negocio a definir/validar posteriormente; no se asume una secuencia lineal no indicada por la ficha.

### cita_servicio

**Propósito:** Representar la asociación entre una cita y el servicio o servicios vinculados a ella, además de conservar el precio aplicado cuando corresponda.

- `cita_servicio_id` [PK]
- `cita_id` [FK -> `cita.cita_id`]
- `servicio_id` [FK -> `servicio.servicio_id`]
- `precio_aplicado` — justificado por RN-08.

**PENDIENTE DE DECISIÓN:** La multiplicidad exacta de servicios permitidos por cita no debe cerrarse en esta etapa si el modelo conceptual la dejó pendiente. La existencia de `CitaServicio` está exigida por la ficha oficial, pero no se debe inferir automáticamente que toda cita contiene múltiples servicios.

### atencion

**Propósito:** Registrar la atención operativa asociada a una cita.

- `atencion_id` [PK]
- `cita_id` [FK -> `cita.cita_id`]
- `fecha_hora_inicio`
- `fecha_hora_fin`

**PENDIENTE DE DECISIÓN:** La cardinalidad máxima exacta entre `Cita` y `Atencion` debe mantenerse conforme al modelo conceptual aprobado y no cerrarse como 1:1 sin respaldo explícito.

### pago

**Propósito:** Registrar el pago operativo simplificado vinculado al flujo de la cita, sin integración bancaria real.

- `pago_id` [PK]
- `cita_id` [FK -> `cita.cita_id`]
- `monto`
- `fecha_hora`

**Justificación:** RN-10.

**PENDIENTE DE DECISIÓN:** La cardinalidad máxima exacta entre `Cita` y `Pago` no está definida por la ficha oficial. Tampoco se asume un único pago, pagos parciales ni un método de pago específico en esta etapa.

### auditoria

**Propósito:** Representar la auditoría mínima exigida para conservar trazabilidad suficiente de operaciones críticas.

- `auditoria_id` [PK]
- `accion`
- `fecha_hora`
- `usuario_id` [FK -> `usuario.usuario_id`] **si la operación auditada puede vincularse a un usuario identificado**

**PENDIENTE DE DECISIÓN:** Los atributos adicionales necesarios para identificar con precisión la entidad o registro afectado deben definirse en la etapa correspondiente, sin inventarlos ahora.

---

## 4. Relaciones

| Relación | Cardinalidad | FK / tabla puente | Justificación |
|---|---|---|---|
| Usuario — Rol | Conforme al modelo conceptual aprobado | FK en `usuario` | Permite asociar identidad y rol del sistema. |
| Usuario — Cliente | PENDIENTE DE DECISIÓN si no quedó cerrada en el conceptual | FK candidata en `cliente` | No se debe asumir 1:1 obligatorio sin respaldo. |
| Usuario — Profesional | PENDIENTE DE DECISIÓN si no quedó cerrada en el conceptual | FK candidata en `profesional` | No se debe asumir obligatoriedad sin respaldo. |
| Cliente — Cita | 1:N | FK en `cita` | RN-09: un cliente puede tener varias citas. |
| Profesional — Cita | 1:N | FK en `cita` | RN-01 y RN-03 requieren identificar al profesional asignado a cada cita. |
| Profesional — Horario | 1:N | FK en `horario` | Permite configurar horarios por profesional. |
| Profesional — Servicio | N:M | `profesional_servicio` | RN-03 exige controlar qué profesionales están habilitados para cada servicio. |
| Cita — Servicio | Asociación mediante `cita_servicio`; multiplicidad exacta pendiente si no quedó cerrada | `cita_servicio` | La ficha oficial exige `CitaServicio`; no se infiere multiplicidad no aprobada. |
| Cita — Atencion | Conforme al modelo conceptual aprobado | FK en `atencion` | La atención depende de una cita; cardinalidad máxima no se inventa. |
| Cita — Pago | Conforme al modelo conceptual aprobado | FK en `pago` | RN-10 exige registro operativo de pago; cardinalidad máxima pendiente si no quedó cerrada. |
| Profesional — BloqueoHorario | Conforme al modelo conceptual aprobado | FK candidata en `bloqueo_horario` | RN-07 exige representar horarios bloqueados; se respeta la relación aprobada. |

---

## 5. Optionalidad de claves foráneas

| Tabla | FK | Estado de obligatoriedad | Justificación |
|---|---|---|---|
| `usuario` | `rol_id` | Conforme al modelo conceptual | La relación Usuario–Rol debe respetar lo ya aprobado. |
| `cliente` | `usuario_id` | PENDIENTE DE DECISIÓN | La ficha no establece que todo cliente deba poseer cuenta de usuario. |
| `profesional` | `usuario_id` | PENDIENTE DE DECISIÓN | La ficha no establece por sí sola que la identidad de acceso sea obligatoria desde la creación del profesional. |
| `cita` | `cliente_id` | Sí | Toda cita debe asociarse a un cliente para soportar RF-08, RF-16 y RN-09. |
| `cita` | `profesional_id` | Sí | Toda cita debe identificar al profesional asignado para soportar RN-01 y RN-03. |
| `profesional_servicio` | `profesional_id` | Sí | La asociación no existe sin profesional. |
| `profesional_servicio` | `servicio_id` | Sí | La asociación no existe sin servicio. |
| `horario` | `profesional_id` | Sí | El horario configurado pertenece al profesional correspondiente. |
| `bloqueo_horario` | `profesional_id` | Conforme al conceptual | Mantener la decisión aprobada para BloqueoHorario. |
| `cita_servicio` | `cita_id` | Sí | La asociación depende de una cita. |
| `cita_servicio` | `servicio_id` | Sí | La asociación debe señalar el servicio correspondiente. |
| `atencion` | `cita_id` | Sí cuando exista una Atención | La atención se registra a partir de una cita. |
| `pago` | `cita_id` | Sí cuando exista un Pago | El pago operativo debe vincularse a una cita. |
| `auditoria` | `usuario_id` | PENDIENTE DE DECISIÓN | La obligatoriedad depende del alcance concreto de auditoría y de si toda operación auditada tiene usuario identificable. |

---

## 6. Relaciones N:M

### profesional_servicio

Resuelve la relación entre `Profesional` y `Servicio`.

- `profesional_id` [FK]
- `servicio_id` [FK]

La combinación de ambos identificadores es candidata natural a evitar asociaciones duplicadas del mismo profesional con el mismo servicio.

**Justificación:** RN-03.

### cita_servicio

Representa la asociación entre `Cita` y `Servicio`.

- `cita_id` [FK]
- `servicio_id` [FK]
- `precio_aplicado`

**Justificación:** la ficha oficial exige el concepto `CitaServicio` y RN-08 requiere conservar el precio aplicado al confirmar.

**PENDIENTE DE DECISIÓN:** No se afirma que una cita deba contener múltiples servicios salvo que esa multiplicidad quede explícitamente aprobada.

---

## 7. Candidatas a UNIQUE

| Tabla | Campo/combinación | Justificación | Estado |
|---|---|---|---|
| `profesional_servicio` | `profesional_id` + `servicio_id` | Evita representar dos veces la misma habilitación profesional–servicio. | CANDIDATA |
| `usuario` | Identificador de acceso | La ficha no define cuál será el identificador ni su regla de unicidad. | PENDIENTE DE DECISIÓN |
| `cliente` | Clave natural | No existe una clave natural única definida oficialmente en esta etapa. | PENDIENTE DE DECISIÓN |
| `profesional` | Clave natural | No existe una clave natural única definida oficialmente en esta etapa. | PENDIENTE DE DECISIÓN |
| `servicio` | Clave natural | No existe una unicidad adicional suficientemente respaldada todavía. | PENDIENTE DE DECISIÓN |

---

## 8. Reglas de negocio que afectan el modelo

| RN | Implicación relacional |
|---|---|
| RN-01 | `cita` debe conservar profesional e intervalo temporal suficiente para validar solapamientos posteriormente. La validación es transaccional. |
| RN-02 | `servicio` debe conservar la duración necesaria para determinar la duración de una cita según el servicio seleccionado. No se asume una suma de múltiples servicios sin decisión explícita. |
| RN-03 | `profesional_servicio` representa la habilitación entre profesional y servicio; la asignación de una cita deberá validarse contra esta asociación. |
| RN-04 | La cancelación tardía debe quedar registrada y trazable. El mecanismo exacto de persistencia se termina de definir en etapas posteriores; no se atribuye obligatoriamente sólo a `auditoria`. |
| RN-05 | `cita` requiere un atributo `estado` capaz de representar los estados oficiales. La lógica de transición se valida posteriormente. |
| RN-06 | Las citas históricas deben conservarse. La estrategia física concreta para impedir eliminación se decidirá en la etapa de diseño físico/backend. |
| RN-07 | El modelo debe permitir identificar intervalos bloqueados que no pueden ofrecerse como disponibles. |
| RN-08 | `cita_servicio.precio_aplicado` conserva el precio aplicado cuando la cita es confirmada. |
| RN-09 | `cita` conserva `cliente_id` e intervalo temporal para poder aplicar posteriormente el control configurable de solapamiento personal. |
| RN-10 | `pago` representa únicamente un registro operativo simplificado; no se modela integración bancaria real. |

---

## 9. Dudas y decisiones pendientes

- **D-01:** Definir el mecanismo concreto de autenticación de `Usuario` y su identificador de acceso.
- **D-02:** Confirmar la cardinalidad y obligatoriedad exacta entre `Usuario` y `Cliente` si no quedó cerrada en el modelo conceptual.
- **D-03:** Confirmar la cardinalidad y obligatoriedad exacta entre `Usuario` y `Profesional` si no quedó cerrada en el modelo conceptual.
- **D-04:** Confirmar la multiplicidad exacta entre `Cita` y `Servicio`; la existencia de `CitaServicio` no implica por sí sola múltiples servicios por cita.
- **D-05:** Confirmar la cardinalidad máxima entre `Cita` y `Atencion`.
- **D-06:** Confirmar la cardinalidad máxima entre `Cita` y `Pago`.
- **D-07:** Mantener y justificar la relación exacta de `BloqueoHorario` conforme al modelo conceptual aprobado.
- **D-08:** Definir posteriormente los atributos mínimos necesarios de `Auditoria` para identificar adecuadamente las operaciones críticas auditadas.
- **D-09:** Definir posteriormente la matriz exacta de transiciones permitidas de `Cita.estado`.

---

## 10. Trazabilidad

| Tabla / relación | RN / RF asociado |
|---|---|
| `profesional` | RF-01 |
| `servicio`, `servicio.duracion` | RF-02, RN-02 |
| `profesional_servicio` | RF-03, RN-03 |
| `horario` | RF-04 |
| `bloqueo_horario` | RF-05, RN-07 |
| `cita.fecha_hora_inicio`, `cita.fecha_hora_fin`, `cita.profesional_id` | RF-06, RN-01 |
| `cliente` | RF-07 |
| `cita` | RF-08, RF-09, RF-10, RF-11, RF-13, RN-01, RN-05, RN-06, RN-09 |
| `cita_servicio` | RN-02, RN-03, RN-08 |
| `atencion` | RF-12 |
| `pago` | RF-14, RN-10 |
| `cita` + `profesional` + `horario` | RF-15 |
| `cliente` + `cita` | RF-16 |
| `cita` + `pago` | RF-17 |
| `auditoria` | RF-18 y criterio global de trazabilidad |

---

## 11. Revisión de coherencia

El modelo permite recorrer el flujo crítico de SalonPro sin asumir decisiones que la ficha oficial no define:

1. **Administrador configura:** `servicio`, `profesional`, `profesional_servicio`, `horario` y los bloqueos aplicables.
2. **Cliente consulta disponibilidad y reserva:** se utilizan `horario`, `bloqueo_horario`, `cita`, `profesional_servicio`, `cliente` y el servicio asociado para determinar opciones válidas.
3. **Recepcionista confirma:** `cita.estado` pasa a un estado válido y RN-08 exige conservar el `precio_aplicado` correspondiente.
4. **Profesional inicia y finaliza atención:** `atencion` registra la operación vinculada a la cita y la cita actualiza su estado conforme a las reglas permitidas.
5. **Se registra pago:** `pago` conserva el registro operativo vinculado a la cita, sin modelar pasarela bancaria real.
6. **Dashboard:** la información persistida en citas, horarios, atención y pagos permite obtener indicadores de ocupación e ingresos operativos.
7. **Auditoría:** las operaciones críticas deben conservar trazabilidad suficiente para explicar quién hizo qué y cuándo, conforme al alcance aprobado.

El modelo relacional v0.1 queda preparado para revisión cruzada del equipo antes de avanzar al DER lógico y al diccionario de datos.
