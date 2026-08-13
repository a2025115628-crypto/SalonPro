# Visión v0.1 — SalonPro

## Contexto

Un salón de belleza y spa atiende clientes a través de varios profesionales que ofrecen distintos servicios (cortes, tratamientos, manicura, masajes, etc.), cada uno con duración y habilitaciones propias. Hoy la coordinación de agendas se realiza sin un sistema centralizado confiable, lo que impide saber en tiempo real qué profesional está disponible para qué servicio y en qué horario.

## Problema

**Disponibilidad no confiable: se generan dobles reservas para un mismo profesional y no existe una fuente única de verdad sobre la agenda real del salón.** Esto afecta directamente la experiencia del cliente, la productividad de los profesionales y la capacidad de la administración para tomar decisiones (ocupación, ingresos operativos).

## Objetivo

Entregar un MVP funcional que resuelva el problema de disponibilidad y solapamiento, permitiendo reservar, confirmar, atender y cobrar una cita de principio a fin, con datos reales persistidos y verificables desde web y móvil.

## Actores detallados

- **Administrador** — Da de alta y mantiene el catálogo de servicios y profesionales, define qué profesional está habilitado para qué servicio, configura horarios de trabajo y parámetros generales del salón (por ejemplo, si se permite o no solapamiento personal del cliente). Es responsable de que la configuración base sea correcta antes de que operen los demás roles.
- **Recepcionista** — Opera el día a día de la agenda: crea citas a nombre de clientes, las reprograma, las cancela con motivo y confirma asistencia. Es el rol puente entre el cliente y el profesional en el salón físico.
- **Profesional** — Consulta su propia agenda diaria/semanal, inicia y finaliza la atención de una cita, y registra si el cliente no asistió. No gestiona la configuración del catálogo.
- **Cliente** — Consulta disponibilidad real de servicios/profesionales, reserva su propia cita, puede cancelarla o reprogramarla dentro de las reglas establecidas (por ejemplo, límites de cancelación tardía).
- **Supervisor** — Consulta indicadores de ocupación, ingresos operativos y excepciones (cancelaciones tardías, no asistencias), sin operar la agenda directamente.

## Alcance del MVP

El sistema debe cubrir, como mínimo, los diez módulos obligatorios de la ficha oficial: Usuarios, Profesionales, Servicios, Horarios, Disponibilidad, Clientes, Citas, Atención, Pagos simplificados y Dashboard. El flujo de extremo a extremo que el MVP debe demostrar es:

**Administrador configura servicio/profesional/horario → cliente consulta disponibilidad y reserva → recepcionista confirma → profesional inicia y finaliza atención → se registra pago → dashboard refleja ocupación.**

## Fuera del alcance (ver exclusiones detalladas en el README)

Pagos bancarios reales, notificaciones automatizadas, inventario, nómina/contabilidad completa, y cualquier automatización de reservas por IA.

## Criterio de éxito del MVP

- Un profesional nunca tiene dos citas activas que se solapen en el tiempo (RN-01).
- La duración de cada cita se determina automáticamente por el servicio reservado (RN-02).
- Solo se puede asignar un profesional habilitado para el servicio solicitado (RN-03).
- El flujo crítico completo (configuración → reserva → confirmación → atención → pago → dashboard) puede demostrarse con datos reales, sin editar tablas manualmente.
- Las citas históricas se conservan y son consultables (RN-06); nunca se eliminan.
