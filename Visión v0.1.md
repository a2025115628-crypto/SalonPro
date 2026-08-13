
# 1. Contexto

SalonPro es un sistema orientado a la gestión de la operación de un salón de belleza y spa. El negocio necesita coordinar profesionales, servicios, horarios, citas, atención, consumos internos y pagos simplificados.

La operación actual presenta dificultades para conocer la disponibilidad real y coordinar correctamente las citas, siendo las **dobles reservas** y el **desconocimiento de la disponibilidad real** los principales problemas.

El producto se plantea como un **MVP** que permita configurar servicios y profesionales, gestionar disponibilidad, reservar citas desde web y móvil, controlar los estados de atención y obtener indicadores básicos de ocupación.


# 2. Problema

El principal problema identificado es la existencia de **dobles reservas** y el **desconocimiento de la disponibilidad real** de los profesionales y horarios.

Estas situaciones dificultan la coordinación de la agenda y pueden generar conflictos durante la operación del salón. La falta de un control adecuado de la disponibilidad afecta la gestión de las citas y la capacidad de supervisar la ocupación del negocio.

SalonPro busca resolver este problema mediante una gestión integrada de profesionales, servicios, horarios, disponibilidad, clientes, citas y atención.


# 3. Objetivo

Crear un MVP que permita:

- Configurar servicios y profesionales
- Gestionar disponibilidad
- Reservar citas desde web y móvil
- Controlar los estados de atención
- Obtener indicadores básicos de ocupación

El sistema debe permitir realizar de manera integrada el **proceso principal de la operación**:

> Configurar servicios, profesionales y horarios → Consultar disponibilidad → Reservar una cita → Confirmar la cita → Iniciar y finalizar la atención → Registrar el pago simplificado → Reflejar la ocupación en el dashboard.


# 4. Actores detallados

# 4.1 Administrador
Responsable de configurar los elementos necesarios para la operación del salón.

- Configurar servicios
- Configurar profesionales
- Configurar horarios
- Configurar parámetros necesarios para la operación

# 4.2 Recepcionista
Responsable de la gestión operativa de las citas.

- Agendar citas
- Reprogramar citas
- Cancelar citas
- Confirmar citas

# 4.3 Profesional
Responsable de consultar su agenda y actualizar el estado de la atención.

- Consultar su agenda
- Consultar las citas asignadas
- Iniciar la atención
- Finalizar la atención
- Registrar una no asistencia cuando corresponda

# 4.4 Cliente
Responsable de gestionar sus citas de acuerdo con las reglas establecidas.

- Consultar disponibilidad
- Reservar citas
- Consultar sus citas
- Cancelar citas según las reglas
- Reprogramar citas según las reglas

# 4.5 Supervisor
Responsable de consultar información relacionada con la operación del salón.

- Consultar indicadores
- Consultar la ocupación
- Consultar excepciones de la operación


# 5. Alcance del MVP

# Módulos obligatorios

| # | Módulo |
|---|--------|
| 1 | Usuarios |
| 2 | Profesionales |
| 3 | Servicios |
| 4 | Horarios |
| 5 | Disponibilidad |
| 6 | Clientes |
| 7 | Citas |
| 8 | Atención |
| 9 | Pagos simplificados |
| 10 | Dashboard |

# Capacidades funcionales

El sistema deberá permitir:

- Gestionar profesionales y servicios, y asociar profesionales a servicios
- Configurar horarios, registrar bloqueos de agenda y consultar espacios disponibles
- Registrar clientes
- Operar sobre las citas:
  - Crear citas
  - Reprogramar citas
  - Cancelar citas con motivo
  - Confirmar asistencia
  - Iniciar y finalizar la atención
  - Registrar no asistencia
  - Registrar pagos simplificados
- Consultar la agenda diaria y semanal
- Consultar el historial del cliente
- Mostrar indicadores de ocupación e ingresos operativos
- Auditar cambios de agenda

#Flujo crítico

> **Administrador** configura servicio/profesional/horario → **Cliente** consulta disponibilidad y reserva → **Recepcionista** confirma → **Profesional** inicia y finaliza atención → Se registra pago → **Dashboard** refleja ocupación.

Reglas de negocio obligatorias

1. No puede existir solapamiento de citas para un mismo profesional.
2. La duración de una cita depende del servicio seleccionado.
3. Solo profesionales habilitados para un servicio pueden ser asignados.
4. Las cancelaciones tardías quedan registradas.
5. Una cita confirmada debe recorrer estados válidos: **reservada → confirmada → en atención → finalizada**, o bien **cancelada** / **no asistió**.
6. No se eliminan citas históricas.
7. Los horarios bloqueados no están disponibles para reserva.
8. El precio aplicado queda congelado al confirmar la cita.
9. Un cliente puede tener varias citas, pero se controla el solapamiento personal configurable.
10. El pago del MVP es un registro operativo, no una integración bancaria real.

6. Criterio de éxito

El MVP se considerará exitoso cuando pueda ejecutarse de forma reproducible y permita demostrar el flujo crítico completo con datos persistidos, **sin editar manualmente las tablas durante la demostración**.

El producto cumple su objetivo si:

- [ ] El sistema puede inicializarse desde cero mediante instrucciones reproducibles y migraciones
- [ ] El flujo crítico se ejecuta sin editar manualmente las tablas durante la demostración
- [ ] Las reglas de negocio obligatorias se validan en el backend, no únicamente en la interfaz
- [ ] Web y móvil consumen datos reales del mismo backend
- [ ] Los errores relevantes producen respuestas controladas y mensajes comprensibles
- [ ] Las operaciones críticas conservan trazabilidad suficiente para explicar quién hizo qué y cuándo
- [ ] Los estados y transiciones del dominio no permiten combinaciones incoherentes
- [ ] Existen pruebas automatizadas sobre las reglas y flujos esenciales
- [ ] La documentación coincide con el sistema entregado
- [ ] Cualquier integrante puede defender la arquitectura, los datos, el backend, la web, el móvil y las pruebas correspondientes al alcance exigido

