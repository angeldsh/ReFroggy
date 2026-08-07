# 🐸 ReFroggy Weather App

A modern, high-performance, mobile-first weather application inspired by the classic Google Weather “Froggy” experience.

Built with **Angular 21**, **TypeScript**, **SCSS**, **Angular Signals**, **Resource API**, **Open-Meteo APIs**, **SVG Vector Micro-animations**, and **Glassmorphic UI**.

🔗 **Live Demo:** [weatherfroggy.netlify.app](https://weatherfroggy.netlify.app/)  
📂 **Repository:** [github.com/angeldsh/ReFroggy](https://github.com/angeldsh/ReFroggy)

---

## 📖 Overview

**ReFroggy** delivers a premium, fast, interactive weather experience. Users can inspect current weather conditions, detailed hourly forecasts, and a 14-day temperature trend visualizer for their current geolocation or any city worldwide.

---

## ✨ Key Features & Enhancements

- **🎨 Glassmorphism & Dynamic Themes**
  - HSL-tailored color design system with condition-aware themes (Day/Night, Clear, Cloudy, Rain, Storm, Snow, Fog).
  - Double-buffered ambient background container with seamless cross-fading transitions.
  - Animated particle overlays (falling raindrops, floating snowflakes, glowing starry night).

- **☀️ Animated Vector SVG Weather Icons**
  - High-DPI custom vector SVG icons featuring keyframe animations (rotating sun rays, blinking stars, swaying snowflakes, rain drop physics, lightning flashes).

- **⚡ Fast Response & API Caching**
  - In-memory 10-minute caching layer to eliminate reloading delays when switching between locations.
  - Search autocomplete with 250ms debouncing and search result caching.

- **⭐ Favorite Cities Management**
  - Quick-access favorite city chips persisted in `localStorage`.
  - 1-tap removal directly from chips.
  - Star toggle buttons in both search dropdown results and the main weather card.

- **📊 Rich Weather Metrics & 14-Day Visualizer**
  - Current condition card: Sensación Térmica / Feels Like, Humidity, Wind speed + compass direction (N, NE, E, SE, S, SW, W, NW), UV Index level gauge (Low/Moderate/High/Very High/Extreme), Precipitation (mm), Sunrise/Sunset, Today's Max/Min.
  - 4-column 14-day forecast grid with proportional min-max temperature spectrum bars.

- **📱 Touch Gestures & Pull-to-Refresh**
  - Mobile swipe gestures for tab navigation (*Hoy / Today* ↔ *14 Días / 14 Days*).
  - Native Pull-to-Refresh swipe gesture from top of screen.

- **🌐 Automatic User Browser Language Detection**
  - Integrated `LanguageService` that detects the user's browser language (`navigator.language`) to serve bilingual Spanish (ES) or English (EN) interface text automatically.

---

## 🧩 Tech Stack

- **Framework:** Angular 21 (Standalone Components)
- **State Management:** Angular Signals & `rxResource` API
- **Styling:** Vanilla SCSS, CSS Custom Properties, Glassmorphism
- **Graphics & Motion:** SVG Animations, Hardware-accelerated CSS Keyframes
- **APIs:** Open-Meteo Forecast & Geocoding APIs (No API key required)
- **PWA:** Angular Service Worker (`ngsw-config.json`)

---

## 🏗️ Architecture

```text
src/
├── app/
│   ├── core/            # WeatherStore, LanguageService, WeatherService, GeocodingService, Models
│   ├── features/        # Search & Weather feature modules
│   ├── shared/          # Reusable WeatherIcon, AppShell, Loading & Error states
│   ├── app.component.ts # Root component
│   └── app.config.ts    # Application configuration
└── public/              # Froggy backgrounds, icons, manifest
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- Angular CLI

### Installation

```bash
git clone https://github.com/angeldsh/ReFroggy.git
cd ReFroggy
npm install
ng serve
```

Open your browser at `http://localhost:4200/`.

---

## 👨‍💻 About the Author

Hi, I'm **Ángel del Solar**, a Software Developer with commercial experience building and maintaining business web applications using **Java**, **Spring Boot**, **Angular**, **TypeScript** and **SQL Server**.

- Portfolio: https://angeldsh.github.io/
- GitHub: https://github.com/angeldsh
- LinkedIn: [Ángel del Solar](https://www.linkedin.com/in/%C3%A1ngel-del-solar-3380b0244/)

---

## 📄 License

Released under the MIT License.
