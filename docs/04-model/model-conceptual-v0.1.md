# Modelo conceptual v0.1 — SalonPro

## 1. Objetivo

Este documento identifica los conceptos principales del dominio de SalonPro, sus atributos conceptuales, relaciones, cardinalidades y primeras reglas de integridad, como base para el futuro modelo relacional.

## 2. Fuente analizada

- Proyecto asignado: SalonPro — Agenda, Servicios, Profesionales y Operación de Salón/SPA
- Secciones revisadas: A, B, C, D, E, F, G y J de la ficha oficial.

## 3. Candidatos analizados

| Concepto                                   | Clasificación                    | Justificación                                                                         | Fuente                           |
| ------------------------------------------ | -------------------------------- | ------------------------------------------------------------------------------------- | -------------------------------- |
| Profesional                                | Entidad                          | Identidad propia, datos propios (nombre, especialidad), participa en Citas y Horarios | Actores C, RF-01                 |
| Servicio                                   | Entidad                          | Identidad propia, duración y precio propios                                           | D, RF-02, RN-02                  |
| ProfesionalServicio                        | Entidad (relación con datos)     | Registra qué profesional está habilitado para qué servicio                            | RN-03, RF-03                     |
| Horario                                    | Entidad                          | Franjas de disponibilidad propias de un profesional                                   | RF-04                            |
| BloqueoHorario                             | Entidad                          | Excepción con fecha y motivo que anula disponibilidad                                 | RN-07, RF-05                     |
| Cliente                                    | Entidad                          | Identidad y datos propios; historial de citas                                         | Actores C, RF-07                 |
| Cita                                       | Entidad núcleo                   | Identidad, ciclo de estados, participa en múltiples reglas                            | RN-01,05,06,08,09; RF-08 a RF-13 |
| CitaServicio                               | Entidad (detalle)                | Una cita puede incluir más de un servicio, cada uno con precio propio congelado       | RN-08                            |
| Atención                                   | Entidad                          | Registra la ejecución real (inicio/fin), distinta de la reserva                       | RF-12, RF-13                     |
| Pago                                       | Entidad                          | Registro operativo propio, no solo un dato de la Cita                                 | RN-10, RF-14                     |
| Usuario / Rol                              | Entidad de soporte               | Necesarios para autenticación y permisos                                              | Actores C                        |
| Auditoría                                  | Entidad                          | Registra quién hizo qué y cuándo en operaciones críticas                              | RF-18                            |
| Administrador / Recepcionista / Supervisor | Actor/Rol, no entidad de dominio | Son roles de Usuario, sin datos propios más allá de su cuenta                         | Actores C                        |
| Estado de la Cita                          | Atributo de Cita                 | Es una condición por la que pasa la Cita, no una entidad aparte                       | RN-05                            |
| Precio aplicado                            | Atributo de CitaServicio         | Describe la cita, no tiene vida propia                                                | RN-08                            |
| Duración                                   | Atributo de Servicio             | Describe al servicio                                                                  | RN-02                            |
| Dashboard / Indicadores                    | Resultado derivado               | Se calcula a partir de Citas y Pagos, no se persiste como entidad                     | RF-17                            |

## 4. Entidades núcleo v0.1

### Profesional

Responsabilidad: persona que presta servicios y ejecuta atenciones.
Atributos conceptuales: nombre, especialidad, estado (activo/inactivo).
Identificador de negocio candidato: código de profesional.

### Servicio

Responsabilidad: tipo de servicio ofrecido, define duración y precio base.
Atributos conceptuales: nombre, duración, precioBase.
Identificador de negocio candidato: código de servicio.

### ProfesionalServicio

Responsabilidad: habilita a un profesional para prestar un servicio específico (RN-03).
Atributos conceptuales: fechaHabilitación.
Identificador de negocio candidato: combinación profesional + servicio.

### Horario

Responsabilidad: disponibilidad configurada de un profesional (franjas de trabajo).
Atributos conceptuales: díaSemana, horaInicio, horaFin.

### BloqueoHorario

Responsabilidad: excepción que anula disponibilidad en un rango de tiempo (RN-07).
Atributos conceptuales: fechaInicio, fechaFin, motivo.

### Cliente

Responsabilidad: persona que reserva y recibe el servicio.
Atributos conceptuales: nombre, contacto.
Identificador de negocio candidato: documento o contacto único.

### Cita

Responsabilidad: reserva de uno o más servicios con un profesional, con ciclo de estados (RN-05).
Atributos conceptuales: fechaHora, estado, motivoCancelación (si aplica).
Identificador de negocio candidato: código de cita.

### CitaServicio

Responsabilidad: detalle de qué servicio(s) incluye una cita.
Atributos conceptuales: precioAplicado (congelado al confirmar, RN-08).

### Atención

Responsabilidad: registro de la ejecución real de la cita por el profesional.
Atributos conceptuales: horaInicioReal, horaFinReal.

### Pago

Responsabilidad: registro operativo del cobro de una cita (RN-10).
Atributos conceptuales: monto, método, fechaPago.

## 5. Relaciones

- Un Profesional puede tener muchas Citas; cada Cita se asigna a un solo Profesional.
- Un Cliente puede tener muchas Citas; cada Cita pertenece a un solo Cliente (RN-09).
- Una Cita puede tener uno o varios CitaServicio; cada CitaServicio pertenece a una sola Cita.
- Un Servicio puede aparecer en muchos CitaServicio; cada CitaServicio referencia un solo Servicio.
- Un Profesional puede estar habilitado para varios Servicios, y un Servicio puede tener varios Profesionales habilitados, a través de ProfesionalServicio (RN-03).
- Un Profesional tiene varios Horarios y puede tener varios BloqueosHorario (RN-07).
- Una Cita puede tener una Atención asociada cuando se ejecuta.
- Una Cita puede tener un Pago asociado cuando se registra el cobro.

## 6. Cardinalidades

| Relación                                         | Cardinalidad | Justificación                                                                |
| ------------------------------------------------ | ------------ | ---------------------------------------------------------------------------- |
| Profesional — Cita                               | 1:N          | Un profesional atiende muchas citas; cada cita tiene un único profesional    |
| Cliente — Cita                                   | 1:N          | Un cliente puede tener varias citas (RN-09); cada cita es de un solo cliente |
| Cita — CitaServicio                              | 1:N          | Una cita puede incluir uno o más servicios                                   |
| Servicio — CitaServicio                          | 1:N          | Un servicio puede estar en muchas citas distintas                            |
| Profesional — Servicio (vía ProfesionalServicio) | N:M          | Depende de habilitación explícita (RN-03)                                    |
| Profesional — Horario                            | 1:N          | Varias franjas configuradas por profesional                                  |
| Profesional — BloqueoHorario                     | 1:N          | Un profesional puede tener varios bloqueos                                   |
| Cita — Atención                                  | 0..1         | No toda cita reservada llegó a ejecutarse                                    |
| Cita — Pago                                      | 0..1         | El pago se registra cuando corresponde, no siempre de inmediato              |

## 7. Reglas iniciales de integridad

- RI-01: Un Profesional no puede tener dos Citas activas que se solapen en el tiempo (RN-01).
- RI-02: La duración de una Cita depende del/los Servicio(s) incluidos, no es libre (RN-02).
- RI-03: Solo puede asociarse un Profesional a una CitaServicio si existe ProfesionalServicio vigente (RN-03).
- RI-04: Una cancelación tardía debe quedar registrada, no eliminada (RN-04).
- RI-05: El estado de una Cita solo avanza por la secuencia válida: reservada → confirmada → en atención → (finalizada | cancelada | no asistió) (RN-05).
- RI-06: Una Cita histórica no se elimina físicamente (RN-06).
- RI-07: No se puede crear una Cita sobre un rango cubierto por un BloqueoHorario del Profesional (RN-07).
- RI-08: El precio de CitaServicio queda fijo desde que la Cita se confirma, aunque el precio base del Servicio cambie después (RN-08).
- RI-09: El Pago es un registro operativo (monto, método, fecha), sin integración bancaria real (RN-10).

## 8. Dudas y decisiones

- D-01: ¿El control de solapamiento por Cliente (RN-09) es configurable globalmente o por administrador? Pendiente de confirmar con el docente.
- D-02: Usuario y Rol se dejan como entidades de soporte (autenticación) hasta el modelo relacional de Clase 03.
- D-03: Auditoría — ¿entidad de log genérica o atributos de trazabilidad por entidad? Se decide en Clase 03.

## 9. Trazabilidad inicial

| Concepto/relación   | RN/RF asociado                                          |
| ------------------- | ------------------------------------------------------- |
| Cita                | RN-01, RN-02, RN-05, RN-06, RN-08, RN-09, RF-08 a RF-13 |
| ProfesionalServicio | RN-03, RF-03                                            |
| BloqueoHorario      | RN-07, RF-05                                            |
| Pago                | RN-10, RF-14                                            |
| Auditoría           | RF-18                                                   |

## 10. Pendientes para Clase 03

- Revisar identificadores.
- Transformar el modelo conceptual en modelo relacional.
- Definir PK, FK y opcionalidad física.
- Resolver la relación N:M Profesional–Servicio (tabla puente ProfesionalServicio).
- Revisar normalización inicial.
