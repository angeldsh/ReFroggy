# Froggy Weather App 🐸🌦️

A modern, fast, and responsive weather application inspired by the classic Google Weather "Froggy" experience. Built with **Angular 20** using the Standalone Components architecture and powered by **Open-Meteo APIs**.

## Key Features

- **Modern Angular Architecture**: Built exclusively with Standalone Components (no `NgModules`).
- **Advanced Reactive State Management**: Leverages Angular Signals and the new `Resource API` (`rxResource`) for clean and predictable asynchronous data handling.
- **PWA Ready**: Works offline thanks to Angular Service Worker implementation with custom caching strategies (freshness / stale-while-revalidate) for API requests.
- **Glassmorphism Design**: A modern, translucent user interface.
- **Dynamic Themes**: Backgrounds automatically adapt based on the time of day and weather conditions (Clear Sky, Rain, Thunderstorm, etc.).
- **Built-in Dark Mode**: Native support through `prefers-color-scheme`.
- **Responsive & Mobile-First**: Primarily designed for mobile devices while providing an optimized experience on larger screens.
- **Automatic Geolocation**: Instantly displays local weather and allows searching for any city worldwide.

## Installation & Setup

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd froggy-weather-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   ng serve
   ```

4. Open your browser and navigate to:
   ```
   http://localhost:4200/
   ```

## API Integration

This project uses the free public APIs provided by **Open-Meteo**:

- **Forecast API**: Retrieves current temperature, hourly forecasts, and 7-day weather forecasts.
- **Geocoding API**: Enables asynchronous city search worldwide.

No API keys are required.

## Technologies Used

- **Angular 20**
- **TypeScript**
- **SCSS**
- **RxJS** (used only where necessary for more complex asynchronous event handling, such as `debounceTime` in the search input)

## License

Released under the MIT License.
