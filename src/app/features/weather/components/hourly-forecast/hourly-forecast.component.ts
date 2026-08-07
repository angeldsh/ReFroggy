import { Component, Input, OnChanges, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HourlyWeather } from '../../../../core/models/weather.model';
import { WeatherIconComponent } from '../../../../shared/components/weather-icon/weather-icon.component';
import { WeatherCodeMapperService } from '../../../../core/services/weather-code-mapper.service';
import { LanguageService } from '../../../../core/services/language.service';

interface HourlyData {
  time: string;
  temp: number;
  icon: string;
  pop: number;
  isNow: boolean;
}

@Component({
  selector: 'app-hourly-forecast',
  imports: [CommonModule, WeatherIconComponent],
  templateUrl: './hourly-forecast.component.html',
  styleUrl: './hourly-forecast.component.scss'
})
export class HourlyForecastComponent implements OnChanges {
  @Input({ required: true }) hourly!: HourlyWeather;
  @Input() currentTime?: string;
  
  mapper = inject(WeatherCodeMapperService);
  langService = inject(LanguageService);
  forecastData: HourlyData[] = [];

  get isEs(): boolean {
    return this.langService.isEs();
  }

  ngOnChanges() {
    this.processData();
  }

  private processData() {
    if (!this.hourly) return;
    
    const currentLocTimeStr = this.currentTime || new Date().toISOString();
    const currentHourPrefix = currentLocTimeStr.substring(0, 13);
    const isEs = this.isEs;
    
    let startIndex = 0;
    for (let i = 0; i < this.hourly.time.length; i++) {
      if (this.hourly.time[i].startsWith(currentHourPrefix) || this.hourly.time[i] > currentLocTimeStr) {
        startIndex = i;
        break;
      }
    }
    
    this.forecastData = [];
    for (let i = startIndex; i < Math.min(startIndex + 24, this.hourly.time.length); i++) {
      const date = new Date(this.hourly.time[i]);
      const hour = date.getHours();
      const isDay = hour >= 6 && hour <= 19;
      const info = this.mapper.getWeatherInfo(this.hourly.weather_code[i], isDay);
      const pop = this.hourly.precipitation_probability?.[i] ?? 0;
      const isNow = i === startIndex;
      
      this.forecastData.push({
        time: isNow ? (isEs ? 'Ahora' : 'Now') : date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        temp: Math.round(this.hourly.temperature_2m[i]),
        icon: info.icon,
        pop,
        isNow
      });
    }
  }
}

