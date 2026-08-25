# Backlog v0.1 — SalonPro

## 1. Propósito

Este documento presenta el backlog inicial de **SalonPro**, construido a partir de la ficha oficial del proyecto y limitado al alcance contractual del MVP.

La priorización indica **orden de implementación**, no obligatoriedad contractual:

- **P0 — Flujo crítico:** necesario para demostrar el flujo principal extremo a extremo.
- **P1 — Operación principal:** obligatorio para completar la operación del MVP, aunque no sea requisito previo para la primera demostración del flujo crítico.
- **P2 — Cobertura posterior:** obligatorio dentro del alcance final, pero puede implementarse después del flujo principal.

> **Alcance de pagos:** el MVP contempla únicamente **registro operativo de pago**. No incluye integración bancaria real, pasarela de pago ni procesamiento externo de cobros, conforme a RN-10.

---

## 2. Actores del sistema

### Administrador
Configura servicios, profesionales, horarios y parámetros.

### Recepcionista
Agenda, reprograma y cancela citas.

### Profesional
Consulta su agenda y actualiza la atención.

### Cliente
Reserva, consulta y cancela según las reglas del MVP.

### Supervisor
Consulta KPIs y excepciones.

---

# 3. Backlog priorizado

## P0 — Flujo crítico

### HU-01 — Gestionar profesionales

**Como** administrador,  
**quiero** gestionar profesionales,  
**para** mantener disponible la información necesaria para configurar su participación en la operación del salón.

**Requisito relacionado:** RF-01 — Gestionar profesionales.

**Criterios iniciales de aceptación:**
- Debe permitirse registrar profesionales.
- Debe permitirse consultar y actualizar la información gestionada de un profesional.
- La información del profesional debe poder utilizarse posteriormente al configurar horarios y asociaciones con servicios.
- La habilitación para prestar un servicio no se determina de manera global en esta historia; se controla mediante la asociación Profesional–Servicio definida en RF-03 y RN-03.

---

### HU-02 — Gestionar servicios y duración

**Como** administrador,  
**quiero** gestionar servicios y su duración,  
**para** que la agenda pueda calcular correctamente el tiempo requerido por una cita.

**Requisito relacionado:** RF-02 — Gestionar servicios y duración.  
**Regla relacionada:** RN-02 — La duración de una cita depende del servicio seleccionado.

**Criterios iniciales de aceptación:**
- Debe permitirse registrar servicios.
- Todo servicio utilizado para reservar debe tener una duración definida.
- Debe permitirse consultar y actualizar la información del servicio.
- La duración configurada debe utilizarse al calcular disponibilidad y validar citas.

---

### HU-03 — Asociar profesionales a servicios

**Como** administrador,  
**quiero** asociar profesionales con los servicios para los que están habilitados,  
**para** evitar asignaciones incompatibles.

**Requisito relacionado:** RF-03 — Asociar profesionales a servicios.  
**Regla relacionada:** RN-03 — Sólo profesionales habilitados para un servicio pueden ser asignados.

**Criterios iniciales de aceptación:**
- Debe poder registrarse la asociación entre un profesional y un servicio.
- Las asociaciones registradas deben poder consultarse.
- No debe permitirse asignar a una cita un profesional que no esté habilitado para el servicio correspondiente.

---

### HU-04 — Configurar horarios

**Como** administrador,  
**quiero** configurar horarios,  
**para** definir los periodos en los que puede existir disponibilidad para reservar.

**Requisito relacionado:** RF-04 — Configurar horarios.

**Criterios iniciales de aceptación:**
- Deben poder registrarse horarios de trabajo aplicables a los profesionales.
- Los horarios configurados deben participar en el cálculo de disponibilidad.
- No deben ofrecerse slots fuera de los horarios configurados.

---

### HU-05 — Registrar bloqueos de agenda

**Como** administrador,  
**quiero** registrar bloqueos de agenda,  
**para** impedir reservas en periodos temporalmente no disponibles.

**Requisito relacionado:** RF-05 — Registrar bloqueos de agenda.  
**Regla relacionada:** RN-07 — Los horarios bloqueados no están disponibles para reserva.

**Criterios iniciales de aceptación:**
- Debe poder registrarse un bloqueo aplicable a la agenda correspondiente.
- Un periodo bloqueado no debe aparecer como disponible para reserva.
- El bloqueo debe conservar la información necesaria para determinar el periodo afectado.

---

### HU-06 — Consultar slots disponibles

**Como** cliente,  
**quiero** consultar slots disponibles para un servicio,  
**para** elegir una opción válida antes de reservar.

**Requisito relacionado:** RF-06 — Consultar slots disponibles.  
**Reglas relacionadas:** RN-01, RN-02, RN-03 y RN-07.

**Criterios iniciales de aceptación:**
- Deben mostrarse únicamente slots compatibles con los horarios configurados.
- No deben mostrarse periodos bloqueados.
- El cálculo debe considerar la duración del servicio seleccionado.
- Sólo deben considerarse profesionales habilitados para el servicio.
- No deben ofrecerse slots que produzcan solapamiento con citas existentes del mismo profesional.

---

### HU-07 — Registrar clientes

**Como** recepcionista,  
**quiero** registrar clientes,  
**para** asociarlos a sus citas y mantener su historial operativo.

**Requisito relacionado:** RF-07 — Registrar clientes.

**Criterios iniciales de aceptación:**
- Debe poder registrarse un cliente.
- La información registrada debe poder consultarse posteriormente.
- Un cliente debe poder relacionarse con varias citas, conforme a RN-09.

---

### HU-08 — Crear cita

**Como** cliente,  
**quiero** crear una cita utilizando disponibilidad válida,  
**para** reservar atención con un profesional habilitado.

**Requisito relacionado:** RF-08 — Crear cita.  
**Reglas relacionadas:** RN-01, RN-02, RN-03, RN-05, RN-07 y RN-09.

**Criterios iniciales de aceptación:**
- No debe existir solapamiento de citas para el mismo profesional.
- La duración de la cita debe responder al servicio seleccionado.
- El profesional asignado debe estar habilitado para el servicio correspondiente.
- No debe permitirse reservar un periodo bloqueado.
- La cita debe crearse en un estado permitido por el dominio.
- Debe aplicarse el control configurable de solapamiento personal del cliente definido por RN-09.
- La cita creada debe conservarse como parte del historial y no eliminarse físicamente por cambios posteriores.

---

### HU-09 — Reprogramar cita

**Como** recepcionista,  
**quiero** reprogramar una cita,  
**para** modificar su fecha u horario sin perder trazabilidad ni violar las reglas de disponibilidad.

**Requisito relacionado:** RF-09 — Reprogramar cita.  
**Reglas relacionadas:** RN-01, RN-02, RN-03, RN-05, RN-06, RN-07 y RN-09.

**Criterios iniciales de aceptación:**
- La nueva fecha y hora deben corresponder a disponibilidad válida.
- La reprogramación no debe generar solapamiento para el profesional.
- Debe respetarse la duración derivada del servicio seleccionado.
- El profesional asignado debe continuar habilitado para el servicio correspondiente.
- No debe reprogramarse sobre un periodo bloqueado.
- Debe aplicarse el control configurable de solapamiento personal del cliente.
- El cambio debe conservar trazabilidad y no debe eliminar el histórico de la cita.

---

### HU-10 — Cancelar cita con motivo

**Como** recepcionista,  
**quiero** cancelar una cita indicando un motivo,  
**para** actualizar la agenda y conservar evidencia de la cancelación.

**Requisito relacionado:** RF-10 — Cancelar cita con motivo.  
**Reglas relacionadas:** RN-04, RN-05 y RN-06.

**Criterios iniciales de aceptación:**
- Debe registrarse el motivo de cancelación.
- La cita debe pasar a un estado de cancelación permitido.
- Si la cancelación es clasificada como tardía según la configuración o criterio que se defina para el MVP, esa condición debe quedar registrada.
- La cita cancelada debe conservarse en el historial.

---

### HU-11 — Confirmar asistencia

**Como** recepcionista,  
**quiero** confirmar la asistencia correspondiente a una cita,  
**para** continuar el flujo operativo hacia la atención y fijar el precio aplicado.

**Requisito relacionado:** RF-11 — Confirmar asistencia.  
**Reglas relacionadas:** RN-05 y RN-08.

**Criterios iniciales de aceptación:**
- La cita debe existir y encontrarse en una situación desde la que la confirmación sea válida.
- El cambio de estado debe respetar las transiciones permitidas.
- Al confirmar la cita, el **precio aplicado debe quedar congelado** conforme a RN-08.
- Un cambio posterior en el precio configurado del servicio no debe modificar el precio ya aplicado a la cita confirmada.
- La confirmación debe quedar registrada.

---

### HU-12 — Iniciar y finalizar atención

**Como** profesional,  
**quiero** iniciar y finalizar la atención de una cita,  
**para** reflejar su ejecución real.

**Requisito relacionado:** RF-12 — Iniciar y finalizar atención.  
**Regla relacionada:** RN-05.

**Criterios iniciales de aceptación:**
- Sólo una cita en un estado compatible puede iniciar atención.
- Al iniciar, la cita debe pasar a **en atención**.
- Al finalizar correctamente, la cita debe pasar a **finalizada**.
- Todo cambio debe respetar las transiciones de estado permitidas.

---

### HU-14 — Registrar pago simplificado

**Como** recepcionista,  
**quiero** registrar operativamente el pago asociado a una cita,  
**para** mantener control interno de los ingresos operativos.

**Requisito relacionado:** RF-14 — Registrar pago simplificado.  
**Regla relacionada:** RN-10 — El pago del MVP es registro operativo, no integración bancaria real.

**Criterios iniciales de aceptación:**
- El registro de pago debe quedar relacionado con la cita correspondiente.
- Debe registrarse el importe operativo correspondiente.
- El registro debe permanecer dentro del sistema como evidencia operativa.
- No debe existir integración bancaria real, pasarela de pago ni procesamiento externo de cobros.

---

### HU-17 — Consultar ocupación e ingresos operativos

**Como** supervisor,  
**quiero** consultar ocupación e ingresos operativos,  
**para** conocer el estado general de la operación del salón.

**Requisito relacionado:** RF-17 — Mostrar ocupación e ingresos operativos.

**Criterios iniciales de aceptación:**
- Debe mostrarse información de ocupación derivada de datos reales del sistema.
- Debe mostrarse información de ingresos operativos derivada de los registros de pago del MVP.
- El dashboard debe reflejar el resultado del flujo crítico con datos persistidos.

---

## P1 — Operación principal

### HU-13 — Registrar no asistencia

**Como** profesional,  
**quiero** registrar la no asistencia de un cliente,  
**para** mantener correcto el estado y el historial de la cita.

**Requisito relacionado:** RF-13 — Registrar no asistencia.  
**Reglas relacionadas:** RN-05 y RN-06.

**Criterios iniciales de aceptación:**
- Una cita debe poder pasar al estado **no asistió** cuando corresponda.
- La transición debe ser válida según las reglas de estado.
- El cambio debe quedar registrado.
- La cita debe conservarse en el historial.

---

### HU-15 — Consultar agenda diaria/semanal

**Como** profesional,  
**quiero** consultar mi agenda diaria o semanal,  
**para** conocer las citas que debo atender.

**Requisito relacionado:** RF-15 — Consultar agenda diaria/semanal.

**Criterios iniciales de aceptación:**
- Deben mostrarse las citas correspondientes al profesional consultado.
- Debe poder consultarse la agenda por día o por semana.
- Debe mostrarse el estado vigente de cada cita.

---

### HU-16 — Consultar historial del cliente

**Como** recepcionista,  
**quiero** consultar el historial de un cliente,  
**para** revisar sus citas anteriores sin perder información histórica.

**Requisito relacionado:** RF-16 — Consultar historial del cliente.  
**Regla relacionada:** RN-06 — No se eliminan citas históricas.

**Criterios iniciales de aceptación:**
- Deben mostrarse las citas históricas asociadas al cliente.
- Debe mostrarse el estado registrado de cada cita.
- Las citas históricas deben permanecer disponibles conforme a RN-06.

---

## P2 — Cobertura posterior obligatoria

### HU-18 — Auditar cambios de agenda

**Como** supervisor,  
**quiero** consultar la trazabilidad de cambios de agenda,  
**para** identificar qué ocurrió, quién realizó la operación y cuándo.

**Requisito relacionado:** RF-18 — Auditar cambios de agenda.

**Criterios iniciales de aceptación:**
- Los cambios de agenda definidos como auditables deben quedar registrados.
- Debe conservarse información suficiente para identificar la operación realizada.
- Debe poder identificarse quién realizó el cambio y cuándo.
- La auditoría debe apoyar la trazabilidad de las operaciones críticas del proyecto.

---

# 4. Reglas de negocio oficiales consideradas

- **RN-01.** No puede existir solapamiento de citas para un mismo profesional.
- **RN-02.** La duración de una cita depende del servicio seleccionado.
- **RN-03.** Sólo profesionales habilitados para un servicio pueden ser asignados.
- **RN-04.** Las cancelaciones tardías quedan registradas.
- **RN-05.** Una cita confirmada debe recorrer estados válidos: reservada, confirmada, en atención, finalizada/cancelada/no asistió.
- **RN-06.** No se eliminan citas históricas.
- **RN-07.** Los horarios bloqueados no están disponibles para reserva.
- **RN-08.** El precio aplicado queda congelado al confirmar la cita.
- **RN-09.** Un cliente puede tener varias citas, pero se controla solapamiento personal configurable.
- **RN-10.** El pago del MVP es registro operativo, no integración bancaria real.

---

# 5. Trazabilidad RF → Historia

| Requisito | Historia |
|---|---|
| RF-01 Gestionar profesionales | HU-01 |
| RF-02 Gestionar servicios y duración | HU-02 |
| RF-03 Asociar profesionales a servicios | HU-03 |
| RF-04 Configurar horarios | HU-04 |
| RF-05 Registrar bloqueos de agenda | HU-05 |
| RF-06 Consultar slots disponibles | HU-06 |
| RF-07 Registrar clientes | HU-07 |
| RF-08 Crear cita | HU-08 |
| RF-09 Reprogramar cita | HU-09 |
| RF-10 Cancelar cita con motivo | HU-10 |
| RF-11 Confirmar asistencia | HU-11 |
| RF-12 Iniciar y finalizar atención | HU-12 |
| RF-13 Registrar no asistencia | HU-13 |
| RF-14 Registrar pago simplificado | HU-14 |
| RF-15 Consultar agenda diaria/semanal | HU-15 |
| RF-16 Consultar historial del cliente | HU-16 |
| RF-17 Mostrar ocupación e ingresos operativos | HU-17 |
| RF-18 Auditar cambios de agenda | HU-18 |

---

# 6. Trazabilidad RN → Historias principales

| Regla | Historias donde se valida o aplica principalmente |
|---|---|
| RN-01 | HU-06, HU-08, HU-09 |
| RN-02 | HU-02, HU-06, HU-08, HU-09 |
| RN-03 | HU-03, HU-06, HU-08, HU-09 |
| RN-04 | HU-10 |
| RN-05 | HU-08, HU-09, HU-10, HU-11, HU-12, HU-13 |
| RN-06 | HU-09, HU-10, HU-13, HU-16 |
| RN-07 | HU-05, HU-06, HU-08, HU-09 |
| RN-08 | HU-11 |
| RN-09 | HU-07, HU-08, HU-09 |
| RN-10 | HU-14 |

---

# 7. Flujo crítico oficial asociado al backlog

1. El administrador configura servicio, profesional y horario.
2. El cliente consulta disponibilidad.
3. El cliente reserva una cita.
4. La recepcionista confirma.
5. El profesional inicia la atención.
6. El profesional finaliza la atención.
7. Se registra el pago operativo.
8. El dashboard refleja ocupación.

Este flujo está cubierto principalmente por HU-01, HU-02, HU-03, HU-04, HU-06, HU-08, HU-11, HU-12, HU-14 y HU-17.

---

# 8. Criterio de cierre del backlog v0.1

El backlog v0.1 queda cerrado para esta etapa cuando:

- Los 18 requisitos funcionales oficiales tienen una historia correspondiente.
- Las 10 reglas de negocio oficiales están representadas sin alterar su significado.
- Las historias se expresan desde un actor, una necesidad y un valor.
- Las prioridades representan orden de implementación y no eliminan requisitos obligatorios del MVP.
- No se han añadido integraciones bancarias ni funcionalidades externas no previstas.
- Los criterios de aceptación no introducen reglas incompatibles con la ficha oficial.
- El flujo crítico completo puede recorrerse utilizando las historias definidas.
