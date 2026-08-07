import { Injectable, signal, computed, inject } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { of } from 'rxjs';
import { WeatherService } from '../services/weather.service';
import { GeolocationService } from '../services/geolocation.service';
import { StorageService } from '../services/storage.service';
import { GeocodingResult } from '../models/geocoding.model';
import { WeatherCodeMapperService } from '../services/weather-code-mapper.service';
import { WeatherResponse } from '../models/weather.model';

@Injectable({
  providedIn: 'root'
})
export class WeatherStore {
  private weatherService = inject(WeatherService);
  private geolocationService = inject(GeolocationService);
  private storageService = inject(StorageService);
  private weatherCodeMapper = inject(WeatherCodeMapperService);

  // UI State Signals
  readonly location = signal<GeocodingResult | null>(this.storageService.getItem<GeocodingResult>('lastLocation'));
  readonly secondaryLocation = signal<GeocodingResult | null>(this.storageService.getItem<GeocodingResult>('secondaryLocation'));
  readonly favorites = signal<GeocodingResult[]>(this.storageService.getItem<GeocodingResult[]>('favorites') || [
    { id: 3117735, name: 'Madrid', latitude: 40.4168, longitude: -3.7038, country: 'Spain' },
    { id: 3128760, name: 'Barcelona', latitude: 41.3888, longitude: 2.159, country: 'Spain' },
    { id: 2643743, name: 'London', latitude: 51.5085, longitude: -0.1257, country: 'United Kingdom' },
    { id: 5128581, name: 'New York', latitude: 40.7143, longitude: -74.006, country: 'United States' }
  ]);
  readonly geolocationDenied = signal<boolean>(false);
  readonly refreshCounter = signal<number>(0);

  // Weather rxResource
  readonly weatherResource = rxResource<WeatherResponse | null, { loc: GeocodingResult | null; refresh: number }>({
    params: () => ({ loc: this.location(), refresh: this.refreshCounter() }),
    stream: ({ params }) => {
      if (!params.loc) return of(null);
      return this.weatherService.getForecast(params.loc.latitude, params.loc.longitude, params.refresh > 0);
    }
  });

  readonly secondaryWeatherResource = rxResource<WeatherResponse | null, { loc: GeocodingResult | null; refresh: number }>({
    params: () => ({ loc: this.secondaryLocation(), refresh: this.refreshCounter() }),
    stream: ({ params }) => {
      if (!params.loc) return of(null);
      return this.weatherService.getForecast(params.loc.latitude, params.loc.longitude, params.refresh > 0);
    }
  });

  // Computed Derived State
  readonly weather = computed(() => this.weatherResource.value());
  readonly isLoading = computed(() => this.weatherResource.isLoading());
  readonly error = computed(() => this.weatherResource.error());
  
  readonly secondaryWeather = computed(() => this.secondaryWeatherResource.value());
  readonly isSecondaryLoading = computed(() => this.secondaryWeatherResource.isLoading());
  readonly secondaryError = computed(() => this.secondaryWeatherResource.error());
  
  readonly currentCondition = computed(() => {
    const data = this.weather();
    if (!data) return null;
    return this.weatherCodeMapper.getWeatherInfo(data.current.weather_code, data.current.is_day);
  });

  readonly isCurrentFavorite = computed(() => {
    const currentLoc = this.location();
    if (!currentLoc) return false;
    return this.favorites().some(f => f.name.toLowerCase() === currentLoc.name.toLowerCase());
  });

  // Actions
  async initLocation() {
    if (!this.location()) {
      try {
        const coords = await this.geolocationService.getCurrentPosition();
        this.geolocationDenied.set(false);
        const isEs = typeof navigator !== 'undefined' && navigator.language?.toLowerCase().startsWith('es');
        this.setLocation({
          id: 0,
          name: isEs ? 'Ubicación Actual' : 'Current Location',
          latitude: coords.latitude,
          longitude: coords.longitude
        });
      } catch (err) {
        this.geolocationDenied.set(true);
      }
    }
  }

  setLocation(loc: GeocodingResult) {
    this.location.set(loc);
    this.storageService.setItem('lastLocation', loc);
  }

  setSecondaryLocation(loc: GeocodingResult) {
    this.secondaryLocation.set(loc);
    this.storageService.setItem('secondaryLocation', loc);
  }

  clearSecondaryLocation() {
    this.secondaryLocation.set(null);
    this.storageService.removeItem('secondaryLocation');
  }

  toggleFavorite(loc?: GeocodingResult) {
    const targetLoc = loc || this.location();
    if (!targetLoc) return;

    const currentFavs = this.favorites();
    const index = currentFavs.findIndex(f => f.name.toLowerCase() === targetLoc.name.toLowerCase());
    
    let updated: GeocodingResult[];
    if (index >= 0) {
      updated = currentFavs.filter((_, i) => i !== index);
    } else {
      updated = [...currentFavs, targetLoc];
    }
    
    this.favorites.set(updated);
    this.storageService.setItem('favorites', updated);
  }

  refreshWeather() {
    this.weatherService.clearCache();
    this.refreshCounter.update(c => c + 1);
  }
}

