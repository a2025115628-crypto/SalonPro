# Backlog inicial v0.1 — SalonPro

Formato: **Como** [actor], **quiero** [necesidad] **para** [valor]. Prioridad P0 (crítico para el flujo de extremo a extremo), P1 (necesario para el MVP completo) o P2 (mejora deseable dentro del alcance).

Cada historia referencia el/los requisito(s) funcional(es) oficiales (RF) y regla(s) de negocio (RN) de la ficha con los que se relaciona, para mantener trazabilidad desde esta etapa temprana.

| # | Prioridad | Historia | RF / RN relacionados |
|---|---|---|---|
| 1 | P0 | Como Administrador, quiero registrar servicios con su duración estándar, para que el sistema calcule automáticamente cuánto ocupa cada cita en la agenda. | RF-02, RN-02 |
| 2 | P0 | Como Administrador, quiero registrar profesionales y asociarlos a los servicios que están habilitados a realizar, para evitar que se asigne un profesional no capacitado a un servicio. | RF-01, RF-03, RN-03 |
| 3 | P0 | Como Administrador, quiero configurar el horario regular de cada profesional, para que el sistema sepa cuándo está disponible para recibir citas. | RF-04 |
| 4 | P1 | Como Administrador, quiero registrar bloqueos de agenda de un profesional (vacaciones, permisos), para que esos periodos nunca se ofrezcan como disponibles. | RF-05, RN-07 |
| 5 | P0 | Como Cliente, quiero consultar los slots de disponibilidad reales de un servicio y sus profesionales habilitados, para elegir un horario que efectivamente pueda reservarse. | RF-06 |
| 6 | P1 | Como Recepcionista, quiero registrar clientes nuevos al momento de agendar, para no depender de que el cliente se autogestione en el sistema. | RF-07 |
| 7 | P0 | Como Cliente, quiero crear una cita para un servicio y profesional disponibles, para asegurar mi turno sin riesgo de que se solape con otra cita del mismo profesional. | RF-08, RN-01, RN-02 |
| 8 | P1 | Como Cliente, quiero reprogramar una cita existente, para cambiar el horario sin perder el historial de la reserva original. | RF-09 |
| 9 | P1 | Como Cliente, quiero cancelar una cita indicando un motivo, para que quede registrado por qué no se concretará la atención. | RF-10, RN-04 |
| 10 | P0 | Como Recepcionista, quiero confirmar la asistencia de una cita reservada, para que el precio de los servicios quede congelado y la cita avance a un estado válido de la agenda. | RF-11, RN-05, RN-08 |
| 11 | P0 | Como Profesional, quiero iniciar y finalizar la atención de una cita confirmada, para reflejar en tiempo real el estado real del servicio que estoy prestando. | RF-12, RN-05 |
| 12 | P1 | Como Recepcionista, quiero registrar que un cliente no asistió a su cita, para diferenciar ese caso de una cancelación y conservar el historial correspondiente. | RF-13, RN-05, RN-06 |
| 13 | P0 | Como Recepcionista, quiero registrar el pago de una cita finalizada, para dejar constancia operativa del cobro sin depender de una pasarela bancaria real. | RF-14, RN-10 |
| 14 | P1 | Como Recepcionista, quiero consultar la agenda diaria y semanal del salón, para coordinar la operación del día sin depender de una agenda física. | RF-15 |
| 15 | P2 | Como Profesional, quiero consultar el historial de citas de un cliente, para conocer el contexto antes de atenderlo. | RF-16 |
| 16 | P1 | Como Supervisor, quiero visualizar la ocupación y los ingresos operativos del salón, para tomar decisiones sin pedir reportes manuales. | RF-17 |
| 17 | P2 | Como Administrador, quiero que los cambios relevantes sobre la agenda queden auditados (quién, qué, cuándo), para poder resolver disputas o errores operativos. | RF-18 |
| 18 | P2 | Como Cliente, quiero que el sistema controle el solapamiento de mis propias citas según la configuración del salón, para evitar reservar dos citas simultáneas si el administrador así lo definió. | RN-09 |

## Notas de priorización

- Las historias P0 son las mínimas necesarias para demostrar el **flujo crítico extremo a extremo** exigido en la ficha (sección J): configurar → consultar disponibilidad → reservar → confirmar → atender → pagar → ver ocupación en dashboard.
- Las historias P1 completan el resto de los módulos obligatorios (Clientes, reprogramación, cancelación, no asistencia, agenda operativa, indicadores).
- Las historias P2 son necesarias para el alcance final del MVP (auditoría, historial, control de solapamiento del cliente) pero no bloquean la primera demostración funcional.
- Esta priorización es una propuesta de equipo basada en la ficha oficial; no reduce ni contradice ningún RF/RN — todos los RF-01 a RF-18 y RN-01 a RN-10 quedan cubiertos por al menos una historia.
