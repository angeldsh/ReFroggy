import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-weather-icon',
  imports: [],
  template: `
    <div class="icon-container" [class]="size">
      <span class="emoji">{{ getEmoji(icon) }}</span>
    </div>
  `,
  styles: [`
    .icon-container {
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .emoji { font-family: "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif; }
    .small .emoji { font-size: 1.5rem; }
    .medium .emoji { font-size: 3rem; }
    .large .emoji { font-size: 6rem; line-height: 1; }
  `]
})
export class WeatherIconComponent {
  @Input({ required: true }) icon!: string;
  @Input() size: 'small' | 'medium' | 'large' = 'medium';

  getEmoji(icon: string): string {
    const map: Record<string, string> = {
      'sun': '☀️',
      'moon': '🌙',
      'cloud-sun': '⛅',
      'cloud-moon': '☁️',
      'fog': '🌫️',
      'drizzle': '🌧️',
      'rain': '🌧️',
      'snow': '❄️',
      'showers': '🌦️',
      'snow-showers': '🌨️',
      'storm': '⛈️',
      'unknown': '❓'
    };
    return map[icon] || '☀️';
  }
}
