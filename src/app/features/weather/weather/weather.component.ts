import { Component, inject, effect, OnDestroy, Renderer2 } from '@angular/core';
import { DOCUMENT, CommonModule } from '@angular/common';
import { WeatherStore } from '../../../core/state/weather.store';
import { CurrentWeatherCardComponent } from '../components/current-weather-card/current-weather-card.component';
import { HourlyForecastComponent } from '../components/hourly-forecast/hourly-forecast.component';
import { DailyForecastComponent } from '../components/daily-forecast/daily-forecast.component';
import { LocationSearchComponent } from '../../search/components/location-search/location-search.component';
import { LoadingStateComponent } from '../../../shared/components/loading-state/loading-state.component';
import { ErrorStateComponent } from '../../../shared/components/error-state/error-state.component';
import { WeatherCodeMapperService } from '../../../core/services/weather-code-mapper.service';
import { WeatherIconComponent } from '../../../shared/components/weather-icon/weather-icon.component';

@Component({
  selector: 'app-weather',
  imports: [
    CommonModule,
    CurrentWeatherCardComponent,
    HourlyForecastComponent,
    DailyForecastComponent,
    LocationSearchComponent,
    LoadingStateComponent,
    ErrorStateComponent,
    WeatherIconComponent
  ],
  templateUrl: './weather.component.html',
  styleUrl: './weather.component.scss'
})
export class WeatherComponent implements OnDestroy {
  store = inject(WeatherStore);
  mapper = inject(WeatherCodeMapperService);
  private renderer = inject(Renderer2);
  private document = inject(DOCUMENT);
  private currentTheme = '';
  
  selectedTab: 'hoy' | '14dias' = 'hoy';

  constructor() {
    effect(() => {
      const condition = this.store.currentCondition();
      if (condition) {
        this.updateTheme(condition.category, this.store.weather()?.current.is_day === 1);
      }
    });
  }

  touchStartX = 0;
  touchEndX = 0;

  setTab(tab: 'hoy' | '14dias') {
    this.selectedTab = tab;
  }

  onTouchStart(event: TouchEvent) {
    this.touchStartX = event.changedTouches[0].screenX;
  }

  onTouchEnd(event: TouchEvent) {
    this.touchEndX = event.changedTouches[0].screenX;
    this.handleSwipe();
  }

  private handleSwipe() {
    const swipeThreshold = 50;
    const deltaX = this.touchEndX - this.touchStartX;

    if (deltaX > swipeThreshold) {
      // Deslizar hacia derecha (volver a la pestaña anterior)
      this.setTab('hoy');
    } else if (deltaX < -swipeThreshold) {
      // Deslizar hacia izquierda (avanzar a la siguiente pestaña)
      this.setTab('14dias');
    }
  }

  private updateTheme(category: string, isDay: boolean) {
    if (this.currentTheme) {
      this.renderer.removeClass(this.document.body, this.currentTheme);
    }
    
    let themeClass = `theme-${category}`;
    if (category === 'clear' || category === 'cloudy') {
      themeClass += isDay ? '-day' : '-night';
    }
    
    this.currentTheme = themeClass;
    this.renderer.addClass(this.document.body, this.currentTheme);
    
    // Set background image based on weather category and time of day
    let bgImage = 'frog_sunny.png';
    
    if (category === 'clear') {
      bgImage = isDay ? 'frog_sunny.png' : 'frog_night.png';
    } else if (category === 'cloudy') {
      bgImage = isDay ? 'frog_cloudy_day.png' : 'frog_cloudy_night.png';
    } else if (category === 'rain') {
      bgImage = isDay ? 'frog_rain.png' : 'frog_rainy_night.png';
    } else if (category === 'storm') {
      bgImage = 'frog_storm.png';
    } else if (category === 'snow') {
      bgImage = 'frog_snow.png';
    } else if (category === 'fog') {
      bgImage = 'frog_fog.png';
    } else {
      bgImage = isDay ? 'frog_sunny.png' : 'frog_night.png';
    }
    
    this.renderer.setStyle(this.document.body, 'background-image', `url('images/${bgImage}')`);
    this.renderer.setStyle(this.document.body, 'background-size', 'cover');
    this.renderer.setStyle(this.document.body, 'background-position', 'center');
    this.renderer.setStyle(this.document.body, 'background-attachment', 'fixed');
  }

  ngOnDestroy() {
    if (this.currentTheme) {
      this.renderer.removeClass(this.document.body, this.currentTheme);
    }
    this.renderer.removeStyle(this.document.body, 'background-image');
    this.renderer.removeStyle(this.document.body, 'background-size');
    this.renderer.removeStyle(this.document.body, 'background-position');
    this.renderer.removeStyle(this.document.body, 'background-attachment');
  }
}
