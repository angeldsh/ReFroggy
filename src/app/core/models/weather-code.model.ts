export type WeatherCategory = 'clear' | 'cloudy' | 'rain' | 'storm' | 'snow' | 'fog';

export interface WeatherConditionInfo {
  code: number;
  description: string;
  icon: string;
  category: WeatherCategory;
}
