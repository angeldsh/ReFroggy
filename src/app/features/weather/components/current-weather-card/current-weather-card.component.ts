import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherResponse } from '../../../../core/models/weather.model';
import { WeatherConditionInfo } from '../../../../core/models/weather-code.model';
import { GeocodingResult } from '../../../../core/models/geocoding.model';
import { WeatherIconComponent } from '../../../../shared/components/weather-icon/weather-icon.component';
import { WeatherStore } from '../../../../core/state/weather.store';
import { LanguageService } from '../../../../core/services/language.service';

@Component({
  selector: 'app-current-weather-card',
  imports: [CommonModule, WeatherIconComponent],
  templateUrl: './current-weather-card.component.html',
  styleUrl: './current-weather-card.component.scss'
})
export class CurrentWeatherCardComponent {
  @Input({ required: true }) weather!: WeatherResponse;
  @Input() condition: WeatherConditionInfo | null = null;
  @Input() location: GeocodingResult | null = null;

  store = inject(WeatherStore);
  langService = inject(LanguageService);

  get isEs(): boolean {
    return this.langService.isEs();
  }

  get localTimeFormated(): string {
    if (!this.weather?.current?.time) return '';
    const date = new Date(this.weather.current.time);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  get maxTempToday(): number | null {
    if (!this.weather?.daily?.temperature_2m_max?.[0]) return null;
    return Math.round(this.weather.daily.temperature_2m_max[0]);
  }

  get minTempToday(): number | null {
    if (!this.weather?.daily?.temperature_2m_min?.[0]) return null;
    return Math.round(this.weather.daily.temperature_2m_min[0]);
  }

  get uvIndex(): number {
    return Math.round(this.weather?.daily?.uv_index_max?.[0] ?? 0);
  }

  get uvLevel(): { text: string; class: string } {
    const uv = this.uvIndex;
    const isEs = this.isEs;
    if (uv <= 2) return { text: isEs ? 'Bajo' : 'Low', class: 'uv-low' };
    if (uv <= 5) return { text: isEs ? 'Moderado' : 'Moderate', class: 'uv-mod' };
    if (uv <= 7) return { text: isEs ? 'Alto' : 'High', class: 'uv-high' };
    if (uv <= 10) return { text: isEs ? 'Muy Alto' : 'Very High', class: 'uv-very-high' };
    return { text: isEs ? 'Extremo' : 'Extreme', class: 'uv-extreme' };
  }

  get windCompass(): string {
    const deg = this.weather?.current?.wind_direction_10m ?? 0;
    const directions = this.isEs ? ['N', 'NE', 'E', 'SE', 'S', 'SO', 'O', 'NO'] : ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    return directions[Math.round(deg / 45) % 8];
  }

  get sunrise(): string {
    const timeStr = this.weather?.daily?.sunrise?.[0];
    if (!timeStr) return '--:--';
    return new Date(timeStr).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  get sunset(): string {
    const timeStr = this.weather?.daily?.sunset?.[0];
    if (!timeStr) return '--:--';
    return new Date(timeStr).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  toggleFav() {
    if (this.location) {
      this.store.toggleFavorite(this.location);
    }
  }
}

