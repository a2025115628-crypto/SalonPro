# Trazabilidad inicial de requisitos v0.1 — SalonPro

## 1. Propósito

Este documento complementa a `backlog-v0.1.md` y a `matriz-corte-parcial1.md`. Mientras esos archivos
recorren la trazabilidad **RF → Historia** y **RN → Historias**, aquí se arma la vista inversa y unificada:
**Historia de Usuario → RF → RN → Estado**, para tener de un vistazo qué reglas de negocio aplican a cada
historia y si esa historia ya tiene código real detrás.

Es un artefacto **inicial**: la guía del proyecto plantea que esta trazabilidad puede crecer más adelante hacia
`Requisito → Regla → Caso de uso → Endpoint → Pantalla → Prueba`, a medida que existan endpoints y pantallas
que enlazar.

## 2. Fuente del estado

La columna "Estado" se toma del código real en `salonpro-backend/src`, no de los documentos de
`docs/04-model` (que son evidencia de diseño, no de implementación — ver README principal). Al momento de
escribir este documento, sólo los módulos Usuario y Rol están implementados, y ninguno de ellos corresponde
a los RF-01 a RF-18 de este backlog. Por lo tanto, todas las historias listadas abajo quedan en **Pendiente**.

## 3. Matriz HU → RF → RN → Estado

| HU | RF | RN | Estado |
|---|---|---|---|
| HU-01 — Gestionar profesionales | RF-01 | — | Pendiente |
| HU-02 — Gestionar servicios y duración | RF-02 | RN-02 | Pendiente |
| HU-03 — Asociar profesionales a servicios | RF-03 | RN-03 | Pendiente |
| HU-04 — Configurar horarios | RF-04 | — | Pendiente |
| HU-05 — Registrar bloqueos de agenda | RF-05 | RN-07 | Pendiente |
| HU-06 — Consultar slots disponibles | RF-06 | RN-01, RN-02, RN-03, RN-07 | Pendiente |
| HU-07 — Registrar clientes | RF-07 | RN-09 | Pendiente |
| HU-08 — Crear cita | RF-08 | RN-01, RN-02, RN-03, RN-05, RN-07, RN-09 | Pendiente |
| HU-09 — Reprogramar cita | RF-09 | RN-01, RN-02, RN-03, RN-05, RN-06, RN-07, RN-09 | Pendiente |
| HU-10 — Cancelar cita con motivo | RF-10 | RN-04, RN-05, RN-06 | Pendiente |
| HU-11 — Confirmar asistencia | RF-11 | RN-05, RN-08 | Pendiente |
| HU-12 — Iniciar y finalizar atención | RF-12 | RN-05 | Pendiente |
| HU-13 — Registrar no asistencia | RF-13 | RN-05, RN-06 | Pendiente |
| HU-14 — Registrar pago simplificado | RF-14 | RN-10 | Pendiente |
| HU-15 — Consultar agenda diaria/semanal | RF-15 | — | Pendiente |
| HU-16 — Consultar historial del cliente | RF-16 | RN-06 | Pendiente |
| HU-17 — Consultar ocupación e ingresos operativos | RF-17 | — | Pendiente |
| HU-18 — Auditar cambios de agenda | RF-18 | — | Pendiente |

## 4. Módulos implementados fuera de este catálogo

Usuario y Rol están implementados y persistidos, pero no tienen HU/RF asociados en este backlog (son
transversales, de autenticación/autorización), por lo que no aparecen en la tabla anterior.

## 5. Cómo crecerá este documento

A futuro, cada fila podrá extenderse agregando columnas de **Caso de uso**, **Endpoint** y **Pantalla** a
medida que se implementen, siguiendo la cadena sugerida por la guía del proyecto:

`Requisito → Regla → Caso de uso → Endpoint → Pantalla → Prueba`

No corresponde completar esas columnas todavía, ya que ningún RF de este catálogo tiene código, endpoint ni
pantalla asociada al día de hoy.
