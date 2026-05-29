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
  readonly geolocationDenied = signal<boolean>(false);
  
  // Weather rxResource
  readonly weatherResource = rxResource<WeatherResponse | null, GeocodingResult | null>({
    params: () => this.location(),
    stream: ({ params }) => {
      if (!params) return of(null);
      return this.weatherService.getForecast(params.latitude, params.longitude);
    }
  });

  // Computed Derived State
  readonly weather = computed(() => this.weatherResource.value());
  readonly isLoading = computed(() => this.weatherResource.isLoading());
  readonly error = computed(() => this.weatherResource.error());
  
  readonly currentCondition = computed(() => {
    const data = this.weather();
    if (!data) return null;
    return this.weatherCodeMapper.getWeatherInfo(data.current.weather_code, data.current.is_day);
  });

  // Actions
  async initLocation() {
    if (!this.location()) {
      try {
        const coords = await this.geolocationService.getCurrentPosition();
        this.geolocationDenied.set(false);
        this.setLocation({
          id: 0,
          name: 'Ubicación Actual',
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
}
