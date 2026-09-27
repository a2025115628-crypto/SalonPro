# Matriz de corte — Parcial 1 (SalonPro)

## 1. Propósito

Este documento formaliza, para cada Requisito Funcional (RF) y Regla de Negocio (RN) ya catalogados en
`backlog-v0.1.md`, si pertenecen al alcance evaluable del **Parcial 1** y cuál es su estado real de
implementación en el backend actual.

## 2. Nota sobre las fuentes utilizadas

Según la *Guía Formal del Estudiante*, es el docente quien debe establecer, **antes de cada corte**, qué parte
del proyecto pertenece a Trabajos Prácticos, Parcial 1, Parcial 2 o Examen Final ("Regla de frontera
evaluable"). Los materiales disponibles al momento de escribir este documento (la Guía Formal general y el
banco de preguntas de defensa oral de backend) describen el alcance típico de un Parcial 1 en términos
generales (problema, modelo relacional, SQL/PostgreSQL, Git/Docker inicial, Java/Spring y arquitectura "hasta
la frontera anunciada"), pero **no delimitan específicamente cuáles de los RF-01 a RF-18 y RN-01 a RN-10 de
SalonPro entran en este corte**.

Por lo tanto, para evitar decidir por intuición:

- La columna **"Parcial 1"** se deja marcada como **"Pendiente de definir"** para todos los RF y RN, hasta que
  el docente comunique la delimitación específica para este proyecto.
- La columna **"Estado"** sí se completa con información verificable, tomada del backend actual
  (`salonpro-backend/src`) y del `README.md` del repositorio, que confirman que **los únicos módulos
  implementados y persistidos hoy son Usuario y Rol**. Ninguno de los RF-01 a RF-18 (que corresponden al
  dominio de profesionales, servicios, horarios, citas, pagos y auditoría) tiene código implementado todavía.

> Dato relevante: el banco de preguntas de defensa oral de backend está construido enteramente sobre una
> relación uno-a-muchos genérica tipo "EntidadPadre/EntidadHija", coherente con lo único que existe hoy en el
> código (Usuario–Rol). Esto sugiere que la defensa de este corte gira en torno a lo ya implementado, y no
> necesariamente sobre los 18 RF del backlog funcional — pero esta es una inferencia, no una confirmación
> oficial, así que no se usa para marcar ningún "Sí" en la columna Parcial 1.

## 3. Requisitos Funcionales (RF)

| ID | Tipo | Descripción | Parcial 1 | Estado |
|---|---|---|---|---|
| RF-01 | RF | Gestionar profesionales | Pendiente de definir | Pendiente |
| RF-02 | RF | Gestionar servicios y duración | Pendiente de definir | Pendiente |
| RF-03 | RF | Asociar profesionales a servicios | Pendiente de definir | Pendiente |
| RF-04 | RF | Configurar horarios | Pendiente de definir | Pendiente |
| RF-05 | RF | Registrar bloqueos de agenda | Pendiente de definir | Pendiente |
| RF-06 | RF | Consultar slots disponibles | Pendiente de definir | Pendiente |
| RF-07 | RF | Registrar clientes | Pendiente de definir | Pendiente |
| RF-08 | RF | Crear cita | Pendiente de definir | Pendiente |
| RF-09 | RF | Reprogramar cita | Pendiente de definir | Pendiente |
| RF-10 | RF | Cancelar cita con motivo | Pendiente de definir | Pendiente |
| RF-11 | RF | Confirmar asistencia | Pendiente de definir | Pendiente |
| RF-12 | RF | Iniciar y finalizar atención | Pendiente de definir | Pendiente |
| RF-13 | RF | Registrar no asistencia | Pendiente de definir | Pendiente |
| RF-14 | RF | Registrar pago simplificado | Pendiente de definir | Pendiente |
| RF-15 | RF | Consultar agenda diaria/semanal | Pendiente de definir | Pendiente |
| RF-16 | RF | Consultar historial del cliente | Pendiente de definir | Pendiente |
| RF-17 | RF | Mostrar ocupación e ingresos operativos | Pendiente de definir | Pendiente |
| RF-18 | RF | Auditar cambios de agenda | Pendiente de definir | Pendiente |

## 4. Reglas de Negocio (RN)

| ID | Tipo | Descripción | Parcial 1 | Estado |
|---|---|---|---|---|
| RN-01 | RN | No puede existir solapamiento de citas para un mismo profesional | Pendiente de definir | Pendiente |
| RN-02 | RN | La duración de una cita depende del servicio seleccionado | Pendiente de definir | Pendiente |
| RN-03 | RN | Sólo profesionales habilitados para un servicio pueden ser asignados | Pendiente de definir | Pendiente |
| RN-04 | RN | Las cancelaciones tardías quedan registradas | Pendiente de definir | Pendiente |
| RN-05 | RN | Una cita confirmada debe recorrer estados válidos (reservada, confirmada, en atención, finalizada/cancelada/no asistió) | Pendiente de definir | Pendiente |
| RN-06 | RN | No se eliminan citas históricas | Pendiente de definir | Pendiente |
| RN-07 | RN | Los horarios bloqueados no están disponibles para reserva | Pendiente de definir | Pendiente |
| RN-08 | RN | El precio aplicado queda congelado al confirmar la cita | Pendiente de definir | Pendiente |
| RN-09 | RN | Un cliente puede tener varias citas, con control de solapamiento personal configurable | Pendiente de definir | Pendiente |
| RN-10 | RN | El pago del MVP es registro operativo, no integración bancaria real | Pendiente de definir | Pendiente |

## 5. Módulos implementados hoy que no forman parte de este catálogo RF/RN

A modo de referencia (no reemplaza la definición pendiente del docente): el backend cuenta actualmente con
los módulos **Usuario** y **Rol**, con persistencia en PostgreSQL y endpoints REST de alta, consulta,
actualización y baja. Estos módulos son transversales (autenticación/autorización) y no corresponden a
ninguno de los RF-01 a RF-18 definidos en `backlog-v0.1.md`, por lo que no se incluyen como filas en las
tablas anteriores.

## 6. Próximo paso

Cuando el docente comunique la delimitación oficial del Parcial 1 para SalonPro, actualizar la columna
"Parcial 1" de este documento (Sí/No) para cada RF y RN correspondiente, sin modificar la columna "Estado"
salvo que el backend avance.
