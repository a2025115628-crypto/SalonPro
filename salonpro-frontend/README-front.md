# SalonPro Frontend

Este proyecto corresponde al frontend de SalonPro, desarrollado con React, TypeScript y Vite.

## Estructura principal

### app
Contiene la composición principal de la aplicación. Aquí se encuentra `App.tsx`, que funciona como componente raíz del frontend.

### components
Contiene componentes reutilizables que pueden utilizarse en distintas partes de SalonPro. Dentro de `common` se ubican componentes generales que no pertenecen a una sola funcionalidad.

### features
Contiene los módulos específicos del sistema. En SalonPro se han preparado inicialmente los módulos `usuarios` y `roles`, cada uno organizado en componentes, páginas, servicios y tipos.

### services
Contiene servicios compartidos del frontend. La carpeta `http` estará destinada a la configuración de la comunicación con la API REST del backend de SalonPro.

### config
Contiene configuraciones generales del frontend, incluyendo valores que puedan depender de variables de entorno o configuraciones globales de la aplicación.