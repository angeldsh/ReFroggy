import { Injectable, inject } from '@angular/core';
import { WeatherConditionInfo } from '../models/weather-code.model';
import { LanguageService } from './language.service';

@Injectable({
  providedIn: 'root'
})
export class WeatherCodeMapperService {
  private langService = inject(LanguageService);
  
  getWeatherInfo(code: number, isDay: boolean | number = 1): WeatherConditionInfo {
    const isDayBool = isDay === 1 || isDay === true;
    const isEs = this.langService.isEs();
    
    switch (code) {
      case 0:
        return { 
          code, 
          description: isEs ? (isDayBool ? 'Despejado' : 'Noche Despejada') : (isDayBool ? 'Clear Sky' : 'Clear Night'), 
          icon: isDayBool ? 'sun' : 'moon', 
          category: 'clear' 
        };
      case 1:
        return { code, description: isEs ? 'Mayormente Despejado' : 'Mainly Clear', icon: isDayBool ? 'cloud-sun' : 'cloud-moon', category: 'cloudy' };
      case 2:
        return { code, description: isEs ? 'Parcialmente Nublado' : 'Partly Cloudy', icon: isDayBool ? 'cloud-sun' : 'cloud-moon', category: 'cloudy' };
      case 3:
        return { code, description: isEs ? 'Cubierto' : 'Overcast', icon: isDayBool ? 'cloud-sun' : 'cloud-moon', category: 'cloudy' };
      case 45:
      case 48:
        return { code, description: isEs ? 'Niebla' : 'Foggy', icon: 'fog', category: 'fog' };
      case 51:
      case 53:
      case 55:
      case 56:
      case 57:
        return { code, description: isEs ? 'Llovizna' : 'Drizzle', icon: 'drizzle', category: 'rain' };
      case 61:
      case 63:
      case 65:
      case 66:
      case 67:
        return { code, description: isEs ? 'Lluvia' : 'Rainy', icon: 'rain', category: 'rain' };
      case 71:
      case 73:
      case 75:
      case 77:
        return { code, description: isEs ? 'Nieve' : 'Snowy', icon: 'snow', category: 'snow' };
      case 80:
      case 81:
      case 82:
        return { code, description: isEs ? 'Chubascos' : 'Showers', icon: 'showers', category: 'rain' };
      case 85:
      case 86:
        return { code, description: isEs ? 'Chubascos de nieve' : 'Snow Showers', icon: 'snow-showers', category: 'snow' };
      case 95:
      case 96:
      case 99:
        return { code, description: isEs ? 'Tormenta' : 'Thunderstorm', icon: 'storm', category: 'storm' };
      default:
        return { code, description: isEs ? 'Desconocido' : 'Unknown', icon: 'unknown', category: 'clear' };
    }
  }
}
