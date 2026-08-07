import { Component, Input, OnChanges, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DailyWeather, HourlyWeather } from '../../../../core/models/weather.model';
import { WeatherIconComponent } from '../../../../shared/components/weather-icon/weather-icon.component';
import { WeatherCodeMapperService } from '../../../../core/services/weather-code-mapper.service';
import { LanguageService } from '../../../../core/services/language.service';

interface HourlyData {
  time: string;
  temp: number;
  icon: string;
  pop: number;
}

interface DailyData {
  dayName: string;
  fullDate: string;
  max: number;
  min: number;
  icon: string;
  pop: number;
  hourly: HourlyData[];
  leftPercent: number;
  widthPercent: number;
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
  langService = inject(LanguageService);
  forecastData: DailyData[] = [];
  expandedDate: string | null = null;

  get isEs(): boolean {
    return this.langService.isEs();
  }

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
    
    const isEs = this.isEs;
    const hourlyByDay = new Map<string, HourlyData[]>();
    for (let i = 0; i < this.hourly.time.length; i++) {
      const dateTimeStr = this.hourly.time[i];
      const dateStr = dateTimeStr.substring(0, 10);
      const date = new Date(dateTimeStr);
      
      const hour = date.getHours();
      const isDay = hour >= 6 && hour <= 19;
      const info = this.mapper.getWeatherInfo(this.hourly.weather_code[i], isDay);
      const pop = this.hourly.precipitation_probability?.[i] ?? 0;
      
      if (!hourlyByDay.has(dateStr)) {
        hourlyByDay.set(dateStr, []);
      }
      
      hourlyByDay.get(dateStr)!.push({
        time: date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        temp: Math.round(this.hourly.temperature_2m[i]),
        icon: info.icon,
        pop
      });
    }

    let overallMin = Infinity;
    let overallMax = -Infinity;

    for (let i = 0; i < this.daily.time.length; i++) {
      const min = Math.round(this.daily.temperature_2m_min[i]);
      const max = Math.round(this.daily.temperature_2m_max[i]);
      if (min < overallMin) overallMin = min;
      if (max > overallMax) overallMax = max;
    }

    const range = Math.max(overallMax - overallMin, 1);
    
    this.forecastData = [];
    for (let i = 0; i < this.daily.time.length; i++) {
      const dateStr = this.daily.time[i].substring(0, 10);
      const date = new Date(this.daily.time[i]);
      const info = this.mapper.getWeatherInfo(this.daily.weather_code[i], 1);
      const pop = this.daily.precipitation_probability_max?.[i] ?? 0;
      
      const todayLabel = isEs ? 'Hoy' : 'Today';
      const tomorrowLabel = isEs ? 'Mañana' : 'Tomorrow';
      const dayName = i === 0 ? todayLabel : i === 1 ? tomorrowLabel : date.toLocaleDateString(isEs ? 'es-ES' : 'en-US', { weekday: 'short' });
      const min = Math.round(this.daily.temperature_2m_min[i]);
      const max = Math.round(this.daily.temperature_2m_max[i]);

      const leftPercent = Math.max(0, Math.min(100, ((min - overallMin) / range) * 100));
      const rightPercent = Math.max(0, Math.min(100, ((max - overallMin) / range) * 100));
      const widthPercent = Math.max(8, rightPercent - leftPercent);

      this.forecastData.push({
        dayName: dayName,
        fullDate: dateStr,
        max,
        min,
        icon: info.icon,
        pop,
        hourly: hourlyByDay.get(dateStr) || [],
        leftPercent,
        widthPercent
      });
    }
  }
}

