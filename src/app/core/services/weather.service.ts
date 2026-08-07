import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of, tap } from 'rxjs';
import { WeatherResponse } from '../models/weather.model';

interface CacheEntry {
  timestamp: number;
  data: WeatherResponse;
}

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private http = inject(HttpClient);
  private readonly baseUrl = 'https://api.open-meteo.com/v1/forecast';
  private cache = new Map<string, CacheEntry>();
  private readonly CACHE_TTL = 10 * 60 * 1000; // 10 minutes

  getForecast(latitude: number, longitude: number, forceRefresh = false): Observable<WeatherResponse> {
    const roundedLat = Math.round(latitude * 100) / 100;
    const roundedLng = Math.round(longitude * 100) / 100;
    const cacheKey = `${roundedLat},${roundedLng}`;

    if (!forceRefresh && this.cache.has(cacheKey)) {
      const entry = this.cache.get(cacheKey)!;
      if (Date.now() - entry.timestamp < this.CACHE_TTL) {
        return of(entry.data);
      }
    }

    const params = new HttpParams()
      .set('latitude', latitude.toString())
      .set('longitude', longitude.toString())
      .set('current', 'temperature_2m,apparent_temperature,relative_humidity_2m,precipitation,weather_code,wind_speed_10m,wind_direction_10m,is_day')
      .set('hourly', 'temperature_2m,apparent_temperature,precipitation_probability,precipitation,weather_code,cloud_cover,wind_speed_10m,relative_humidity_2m')
      .set('daily', 'weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum,precipitation_probability_max,sunrise,sunset,uv_index_max')
      .set('timezone', 'auto')
      .set('forecast_days', '14');

    return this.http.get<WeatherResponse>(this.baseUrl, { params }).pipe(
      tap(data => {
        this.cache.set(cacheKey, {
          timestamp: Date.now(),
          data
        });
      })
    );
  }

  clearCache() {
    this.cache.clear();
  }
}

