import { Component, inject, effect, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { WeatherStore } from '../../../core/state/weather.store';

@Component({
  selector: 'app-app-shell',
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app-shell.component.html',
  styleUrl: './app-shell.component.scss'
})
export class AppShellComponent {
  store = inject(WeatherStore);

  bgFront = signal<string>('images/frog_sunny.png');
  bgBack = signal<string>('images/frog_sunny.png');
  isCrossFading = signal<boolean>(false);
  activeWeatherCategory = signal<string>('clear');
  isNight = signal<boolean>(false);

  constructor() {
    effect(() => {
      const condition = this.store.currentCondition();
      const isDay = this.store.weather()?.current?.is_day === 1;
      
      let category = condition?.category || 'clear';
      this.activeWeatherCategory.set(category);
      this.isNight.set(!isDay);

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

      const fullPath = `images/${bgImage}`;
      if (fullPath !== this.bgFront()) {
        this.bgBack.set(this.bgFront());
        this.bgFront.set(fullPath);
        this.isCrossFading.set(true);
        setTimeout(() => this.isCrossFading.set(false), 800);
      }
    });
  }
}

