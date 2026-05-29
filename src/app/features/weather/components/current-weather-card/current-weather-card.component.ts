import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherResponse } from '../../../../core/models/weather.model';
import { WeatherConditionInfo } from '../../../../core/models/weather-code.model';
import { GeocodingResult } from '../../../../core/models/geocoding.model';
import { WeatherIconComponent } from '../../../../shared/components/weather-icon/weather-icon.component';

@Component({
  selector: 'app-current-weather-card',
  imports: [CommonModule, WeatherIconComponent],
  templateUrl: './current-weather-card.component.html',
  styleUrl: './current-weather-card.component.scss'
})
export class CurrentWeatherCardComponent {
  @Input({ required: true }) weather!: WeatherResponse;
  @Input() condition!: WeatherConditionInfo | null;
  @Input() location!: GeocodingResult | null;
}
