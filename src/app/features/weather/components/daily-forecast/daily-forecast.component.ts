import { Component, Input, OnChanges, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DailyWeather, HourlyWeather } from '../../../../core/models/weather.model';
import { WeatherIconComponent } from '../../../../shared/components/weather-icon/weather-icon.component';
import { WeatherCodeMapperService } from '../../../../core/services/weather-code-mapper.service';

interface HourlyData {
  time: string;
  temp: number;
  icon: string;
}

interface DailyData {
  dayName: string;
  fullDate: string;
  max: number;
  min: number;
  icon: string;
  hourly: HourlyData[];
}

@Component({
  selector: 'app-daily-forecast',
  imports: [CommonModule, WeatherIconComponent],
  templateUrl: './daily-forecast.component.html',
  styleUrl: './daily-forecast.component.scss'
})
export class DailyForecastComponent implements OnChanges {
  @Input({ required: true }) daily!: DailyWeather;
  @Input({ required: true }) hourly!: HourlyWeather;
  
  mapper = inject(WeatherCodeMapperService);
  forecastData: DailyData[] = [];
  expandedDate: string | null = null;

  ngOnChanges() {
    this.processData();
  }

  toggle(date: string) {
    if (this.expandedDate === date) {
      this.expandedDate = null;
    } else {
      this.expandedDate = date;
    }
  }

  private processData() {
    if (!this.daily || !this.hourly) return;
    
    const hourlyByDay = new Map<string, HourlyData[]>();
    for (let i = 0; i < this.hourly.time.length; i++) {
      const dateTimeStr = this.hourly.time[i];
      const dateStr = dateTimeStr.substring(0, 10);
      const date = new Date(dateTimeStr);
      
      const hour = date.getHours();
      const isDay = hour >= 6 && hour <= 19;
      const info = this.mapper.getWeatherInfo(this.hourly.weather_code[i], isDay);
      
      if (!hourlyByDay.has(dateStr)) {
        hourlyByDay.set(dateStr, []);
      }
      
      hourlyByDay.get(dateStr)!.push({
        time: date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        temp: Math.round(this.hourly.temperature_2m[i]),
        icon: info.icon
      });
    }
    
    this.forecastData = [];
    for (let i = 0; i < this.daily.time.length; i++) {
      const dateStr = this.daily.time[i].substring(0, 10);
      const date = new Date(this.daily.time[i]);
      const info = this.mapper.getWeatherInfo(this.daily.weather_code[i], 1);
      
      const dayName = i === 0 ? 'Hoy' : i === 1 ? 'Mañana' : date.toLocaleDateString('es-ES', { weekday: 'long' });
      
      this.forecastData.push({
        dayName: dayName,
        fullDate: dateStr,
        max: Math.round(this.daily.temperature_2m_max[i]),
        min: Math.round(this.daily.temperature_2m_min[i]),
        icon: info.icon,
        hourly: hourlyByDay.get(dateStr) || []
      });
    }
  }
}
