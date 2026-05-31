import { Component, Input, OnChanges, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HourlyWeather } from '../../../../core/models/weather.model';
import { WeatherIconComponent } from '../../../../shared/components/weather-icon/weather-icon.component';
import { WeatherCodeMapperService } from '../../../../core/services/weather-code-mapper.service';

interface HourlyData {
  time: string;
  temp: number;
  icon: string;
}

@Component({
  selector: 'app-hourly-forecast',
  imports: [CommonModule, WeatherIconComponent],
  templateUrl: './hourly-forecast.component.html',
  styleUrl: './hourly-forecast.component.scss'
})
export class HourlyForecastComponent implements OnChanges {
  @Input({ required: true }) hourly!: HourlyWeather;
  @Input() currentTime?: string; // e.g. "2026-05-31T21:30"
  
  mapper = inject(WeatherCodeMapperService);
  forecastData: HourlyData[] = [];

  ngOnChanges() {
    this.processData();
  }

  private processData() {
    if (!this.hourly) return;
    
    // Use the location's current time if available, otherwise fallback to local browser time
    const currentLocTimeStr = this.currentTime || new Date().toISOString();
    // Get the hour part (e.g. "2026-05-31T21")
    const currentHourPrefix = currentLocTimeStr.substring(0, 13);
    
    // find index matching the current hour of the location
    let startIndex = 0;
    for (let i = 0; i < this.hourly.time.length; i++) {
      if (this.hourly.time[i].startsWith(currentHourPrefix) || this.hourly.time[i] > currentLocTimeStr) {
        startIndex = i;
        break;
      }
    }
    
    // Get next 24 hours
    this.forecastData = [];
    for (let i = startIndex; i < Math.min(startIndex + 24, this.hourly.time.length); i++) {
      const date = new Date(this.hourly.time[i]);
      const hour = date.getHours();
      const isDay = hour >= 6 && hour <= 19; // simplified day/night
      const info = this.mapper.getWeatherInfo(this.hourly.weather_code[i], isDay);
      
      this.forecastData.push({
        time: i === startIndex ? 'Ahora' : date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        temp: Math.round(this.hourly.temperature_2m[i]),
        icon: info.icon
      });
    }
  }
}
