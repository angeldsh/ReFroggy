# Froggy Weather App 🐸🌦️

Una aplicación meteorológica moderna, rápida y responsive, inspirada en la clásica experiencia "Froggy" de Google Weather. Desarrollada con **Angular 20** bajo el modelo de Standalone Components y utilizando las APIs de **Open-Meteo**.

## Características Principales

- **Arquitectura Moderna Angular**: Uso exclusivo de Standalone Components (sin `NgModules`).
- **Estado Reactivo Avanzado**: Utilización de Angular Signals y la nueva `Resource API` (`rxResource`) para cargas asíncronas limpias y predecibles.
- **PWA Ready**: Funciona offline gracias a la implementación de Angular Service Worker con estrategias de caché personalizadas (freshness/stale-while-revalidate) para las peticiones a la API.
- **Diseño Glassmorphism**: Interfaz translúcida y moderna.
- **Modos Dinámicos**: Fondos que cambian automáticamente según la hora del día y la condición climática (Despejado, Lluvia, Tormenta, etc.).
- **Modo Oscuro Integrado**: Soporte nativo a través de `prefers-color-scheme`.
- **Responsive & Mobile First**: Diseñada principalmente para ser utilizada y consumida en dispositivos móviles, soportando visualización óptima en pantallas grandes.
- **Geolocalización Automática**: Acceso al tiempo local inmediato, con posibilidad de buscar cualquier otra ciudad en el mundo.

## Instalación y Ejecución

1. Clona el repositorio.
2. Instala las dependencias:
   ```bash
   npm install
   ```
3. Ejecuta el servidor de desarrollo:
   ```bash
   ng serve
   ```
4. Navega a `http://localhost:4200/`.

## Integración con APIs

El proyecto utiliza las APIs públicas y gratuitas de **Open-Meteo**:
- `Forecast API`: Para la obtención de la temperatura actual, pronóstico horario y pronóstico de 7 días.
- `Geocoding API`: Para la búsqueda asíncrona de ciudades en todo el mundo.

No se requieren API keys.

## Tecnologías Utilizadas

- **Angular 20**
- **TypeScript**
- **SCSS**
- **RxJS** (limitado a necesidades complejas de eventos asíncronos como `debounceTime` en el input de búsqueda).

## Licencia

Desarrollado bajo licencia MIT.
