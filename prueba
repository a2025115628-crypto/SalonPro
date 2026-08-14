# Backlog v0.1 — SalonPro

## 1. Propósito

Este documento presenta el backlog inicial del proyecto **SalonPro**, organizado a partir de la situación del cliente, los actores, el alcance funcional, las reglas de negocio y los requisitos funcionales definidos para el MVP.

El backlog se estructura mediante historias de usuario priorizadas en niveles **P0, P1 y P2**:

- **P0 — Crítico:** funcionalidades indispensables para que el flujo principal del sistema pueda operar.
- **P1 — Importante:** funcionalidades necesarias para completar la operación del MVP.
- **P2 — Complementario:** funcionalidades de consulta, supervisión y control que agregan valor al sistema.

> **Nota de alcance:** se excluye cualquier funcionalidad relacionada con pasarelas bancarias, integración con bancos, cobros en línea o procesamiento externo de pagos. El proyecto únicamente contempla un **registro operativo simplificado de pagos** asociado a las citas.

---

## 2. Actores del sistema

### Administrador
Configura servicios, profesionales, horarios y parámetros generales del sistema.

### Recepcionista
Agenda, reprograma, cancela citas y registra información operativa relacionada con la atención.

### Profesional
Consulta su agenda y actualiza el estado de las atenciones asignadas.

### Cliente
Consulta disponibilidad, reserva citas y gestiona sus propias citas según las reglas establecidas.

### Supervisor
Consulta indicadores operativos, ocupación y excepciones del sistema.

---

# 3. Backlog priorizado

## P0 — Prioridad crítica

### HU-01 — Gestionar profesionales

**Como** administrador,  
**quiero** registrar y gestionar profesionales,  
**para** mantener actualizada la información del personal que presta servicios en el salón.

**Requisito relacionado:** RF-01 — Gestionar profesionales.

**Criterios iniciales de aceptación:**
- Debe permitirse registrar un profesional.
- Debe permitirse actualizar su información.
- El sistema debe poder identificar si el profesional está habilitado o no.
- La información registrada debe quedar disponible para su posterior asociación con servicios y horarios.

---

### HU-02 — Gestionar servicios y duración

**Como** administrador,  
**quiero** registrar y gestionar servicios indicando su duración,  
**para** establecer correctamente el tiempo requerido para cada cita.

**Requisito relacionado:** RF-02 — Gestionar servicios y duración.

**Regla relacionada:** RN-02 — La duración de una cita depende del servicio seleccionado.

**Criterios iniciales de aceptación:**
- Debe permitirse registrar un servicio.
- Todo servicio debe disponer de una duración definida.
- Debe permitirse modificar la información del servicio.
- La duración configurada debe ser utilizada al calcular la disponibilidad.

---

### HU-03 — Asociar profesionales a servicios

**Como** administrador,  
**quiero** asociar profesionales con los servicios que pueden realizar,  
**para** evitar que se asignen citas a profesionales no habilitados para un servicio.

**Requisito relacionado:** RF-03 — Asociar profesionales a servicios.

**Regla relacionada:** RN-03 — Sólo profesionales habilitados para un servicio pueden ser asignados.

**Criterios iniciales de aceptación:**
- Debe poder asociarse uno o varios servicios a un profesional.
- No debe permitirse asignar una cita a un profesional no habilitado para el servicio seleccionado.
- Las asociaciones deben poder consultarse.

---

### HU-04 — Configurar horarios

**Como** administrador,  
**quiero** configurar los horarios de los profesionales,  
**para** definir cuándo se encuentran disponibles para recibir citas.

**Requisito relacionado:** RF-04 — Configurar horarios.

**Criterios iniciales de aceptación:**
- Debe poder definirse un horario para cada profesional.
- Los horarios configurados deben influir en el cálculo de disponibilidad.
- El sistema no debe ofrecer horarios fuera de la jornada configurada.

---

### HU-05 — Registrar bloqueos de agenda

**Como** administrador,  
**quiero** bloquear determinados horarios de un profesional,  
**para** impedir que se generen reservas durante periodos no disponibles.

**Requisito relacionado:** RF-05 — Registrar bloqueos de agenda.

**Regla relacionada:** RN-07 — Los horarios bloqueados no están disponibles para reserva.

**Criterios iniciales de aceptación:**
- Debe poder registrarse un bloqueo de horario.
- Un horario bloqueado no debe aparecer como disponible.
- El bloqueo debe quedar asociado al profesional correspondiente.

---

### HU-06 — Consultar disponibilidad

**Como** cliente,  
**quiero** consultar los horarios disponibles para un servicio,  
**para** seleccionar una fecha y hora en la que pueda ser atendido.

**Requisito relacionado:** RF-06 — Consultar slots disponibles.

**Reglas relacionadas:** RN-01, RN-02, RN-03 y RN-07.

**Criterios iniciales de aceptación:**
- El sistema debe mostrar únicamente horarios realmente disponibles.
- No debe mostrar horarios bloqueados.
- Debe considerar la duración del servicio.
- Debe considerar la disponibilidad del profesional.
- Debe evitar horarios que generen solapamientos.

---

### HU-07 — Registrar clientes

**Como** recepcionista,  
**quiero** registrar clientes,  
**para** disponer de su información al momento de crear y gestionar citas.

**Requisito relacionado:** RF-07 — Registrar clientes.

**Criterios iniciales de aceptación:**
- Debe poder registrarse un nuevo cliente.
- La información del cliente debe poder consultarse posteriormente.
- El cliente registrado debe poder asociarse a una o varias citas.

---

### HU-08 — Crear una cita

**Como** cliente,  
**quiero** reservar una cita para un servicio en un horario disponible,  
**para** asegurar mi atención con un profesional habilitado.

**Requisito relacionado:** RF-08 — Crear cita.

**Reglas relacionadas:** RN-01, RN-02, RN-03, RN-05, RN-07, RN-08 y RN-09.

**Criterios iniciales de aceptación:**
- No debe existir solapamiento para el mismo profesional.
- La duración debe corresponder al servicio seleccionado.
- El profesional debe estar habilitado para realizar el servicio.
- No debe permitirse reservar un horario bloqueado.
- La cita debe crearse con un estado válido.
- La información de la cita debe conservarse en el sistema.

---

### HU-09 — Reprogramar una cita

**Como** recepcionista,  
**quiero** reprogramar una cita,  
**para** cambiar su fecha u horario cuando sea necesario sin perder su trazabilidad.

**Requisito relacionado:** RF-09 — Reprogramar cita.

**Criterios iniciales de aceptación:**
- La nueva fecha y hora deben estar disponibles.
- La reprogramación no debe generar solapamientos.
- Debe conservarse la trazabilidad del cambio.
- No debe eliminarse la cita histórica.

---

### HU-10 — Cancelar una cita con motivo

**Como** recepcionista,  
**quiero** cancelar una cita indicando el motivo,  
**para** mantener actualizada la agenda y conservar evidencia de la cancelación.

**Requisito relacionado:** RF-10 — Cancelar cita con motivo.

**Reglas relacionadas:** RN-04, RN-05 y RN-06.

**Criterios iniciales de aceptación:**
- Debe registrarse un motivo de cancelación.
- La cita debe cambiar a un estado válido de cancelación.
- Las cancelaciones tardías deben quedar registradas.
- La cita cancelada no debe eliminarse del historial.

---

## P1 — Prioridad importante

### HU-11 — Confirmar asistencia

**Como** recepcionista,  
**quiero** confirmar la asistencia de un cliente,  
**para** registrar que la cita continúa hacia el proceso de atención.

**Requisito relacionado:** RF-11 — Confirmar asistencia.

**Regla relacionada:** RN-05 — La cita debe recorrer estados válidos.

**Criterios iniciales de aceptación:**
- La cita debe existir.
- El cambio de estado debe respetar las transiciones permitidas.
- La confirmación debe quedar registrada.

---

### HU-12 — Iniciar y finalizar atención

**Como** profesional,  
**quiero** iniciar y finalizar la atención de una cita,  
**para** reflejar correctamente el progreso del servicio realizado.

**Requisito relacionado:** RF-12 — Iniciar y finalizar atención.

**Regla relacionada:** RN-05.

**Criterios iniciales de aceptación:**
- Sólo una cita válida puede iniciar atención.
- El estado debe cambiar a "en atención" al comenzar.
- El estado debe cambiar a "finalizada" al terminar.
- Las transiciones deben respetar el flujo definido.

---

### HU-13 — Registrar no asistencia

**Como** profesional,  
**quiero** registrar cuando un cliente no asiste a una cita,  
**para** mantener actualizado el historial de atención.

**Requisito relacionado:** RF-13 — Registrar no asistencia.

**Reglas relacionadas:** RN-05 y RN-06.

**Criterios iniciales de aceptación:**
- La cita debe poder marcarse como "no asistió".
- El cambio debe quedar registrado.
- La cita debe conservarse en el historial.

---

### HU-14 — Registrar pago simplificado

**Como** recepcionista,  
**quiero** registrar operativamente el pago asociado a una cita,  
**para** mantener un control interno de los ingresos del salón.

**Requisito relacionado:** RF-14 — Registrar pago simplificado.

**Criterios iniciales de aceptación:**
- El pago debe estar asociado a una cita.
- Debe poder registrarse el importe correspondiente.
- El registro debe ser únicamente operativo dentro del sistema.
- No se contempla integración con bancos, pasarelas de pago ni procesamiento de cobros externos.

---

### HU-15 — Consultar agenda diaria o semanal

**Como** profesional,  
**quiero** consultar mi agenda diaria o semanal,  
**para** conocer las citas que debo atender.

**Requisito relacionado:** RF-15 — Consultar agenda diaria/semanal.

**Criterios iniciales de aceptación:**
- Deben mostrarse las citas correspondientes al profesional.
- La agenda debe poder consultarse por día o semana.
- Debe visualizarse el estado actual de cada cita.

---

### HU-16 — Consultar historial del cliente

**Como** recepcionista,  
**quiero** consultar el historial de un cliente,  
**para** revisar sus citas y atenciones anteriores.

**Requisito relacionado:** RF-16 — Consultar historial del cliente.

**Criterios iniciales de aceptación:**
- Deben mostrarse las citas históricas del cliente.
- Debe visualizarse el estado de cada cita.
- Las citas históricas no deben eliminarse.

---

## P2 — Prioridad complementaria

### HU-17 — Consultar ocupación e ingresos operativos

**Como** supervisor,  
**quiero** consultar indicadores de ocupación e ingresos operativos,  
**para** evaluar el funcionamiento general del salón.

**Requisito relacionado:** RF-17 — Mostrar ocupación e ingresos operativos.

**Criterios iniciales de aceptación:**
- El sistema debe mostrar información de ocupación.
- Debe reflejar información operativa derivada de las citas y registros internos.
- Los indicadores deben utilizar datos reales del sistema.

---

### HU-18 — Auditar cambios de agenda

**Como** supervisor,  
**quiero** consultar los cambios realizados sobre la agenda,  
**para** conocer qué modificaciones se realizaron, quién las realizó y cuándo.

**Requisito relacionado:** RF-18 — Auditar cambios de agenda.

**Criterios iniciales de aceptación:**
- Deben registrarse los cambios relevantes realizados sobre la agenda.
- Debe existir trazabilidad de las operaciones críticas.
- El sistema debe permitir identificar quién realizó el cambio y cuándo.

---

# 4. Reglas de negocio consideradas

- **RN-01:** No puede existir solapamiento de citas para un mismo profesional.
- **RN-02:** La duración de una cita depende del servicio seleccionado.
- **RN-03:** Sólo profesionales habilitados para un servicio pueden ser asignados.
- **RN-04:** Las cancelaciones tardías quedan registradas.
- **RN-05:** Una cita confirmada debe recorrer estados válidos: reservada, confirmada, en atención, finalizada, cancelada o no asistió.
- **RN-06:** No se eliminan citas históricas.
- **RN-07:** Los horarios bloqueados no están disponibles para reserva.
- **RN-08:** El valor operativo asociado a la cita queda definido al confirmarse.
- **RN-09:** Un cliente puede tener varias citas, controlando el solapamiento personal configurable.
- **RN-10:** El manejo de pagos se limita a un registro operativo interno del MVP.

---

# 5. Flujo crítico asociado al backlog

1. El administrador configura servicios.
2. El administrador registra profesionales.
3. El administrador asocia profesionales con servicios.
4. El administrador configura horarios y bloqueos.
5. El cliente consulta disponibilidad.
6. El cliente crea una cita.
7. La recepcionista confirma la cita.
8. El profesional inicia la atención.
9. El profesional finaliza la atención.
10. Se registra internamente el pago simplificado.
11. El supervisor consulta los indicadores de ocupación.

---

# 6. Criterio de terminación del backlog v0.1

El backlog inicial se considera preparado para la Clase 01 cuando:

- Las historias están redactadas desde la perspectiva de un actor.
- Cada historia expresa una necesidad y un valor.
- Las historias se encuentran priorizadas como P0, P1 o P2.
- No se incluyen tareas puramente técnicas como historias de usuario.
- Existe correspondencia con los requisitos funcionales oficiales.
- Se respetan las reglas de negocio establecidas.
- No se incorporan requisitos ajenos a la ficha oficial.
- No se incluyen funcionalidades de pasarelas bancarias, integración bancaria ni cobros externos.
