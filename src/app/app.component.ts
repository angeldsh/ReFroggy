import { Component, inject, OnInit } from '@angular/core';
import { AppShellComponent } from './shared/components/app-shell/app-shell.component';
import { WeatherStore } from './core/state/weather.store';

@Component({
  selector: 'app-root',
  imports: [AppShellComponent],
  template: `<app-app-shell></app-app-shell>`
})
export class AppComponent implements OnInit {
  private weatherStore = inject(WeatherStore);

  ngOnInit() {
    this.weatherStore.initLocation();
  }
}
