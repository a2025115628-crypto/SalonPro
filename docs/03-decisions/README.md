# Decisiones técnicas — SalonPro

Esta carpeta registrará las decisiones de arquitectura y diseño (ADR — Architecture Decision Record) a medida que el proyecto avance.

En esta etapa (Clase 01) **aún no se ha tomado ninguna decisión técnica**: todavía no se ha diseñado el modelo conceptual, el modelo relacional, la arquitectura de backend, ni las aplicaciones web o móvil. Según la guía del curso, ese trabajo corresponde a partes posteriores (Parcial 1 en adelante), una vez cerrada la comprensión del dominio documentada en `docs/01-vision` y `docs/02-requirements`.

## Formato sugerido para futuras ADR

Cuando corresponda registrar una decisión (por ejemplo, cómo modelar los estados de una cita, o cómo estructurar los módulos del backend), cada archivo en esta carpeta debería seguir esta estructura mínima:

```
# ADR-NN: <título de la decisión>

## Contexto
¿Qué problema o disyuntiva motivó esta decisión?

## Opciones consideradas
Alternativas evaluadas por el equipo.

## Decisión
Qué se decidió y por qué.

## Consecuencias
Qué implica esta decisión para el resto del sistema.
```
