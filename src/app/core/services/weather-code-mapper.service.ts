import { Injectable } from '@angular/core';
import { WeatherConditionInfo, WeatherCategory } from '../models/weather-code.model';

@Injectable({
  providedIn: 'root'
})
export class WeatherCodeMapperService {
  
  getWeatherInfo(code: number, isDay: boolean | number = 1): WeatherConditionInfo {
    const isDayBool = isDay === 1 || isDay === true;
    
    switch (code) {
      case 0:
        return { code, description: 'Despejado', icon: isDayBool ? 'sun' : 'moon', category: 'clear' };
      case 1:
      case 2:
      case 3:
        return { code, description: 'Nublado', icon: isDayBool ? 'cloud-sun' : 'cloud-moon', category: 'cloudy' };
      case 45:
      case 48:
        return { code, description: 'Niebla', icon: 'fog', category: 'fog' };
      case 51:
      case 53:
      case 55:
      case 56:
      case 57:
        return { code, description: 'Llovizna', icon: 'drizzle', category: 'rain' };
      case 61:
      case 63:
      case 65:
      case 66:
      case 67:
        return { code, description: 'Lluvia', icon: 'rain', category: 'rain' };
      case 71:
      case 73:
      case 75:
      case 77:
        return { code, description: 'Nieve', icon: 'snow', category: 'snow' };
      case 80:
      case 81:
      case 82:
        return { code, description: 'Chubascos', icon: 'showers', category: 'rain' };
      case 85:
      case 86:
        return { code, description: 'Chubascos de nieve', icon: 'snow-showers', category: 'snow' };
      case 95:
      case 96:
      case 99:
        return { code, description: 'Tormenta', icon: 'storm', category: 'storm' };
      default:
        return { code, description: 'Desconocido', icon: 'unknown', category: 'clear' };
    }
  }
}
