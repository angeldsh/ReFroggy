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

import { LanguageService } from '../../../core/services/language.service';

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
  langService = inject(LanguageService);
  private renderer = inject(Renderer2);
  private document = inject(DOCUMENT);
  private currentTheme = '';
  
  selectedTab: 'today' | '14days' = 'today';
  showSecondarySearch = false;
  isRefreshing = false;
  pullProgress = 0;

  get isEs(): boolean {
    return this.langService.isEs();
  }

  touchStartX = 0;
  touchEndX = 0;
  touchStartY = 0;
  touchEndY = 0;

  constructor() {
    effect(() => {
      const condition = this.store.currentCondition();
      if (condition) {
        this.updateTheme(condition.category, this.store.weather()?.current?.is_day === 1);
      }
    });
  }

  getConditionFor(weatherData: any) {
    if (!weatherData) return null;
    return this.mapper.getWeatherInfo(weatherData.current.weather_code, weatherData.current.is_day);
  }

  getLocalTimeFormated(weatherData: any): string {
    if (!weatherData?.current?.time) return '';
    const date = new Date(weatherData.current.time);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  setTab(tab: 'today' | '14days') {
    this.selectedTab = tab;
  }

  onRefresh() {
    this.isRefreshing = true;
    this.store.refreshWeather();
    setTimeout(() => {
      this.isRefreshing = false;
      this.pullProgress = 0;
    }, 800);
  }

  onTouchStart(event: TouchEvent) {
    this.touchStartX = event.changedTouches[0].screenX;
    this.touchStartY = event.changedTouches[0].screenY;
  }

  onTouchMove(event: TouchEvent) {
    const currentY = event.changedTouches[0].screenY;
    const deltaY = currentY - this.touchStartY;
    if (window.scrollY === 0 && deltaY > 0) {
      this.pullProgress = Math.min(100, Math.round(deltaY / 1.5));
    }
  }

  onTouchEnd(event: TouchEvent) {
    this.touchEndX = event.changedTouches[0].screenX;
    this.touchEndY = event.changedTouches[0].screenY;

    const deltaY = this.touchEndY - this.touchStartY;
    if (window.scrollY === 0 && deltaY > 80) {
      this.onRefresh();
    } else {
      this.pullProgress = 0;
      this.handleSwipe();
    }
  }

  private handleSwipe() {
    const swipeThreshold = 60;
    const deltaX = this.touchEndX - this.touchStartX;
    const deltaY = Math.abs(this.touchEndY - this.touchStartY);

    if (deltaY < 50) {
      if (deltaX > swipeThreshold) {
        this.setTab('today');
      } else if (deltaX < -swipeThreshold) {
        this.setTab('14days');
      }
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
  }

  ngOnDestroy() {
    if (this.currentTheme) {
      this.renderer.removeClass(this.document.body, this.currentTheme);
    }
  }
}

