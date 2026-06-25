# 🐸 Froggy Weather App

A modern, responsive weather application inspired by the classic Google Weather “Froggy” experience.

Built with **Angular 21**, **TypeScript**, **SCSS**, **Angular Signals**, the **Resource API** and **Open-Meteo APIs**.

🔗 **Live Demo:** [weatherfroggy.netlify.app](https://weatherfroggy.netlify.app/)
📂 **Repository:** [github.com/angeldsh/ReFroggy](https://github.com/angeldsh/ReFroggy)

---

## 📖 Overview

**Froggy Weather App** is a mobile-first weather application that allows users to check current weather conditions and forecasts using their current location or by searching for cities worldwide.

The project was entirely generated using **ChatGPT** as an experiment in AI-assisted development. It explores how modern AI tools can scaffold and build a complete application using modern Angular features such as **Standalone Components**, **Signals**, the **Resource API**, API integration, responsive UI design and Progressive Web App concepts.

---

## ✨ Key Features

- **Current Weather & Location Comparison**
  - Displays current temperature and weather conditions, and allows searching a secondary location to compare data.

- **Location Search**
  - Search for cities worldwide using the Open-Meteo Geocoding API.

- **Hourly & 14-Day Forecast**
  - Shows upcoming weather information for both the current day and the next two weeks.

- **Automatic Geolocation**
  - Detects the user’s current location and loads local weather data automatically.

- **Modern Angular Architecture**
  - Built with Angular 21 using Standalone Components, without `NgModules`.

- **Reactive State Management**
  - Centralized state handling using a `WeatherStore` based on Angular Signals and the new `rxResource` API for clean asynchronous data.

- **Progressive Web App**
  - Includes Angular Service Worker support and caching strategies for a more app-like experience.

- **Dynamic Weather Themes**
  - The interface and background images (featuring the classic "Froggy") adapt visually based on the current weather conditions and time of day.

- **Responsive Design**
  - Mobile-first layout with support for tablets and desktop screens.

---

## 🧩 Tech Stack

- Angular 21
- TypeScript
- SCSS
- Angular Signals
- Angular `rxResource` API
- RxJS
- Angular Service Worker
- Open-Meteo Forecast API
- Open-Meteo Geocoding API

---

## 🏗️ Architecture

The application follows a modern, scalable Angular structure based on feature modules and separated responsibilities:

```text
src/
├── app/
│   ├── core/            # Core state (WeatherStore), services, and models
│   ├── features/        # Feature-based components (Search, Weather views)
│   ├── shared/          # Reusable UI elements (Loaders, Icons, App Shell)
│   ├── app.component.ts # Main application component
│   └── app.config.ts    # Application configuration
└── public/              # Static assets (Froggy images, icons, manifest)
```

The project focuses on keeping UI components (features/shared), API integration, and state management (core) clearly separated.

---

## 🌦️ API Integration

This project uses the free public APIs provided by **Open-Meteo**.

### Forecast API

Used to retrieve:

- Current weather
- Hourly forecast data
- Daily forecast data
- Weather condition codes

### Geocoding API

Used to:

- Search cities by name
- Retrieve latitude and longitude
- Support worldwide city lookup

No API key is required.

---

## 🚀 Getting Started

### Prerequisites

Make sure you have installed:

- Node.js 18+
- Angular CLI

---

### Installation

Clone the repository:

```bash
git clone https://github.com/angeldsh/ReFroggy.git
cd ReFroggy
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
ng serve
```

Open the application in your browser:

```text
http://localhost:4200/
```

---

## 🧪 What This Project Demonstrates

This project serves as an exploration of AI-assisted software development. It demonstrates how ChatGPT can be used to:

- Build modern Angular applications using Standalone Components.
- Use Angular Signals for reactive state management.
- Integrate external REST APIs.
- Handle asynchronous data flows with Angular Resource API and RxJS where needed.
- Build responsive, mobile-first user interfaces.
- Implement PWA features using Angular Service Worker.
- Structure frontend applications in a clean and maintainable way.

---

## 🔮 Future Improvements

Possible future improvements include:

- Add more detailed hourly forecast views.
- Improve accessibility support.
- Add weather alerts if supported by the API.
- Add unit tests for services and components.
- Improve loading and error states.
- Add saved favourite locations.
- Add offline fallback screens for PWA mode.

---

## 👨‍💻 About the Author

Hi, I'm **Ángel del Solar**, a Software Developer with commercial experience building and maintaining business web applications using **Java**, **Spring Boot**, **Angular**, **TypeScript** and **SQL Server**.

I am relocating to **County Kildare, Ireland** in September 2026 and open to **Software Developer**, **Full Stack Developer** and **Java Developer** opportunities.

- Portfolio: https://angeldsh.github.io/
- GitHub: https://github.com/angeldsh
- LinkedIn: [Ángel del Solar](https://www.linkedin.com/in/%C3%A1ngel-del-solar-3380b0244/)

---

## 📄 License

Released under the MIT License.
