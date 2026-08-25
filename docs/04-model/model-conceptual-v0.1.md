# Modelo conceptual v0.1 — SalonPro

## 1. Objetivo

Este documento identifica los conceptos principales del dominio de **SalonPro**, sus responsabilidades, atributos conceptuales mínimos, relaciones, cardinalidades justificables y primeras reglas de integridad. Su propósito es servir como base estable para la transformación posterior al modelo relacional, sin adelantar decisiones físicas de PostgreSQL ni detalles de implementación Java.

---

## 2. Fuente analizada

- Proyecto asignado: **SalonPro — Agenda, Servicios, Profesionales y Operación de Salón/SPA**.
- Secciones de la ficha oficial utilizadas: A, B, C, D, E, F, G, J, K y L.
- Conceptos mínimos exigidos por la ficha: **Usuario, Rol, Profesional, Servicio, ProfesionalServicio, Horario, BloqueoHorario, Cliente, Cita, CitaServicio, Atencion, Pago y Auditoria**.

> Regla de modelado: cuando la ficha no define un atributo, cardinalidad o identificador concreto, este documento no lo presenta como requisito oficial. Las decisiones que corresponden al modelo relacional o físico se dejan explícitamente para esa etapa.

---

## 3. Candidatos analizados

| Concepto | Clasificación | Justificación | Fuente principal |
|---|---|---|---|
| Usuario | Entidad de soporte | Permite representar identidad operativa para acciones y trazabilidad; la ficha exige el concepto Usuario. | Sección F, RF-18, criterios globales |
| Rol | Entidad/catálogo de soporte | Representa responsabilidades o permisos asociados a los actores del sistema; la ficha exige el concepto Rol. | Secciones C y F |
| Profesional | Entidad de dominio | Actor operativo que consulta agenda y actualiza atención; además es gestionado y asignado a servicios/citas. | C, RF-01, RF-03, RF-15 |
| Servicio | Entidad de dominio | Elemento gestionable cuya duración afecta la cita y cuya relación con profesionales debe controlarse. | D, RN-02, RF-02, RF-03 |
| ProfesionalServicio | Entidad asociativa de dominio | Representa la habilitación de un Profesional para un Servicio. | RN-03, RF-03, F |
| Horario | Entidad de dominio | Representa horarios configurados que participan en el cálculo de disponibilidad. | D, RF-04, RF-06 |
| BloqueoHorario | Entidad de dominio | Representa periodos de agenda que no deben estar disponibles para reserva. | RN-07, RF-05, RF-06 |
| Cliente | Entidad de dominio | Actor que reserva y consulta citas; un cliente puede tener varias citas. | C, RN-09, RF-07, RF-16 |
| Cita | Entidad núcleo | Representa la reserva y su ciclo operativo; concentra reglas de solapamiento, estados, conservación y confirmación. | RN-01, RN-04 a RN-09, RF-08 a RF-13 |
| CitaServicio | Entidad asociativa/detalle | Concepto mínimo oficial que vincula la cita con el servicio y permite conservar información aplicada a esa relación, incluido el precio aplicado cuando corresponda. | F, RN-02, RN-08 |
| Atencion | Entidad de dominio | Representa la ejecución real de la atención asociada a una cita. | F, RF-12 |
| Pago | Entidad de dominio | Representa el registro operativo de pago del MVP. | RN-10, RF-14, F |
| Auditoria | Entidad de soporte/trazabilidad | Registra cambios relevantes de agenda y apoya la exigencia de explicar quién hizo qué y cuándo. | RF-18, F, criterios globales |
| Administrador | Actor/Rol | Configura servicios, profesionales, horarios y parámetros. | C |
| Recepcionista | Actor/Rol | Agenda, reprograma y cancela citas. | C |
| Profesional (actor) | Actor además de entidad de dominio | Consulta agenda y actualiza atención. | C |
| Cliente (actor) | Actor además de entidad de dominio | Reserva, consulta y cancela según reglas. | C |
| Supervisor | Actor/Rol | Consulta KPIs y excepciones. | C |
| Estado de Cita | Atributo/dominio controlado | La cita debe encontrarse en estados válidos y respetar transiciones válidas. | RN-05 |
| Duración | Atributo conceptual de Servicio | La duración de la cita depende del servicio seleccionado. | RN-02 |
| Precio aplicado | Dato histórico de la relación cita-servicio | Debe quedar congelado al confirmar la cita. | RN-08 |
| Dashboard / indicadores | Resultado derivado | Se obtiene a partir de datos operativos; no constituye una entidad mínima exigida. | RF-17, flujo crítico |

---

## 4. Entidades núcleo v0.1

### Usuario

**Responsabilidad:** representar la identidad operativa utilizada por el sistema cuando sea necesario asociar acciones, permisos o trazabilidad.  
**Atributos conceptuales mínimos:** identidad de usuario y datos necesarios para reconocerlo dentro del sistema.  
**Identificador de negocio candidato:** no definido por la ficha; se resolverá en el modelo relacional/físico.

### Rol

**Responsabilidad:** representar los roles o responsabilidades de acceso asociados a los actores del sistema.  
**Atributos conceptuales mínimos:** nombre o denominación del rol.  
**Identificador de negocio candidato:** no definido por la ficha.

### Profesional

**Responsabilidad:** representar a la persona que presta servicios, consulta su agenda y participa en la atención.  
**Atributos conceptuales mínimos:** datos de identificación y descripción necesarios para gestionar al profesional.  
**Identificador de negocio candidato:** no definido por la ficha.

> No se introduce en esta etapa un estado global “habilitado/inactivo” ni una “especialidad” como requisito oficial. La habilitación para prestar un servicio se representa mediante **ProfesionalServicio** conforme a RN-03.

### Servicio

**Responsabilidad:** representar un servicio ofrecido por SalonPro y la duración necesaria para planificar una cita.  
**Atributos conceptuales mínimos:** nombre o descripción del servicio, duración y valor/precio vigente necesario para posteriormente fijar el precio aplicado de RN-08.  
**Identificador de negocio candidato:** no definido por la ficha.

### ProfesionalServicio

**Responsabilidad:** representar la habilitación de un Profesional para prestar un Servicio específico.  
**Atributos conceptuales mínimos:** referencias conceptuales a Profesional y Servicio.  
**Identificador de negocio candidato:** combinación Profesional + Servicio como candidata conceptual de unicidad; la implementación concreta se decide en el modelo relacional.

> No se incorpora `fechaHabilitacion` porque la ficha oficial no exige conservarla.

### Horario

**Responsabilidad:** representar periodos configurados de trabajo que participan en el cálculo de disponibilidad.  
**Atributos conceptuales mínimos:** día/fecha aplicable, hora de inicio y hora de fin según la estrategia que se concrete posteriormente.  
**Identificador de negocio candidato:** no definido por la ficha.

### BloqueoHorario

**Responsabilidad:** representar un periodo temporal de agenda que no puede ofrecerse para reserva.  
**Atributos conceptuales mínimos:** inicio del bloqueo, fin del bloqueo y, si el caso de uso lo requiere, motivo descriptivo del bloqueo.  
**Identificador de negocio candidato:** no definido por la ficha.

### Cliente

**Responsabilidad:** representar a la persona que reserva, consulta y cancela citas y cuyo historial debe poder consultarse.  
**Atributos conceptuales mínimos:** datos de identificación y contacto necesarios para gestionar al cliente.  
**Identificador de negocio candidato:** no definido por la ficha.

> No se declara todavía documento, correo o teléfono como UNIQUE porque la ficha no define esa restricción.

### Cita

**Responsabilidad:** representar la reserva de atención de un Cliente con un Profesional, en un intervalo determinado y bajo un estado controlado.  
**Atributos conceptuales mínimos:** fecha/hora o intervalo de la cita, estado y motivo de cancelación cuando corresponda.  
**Identificador de negocio candidato:** no definido por la ficha.

### CitaServicio

**Responsabilidad:** representar la asociación entre una Cita y el Servicio correspondiente, y conservar el precio aplicado que debe quedar congelado al confirmar la cita.  
**Atributos conceptuales mínimos:** referencia a Cita, referencia a Servicio y precioAplicado cuando la cita sea confirmada.  
**Identificador de negocio candidato:** combinación Cita + Servicio como candidata conceptual de unicidad; la decisión final corresponde al modelo relacional.

> La ficha oficial incluye el concepto `CitaServicio`, pero no declara explícitamente si una Cita puede contener uno o varios Servicios. Por ello, este documento conserva la asociación sin inventar una multiplicidad máxima no establecida.

### Atencion

**Responsabilidad:** representar la ejecución real asociada a una cita cuando ésta entra en atención y finaliza.  
**Atributos conceptuales mínimos:** inicio real y fin real de la atención cuando correspondan.  
**Identificador de negocio candidato:** no definido por la ficha.

### Pago

**Responsabilidad:** representar el registro operativo de pago asociado al flujo de una cita.  
**Atributos conceptuales mínimos:** importe/monto operativo y momento del registro cuando corresponda.  
**Identificador de negocio candidato:** no definido por la ficha.

> No se incorpora `metodo` como atributo obligatorio porque la ficha no lo exige. Tampoco se modela integración bancaria real, conforme a RN-10.

### Auditoria

**Responsabilidad:** conservar trazabilidad suficiente sobre cambios de agenda y operaciones críticas para explicar qué ocurrió, quién realizó la acción y cuándo.  
**Atributos conceptuales mínimos:** operación/cambio registrado, momento del cambio e identidad del responsable cuando exista identidad operativa disponible.  
**Identificador de negocio candidato:** no definido por la ficha.

---

## 5. Relaciones conceptuales

### Relaciones directamente justificadas por la ficha

- **Cliente — Cita:** un Cliente puede tener varias Citas; cada Cita corresponde a un Cliente dentro del flujo de reserva.
- **Profesional — Cita:** las Citas se asignan a Profesionales y RN-01 controla el solapamiento para un mismo Profesional.
- **Profesional — Servicio:** la habilitación se representa mediante **ProfesionalServicio**; una asignación sólo es válida cuando existe la habilitación correspondiente.
- **Cita — Servicio:** se representa mediante **CitaServicio**, concepto mínimo exigido por la ficha.
- **Cita — Atencion:** la atención representa la ejecución operativa de una cita.
- **Cita — Pago:** el pago operativo se registra asociado al flujo de una cita.

### Relaciones necesarias para disponibilidad y operación

- **Profesional — Horario:** los horarios configurados del profesional intervienen en el cálculo de slots disponibles.
- **Profesional — BloqueoHorario:** los bloqueos aplicables a la agenda de un profesional impiden ofrecer los periodos afectados como disponibles.

### Relaciones de soporte y trazabilidad

- **Usuario — Rol:** Usuario y Rol deben relacionarse para representar responsabilidades/permisos; la multiplicidad exacta no está especificada en la ficha y se definirá en el modelo relacional.
- **Auditoria — Usuario/operación de agenda:** Auditoria debe permitir identificar al responsable y el cambio realizado; la forma física exacta de esta relación se definirá posteriormente.

---

## 6. Cardinalidades v0.1

| Relación | Cardinalidad conceptual | Justificación |
|---|---|---|
| Cliente — Cita | 1:N | RN-09 establece que un cliente puede tener varias citas; la cita pertenece al cliente que la reserva/gestiona. |
| Profesional — Cita | 1:N | RN-01 controla múltiples citas de un mismo profesional y exige impedir solapamientos. |
| Profesional — Servicio, vía ProfesionalServicio | N:M | La entidad asociativa ProfesionalServicio representa habilitaciones entre profesionales y servicios. |
| Profesional — Horario | 1:N | Un profesional requiere uno o más periodos configurables de trabajo para calcular disponibilidad. |
| Profesional — BloqueoHorario | 1:N | Un profesional puede requerir múltiples bloqueos de agenda en distintos periodos. |
| Cita — CitaServicio | Asociación obligatoria; máximo pendiente de especificación | La ficha exige CitaServicio, pero no define expresamente si una cita admite uno o varios servicios. |
| Servicio — CitaServicio | 1:N | Un servicio puede ser utilizado por distintas citas a través de la asociación CitaServicio. |
| Cita — Atencion | 1 : 0..1 como decisión conceptual v0.1 | Una cita puede no llegar a atención; cuando se ejecuta, se representa una única atención operativa para esa cita en este MVP. |
| Cita — Pago | Asociación opcional; máximo pendiente de especificación | El flujo registra pago, pero la ficha no define pagos parciales ni la multiplicidad exacta. No se inventa una cardinalidad máxima. |
| Usuario — Rol | Pendiente de multiplicidad | La ficha exige ambos conceptos pero no indica si un usuario puede tener uno o varios roles. |
| Auditoria — Usuario/operación | Pendiente de estructura física | RF-18 y los criterios globales exigen trazabilidad, pero no fijan el mecanismo relacional. |

---

## 7. Reglas iniciales de integridad

- **RI-01 — Solapamiento de profesional (RN-01):** no puede existir una nueva cita o reprogramación cuyo intervalo sea incompatible con otra cita que ocupe agenda para el mismo Profesional. La definición exacta de qué estados ocupan agenda se documentará junto con la matriz de estados, sin alterar RN-01.

- **RI-02 — Duración de cita (RN-02):** la duración de la Cita debe derivarse del Servicio seleccionado y no establecerse arbitrariamente. Si la implementación final admite más de un servicio por cita, la regla de cálculo deberá definirse explícitamente sin contradecir RN-02.

- **RI-03 — Habilitación profesional-servicio (RN-03):** el Profesional asignado a una Cita debe estar habilitado para el Servicio correspondiente mediante una asociación ProfesionalServicio válida.

- **RI-04 — Cancelación tardía (RN-04):** cuando una cancelación sea clasificada como tardía conforme al criterio configurable que se adopte, dicha condición debe quedar registrada y conservarse en el historial.

- **RI-05 — Estados válidos (RN-05):** el estado de Cita debe pertenecer al conjunto oficial `reservada`, `confirmada`, `en atención`, `finalizada`, `cancelada` o `no asistió`, y sólo deben permitirse transiciones coherentes. La ficha no define la matriz completa de transiciones, por lo que no se inventa una secuencia lineal rígida en este documento.

- **RI-06 — Conservación histórica (RN-06):** las Citas históricas no se eliminan físicamente como mecanismo ordinario de operación.

- **RI-07 — Bloqueos (RN-07):** no puede crearse ni reprogramarse una Cita en un intervalo cubierto por un BloqueoHorario aplicable.

- **RI-08 — Precio congelado (RN-08):** el precio aplicado a la relación cita-servicio debe quedar congelado cuando la Cita sea confirmada y no debe cambiar aunque posteriormente se modifique el precio vigente del Servicio.

- **RI-09 — Solapamiento personal del cliente (RN-09):** un Cliente puede tener varias Citas, pero debe aplicarse el control de solapamiento personal configurable previsto por la regla oficial. La ficha no define el alcance exacto de la configuración, por lo que dicho detalle se parametrizará sin alterar la regla.

- **RI-10 — Pago operativo (RN-10):** Pago representa únicamente un registro operativo del MVP y no debe implicar integración bancaria real.

- **RI-11 — Trazabilidad de agenda (RF-18 y criterios globales):** los cambios de agenda y operaciones críticas definidas como auditables deben conservar información suficiente para identificar qué ocurrió, quién lo hizo y cuándo.

---

## 8. Decisiones de modelado v0.1

- **D-01:** La habilitación de un Profesional para un Servicio se representa exclusivamente mediante **ProfesionalServicio**; no se introduce una propiedad global `habilitado` para reemplazar RN-03.
- **D-02:** No se incorporan `especialidad`, `fechaHabilitacion`, `metodoPago`, códigos de negocio ni restricciones UNIQUE sobre datos de contacto como requisitos oficiales, porque la ficha no los define.
- **D-03:** `precioAplicado` se conserva en la relación **CitaServicio**, ya que RN-08 exige mantener el valor aplicado a la cita aun cuando cambie el precio vigente del Servicio.
- **D-04:** La multiplicidad máxima Cita–CitaServicio no se inventa en v0.1; se resolverá únicamente si el equipo/docente define si una cita admite uno o varios servicios.
- **D-05:** La multiplicidad máxima Cita–Pago no se inventa; el MVP sólo exige registrar pago operativo y no especifica pagos parciales.
- **D-06:** Usuario, Rol y Auditoria permanecen incluidos desde el modelo conceptual porque forman parte del modelo mínimo oficial, aunque sus decisiones de autenticación, autorización y estructura física correspondan a etapas posteriores.
- **D-07:** La matriz exacta de transiciones de Cita no se inventa a partir de RN-05. Este documento fija el conjunto de estados oficiales y exige transiciones coherentes; la matriz se documentará antes de implementar la regla.

---

## 9. Trazabilidad inicial

| Concepto / relación | RN / RF asociado |
|---|---|
| Profesional | RF-01, RF-15 |
| Servicio | RN-02, RN-08, RF-02 |
| ProfesionalServicio | RN-03, RF-03 |
| Horario | RF-04, RF-06 |
| BloqueoHorario | RN-07, RF-05, RF-06 |
| Cliente | RN-09, RF-07, RF-16 |
| Cita | RN-01, RN-02, RN-04, RN-05, RN-06, RN-07, RN-08, RN-09; RF-08 a RF-13 |
| CitaServicio | RN-02, RN-08; concepto mínimo de F |
| Atencion | RF-12; estados de RN-05 |
| Pago | RN-10, RF-14, RF-17 |
| Usuario / Rol | Secciones C y F; soporte a RF-18 y autorización posterior |
| Auditoria | RF-18 y criterios globales de trazabilidad |
| Profesional — Cita | RN-01, RN-03 |
| Cliente — Cita | RN-09 |
| Profesional — Servicio | RN-03 |
| Profesional — Horario/Bloqueo | RN-07, RF-04, RF-05, RF-06 |
| Cita — Servicio | RN-02, RN-08 |

---

## 10. Comprobación contra el flujo crítico oficial

| Paso del flujo | Conceptos que lo soportan | Reglas / requisitos principales |
|---|---|---|
| Administrador configura servicio/profesional/horario | Profesional, Servicio, ProfesionalServicio, Horario | RF-01, RF-02, RF-03, RF-04, RN-03 |
| Cliente consulta disponibilidad | Cliente, Profesional, Servicio, Horario, BloqueoHorario, Cita | RF-06, RN-01, RN-02, RN-03, RN-07 |
| Cliente reserva | Cliente, Cita, CitaServicio, Profesional | RF-08, RN-01, RN-02, RN-03, RN-05, RN-07, RN-09 |
| Recepcionista confirma | Cita, CitaServicio | RF-11, RN-05, RN-08 |
| Profesional inicia/finaliza atención | Cita, Atencion, Profesional | RF-12, RN-05 |
| Se registra pago | Cita, Pago | RF-14, RN-10 |
| Dashboard refleja ocupación | Cita, Atencion, Pago | RF-17 |

El modelo conceptual permite recorrer el flujo crítico completo sin introducir entidades ajenas al dominio oficial.

---

## 11. Criterio de cierre del modelo conceptual v0.1

El modelo conceptual v0.1 queda cerrado para esta etapa porque:

- Incluye todos los conceptos mínimos exigidos por la ficha oficial.
- Distingue actores, entidades, atributos y resultados derivados.
- Las relaciones principales pueden justificarse mediante RN, RF o el flujo crítico.
- Las diez reglas de negocio tienen una regla inicial de integridad correspondiente.
- RF-18 y la trazabilidad global están representados mediante Auditoria.
- No se presentan como requisitos oficiales atributos, identificadores, cardinalidades o restricciones que la ficha no define.
- Las ambigüedades contractuales permanecen explícitas para ser resueltas en el modelo relacional/físico sin reescribir el dominio conceptual.

## 12. Paso siguiente: Clase 03

A partir de este documento se podrá construir `model-relational-v0.1.md` para:

- proponer PK y FK;
- decidir optionalidad y nulabilidad futura;
- resolver físicamente relaciones N:M;
- decidir claves naturales candidatas a UNIQUE sólo cuando exista justificación;
- concretar las multiplicidades que la ficha deja abiertas;
- revisar normalización inicial;
- mantener trazabilidad con las RN/RF aquí documentadas.
