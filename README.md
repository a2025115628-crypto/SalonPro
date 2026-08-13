# SalonPro — Agenda, Servicios, Profesionales y Operación de Salón/SPA

## Problema

Un salón de belleza y spa coordina profesionales, servicios, horarios, citas, atención y pagos de forma manual (agendas físicas, mensajería, hojas de cálculo). Esto produce **dobles reservas** de un mismo profesional y **desconocimiento de la disponibilidad real**, lo que genera pérdida de tiempo, clientes insatisfechos y falta de visibilidad operativa para la administración.

## Objetivo

Construir un **MVP** que permita:

- Configurar servicios y profesionales (con sus habilitaciones y horarios).
- Conocer disponibilidad real antes de reservar.
- Reservar citas desde web y móvil sin solapamientos.
- Controlar el ciclo de vida de la atención (reservada → confirmada → en atención → finalizada / cancelada / no asistió).
- Registrar el pago de forma operativa.
- Ofrecer indicadores básicos de ocupación e ingresos.

## Actores

| Actor         | Responsabilidad                                            |
| ------------- | ---------------------------------------------------------- |
| Administrador | Configura servicios, profesionales, horarios y parámetros. |
| Recepcionista | Agenda, reprograma y cancela citas.                        |
| Profesional   | Consulta su agenda y actualiza el estado de la atención.   |
| Cliente       | Reserva, consulta y cancela citas según reglas.            |
| Supervisor    | Consulta KPIs y excepciones.                               |

## Alcance del MVP

Módulos obligatorios (no se eliminan sin autorización docente): Usuarios, Profesionales, Servicios, Horarios, Disponibilidad, Clientes, Citas, Atención, Pagos simplificados, Dashboard.

## Exclusiones (fuera del MVP)

> Estas exclusiones son una propuesta técnica razonable derivada del alcance oficial (sección D/RN-10 de la ficha); no están dictadas explícitamente por el docente y deben confirmarse con él antes de darlas por definitivas.

- Integración bancaria real / pasarelas de pago (RN-10 indica que el pago es solo registro operativo).
- Notificaciones push/SMS/email automatizadas (fuera del alcance funcional cerrado).
- Gestión de inventario de productos o insumos del salón.
- Nómina, facturación fiscal o contabilidad completa.
- Marketing, CRM avanzado o fidelización de clientes.
- Cualquier uso de IA que decida, cree o modifique reservas por sí misma (Spring AI queda acotado a resúmenes y sugerencias de mensajes, según sección M de la ficha).

## Stack (referencial — aún no implementado)

Java 21, Spring Boot, PostgreSQL, React + TypeScript, React Native + TypeScript. **Aún no se ha escrito código ni se ha diseñado el modelo relacional**: esta etapa (Clase 01) se limita a comprensión del dominio, visión, glosario y backlog.

## Estado actual

- [x] Comprensión del problema y del cliente.
- [x] Visión v0.1.
- [x] Glosario del dominio v0.1.
- [x] Backlog inicial priorizado v0.1.
- [ ] Modelo conceptual y relacional (Parcial 1).
- [ ] Backend fundacional y API inicial (Parcial 1).
- [ ] Web y móvil conectados a API real (Parcial 1 en adelante).

## Estructura del repositorio

```
salonpro
├── README.md
└── docs
    ├── 01-vision
    │   ├── vision-v0.1.md
    │   └── glossary-v0.1.md
    ├── 02-requirements
    │   └── backlog-v0.1.md
    └── 03-decisions
        └── README.md
```

=======
