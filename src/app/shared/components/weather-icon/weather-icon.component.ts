import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-weather-icon',
  imports: [CommonModule],
  template: `
    <div class="icon-container" [ngClass]="size">
      @switch (normalizedIcon) {
        @case ('sun') {
          <svg viewBox="0 0 64 64" class="weather-svg sun-svg">
            <defs>
              <radialGradient id="sunGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stop-color="#FFF066"/>
                <stop offset="60%" stop-color="#FFB300"/>
                <stop offset="100%" stop-color="#FF8F00"/>
              </radialGradient>
            </defs>
            <g class="sun-rays">
              <line x1="32" y1="4" x2="32" y2="10" stroke="#FFB300" stroke-width="4" stroke-linecap="round"/>
              <line x1="32" y1="54" x2="32" y2="60" stroke="#FFB300" stroke-width="4" stroke-linecap="round"/>
              <line x1="4" y1="32" x2="10" y2="32" stroke="#FFB300" stroke-width="4" stroke-linecap="round"/>
              <line x1="54" y1="32" x2="60" y2="32" stroke="#FFB300" stroke-width="4" stroke-linecap="round"/>
              <line x1="12" y1="12" x2="16" y2="16" stroke="#FFB300" stroke-width="4" stroke-linecap="round"/>
              <line x1="48" y1="48" x2="52" y2="52" stroke="#FFB300" stroke-width="4" stroke-linecap="round"/>
              <line x1="52" y1="12" x2="48" y2="16" stroke="#FFB300" stroke-width="4" stroke-linecap="round"/>
              <line x1="16" y1="48" x2="12" y2="52" stroke="#FFB300" stroke-width="4" stroke-linecap="round"/>
            </g>
            <circle cx="32" cy="32" r="16" fill="url(#sunGlow)" class="sun-core"/>
          </svg>
        }
        @case ('moon') {
          <svg viewBox="0 0 64 64" class="weather-svg moon-svg">
            <defs>
              <linearGradient id="moonGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#FFFFFF"/>
                <stop offset="60%" stop-color="#E2E8F0"/>
                <stop offset="100%" stop-color="#94A3B8"/>
              </linearGradient>
            </defs>
            <path d="M38 10C26.95 10 18 18.95 18 30C18 41.05 26.95 50 38 50C41.8 50 45.3 48.9 48.3 47C40.1 44.9 34 39.5 34 28.5C34 19.5 40.1 12.1 48.3 10C45.3 8.1 41.8 10 38 10Z" fill="url(#moonGrad)" class="moon-body"/>
            <circle cx="14" cy="18" r="2" fill="#E2E8F0" class="star star-1"/>
            <circle cx="54" cy="24" r="1.5" fill="#E2E8F0" class="star star-2"/>
            <circle cx="48" cy="42" r="2" fill="#E2E8F0" class="star star-3"/>
          </svg>
        }
        @case ('cloud-sun') {
          <svg viewBox="0 0 64 64" class="weather-svg cloud-sun-svg">
            <g class="sun-behind">
              <circle cx="24" cy="24" r="12" fill="#FFB300"/>
              <line x1="24" y1="4" x2="24" y2="8" stroke="#FFB300" stroke-width="3" stroke-linecap="round"/>
              <line x1="10" y1="24" x2="14" y2="24" stroke="#FFB300" stroke-width="3" stroke-linecap="round"/>
              <line x1="14" y1="14" x2="17" y2="17" stroke="#FFB300" stroke-width="3" stroke-linecap="round"/>
              <line x1="34" y1="14" x2="31" y2="17" stroke="#FFB300" stroke-width="3" stroke-linecap="round"/>
            </g>
            <path d="M46 50H20C13.37 50 8 44.63 8 38C8 31.78 12.72 26.68 18.88 26.07C20.67 19.12 26.96 14 34.5 14C43.06 14 50 20.94 50 29.5C50 30.17 49.95 30.84 49.86 31.5C54.45 32.74 57.8 36.98 57.8 42C57.8 46.42 52.53 50 46 50Z" fill="url(#cloudGrad)" class="cloud-front"/>
          </svg>
        }
        @case ('cloud-moon') {
          <svg viewBox="0 0 64 64" class="weather-svg cloud-moon-svg">
            <defs>
              <linearGradient id="moonGradSmall" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#FFFFFF"/>
                <stop offset="100%" stop-color="#CBD5E1"/>
              </linearGradient>
            </defs>
            <path d="M28 6C19.7 6 13 12.7 13 21C13 29.3 19.7 36 28 36C30.8 36 33.5 35.2 35.7 33.7C29.6 32.2 25 26.6 25 19.8C25 13 29.6 7.4 35.7 5.9C33.5 4.5 30.8 6 28 6Z" fill="url(#moonGradSmall)" class="moon-behind"/>
            <path d="M46 50H20C13.37 50 8 44.63 8 38C8 31.78 12.72 26.68 18.88 26.07C20.67 19.12 26.96 14 34.5 14C43.06 14 50 20.94 50 29.5C50 30.17 49.95 30.84 49.86 31.5C54.45 32.74 57.8 36.98 57.8 42C57.8 46.42 52.53 50 46 50Z" fill="url(#cloudGradNight)" class="cloud-front"/>
          </svg>
        }
        @case ('rain') {
          <svg viewBox="0 0 64 64" class="weather-svg rain-svg">
            <path d="M46 42H20C13.37 42 8 36.63 8 30C8 23.78 12.72 18.68 18.88 18.07C20.67 11.12 26.96 6 34.5 6C43.06 6 50 12.94 50 21.5C54.45 24.74 57.8 28.98 57.8 34C57.8 38.42 52.53 42 46 42Z" fill="url(#cloudRainGrad)"/>
            <g class="rain-drops">
              <line x1="20" y1="46" x2="16" y2="56" stroke="#38BDF8" stroke-width="3" stroke-linecap="round" class="drop drop-1"/>
              <line x1="32" y1="46" x2="28" y2="58" stroke="#38BDF8" stroke-width="3" stroke-linecap="round" class="drop drop-2"/>
              <line x1="44" y1="46" x2="40" y2="56" stroke="#38BDF8" stroke-width="3" stroke-linecap="round" class="drop drop-3"/>
            </g>
          </svg>
        }
        @case ('drizzle') {
          <svg viewBox="0 0 64 64" class="weather-svg drizzle-svg">
            <path d="M46 42H20C13.37 42 8 36.63 8 30C8 23.78 12.72 18.68 18.88 18.07C20.67 11.12 26.96 6 34.5 6C43.06 6 50 12.94 50 21.5C54.45 24.74 57.8 28.98 57.8 34C57.8 38.42 52.53 42 46 42Z" fill="url(#cloudRainGrad)"/>
            <g class="drizzle-drops">
              <circle cx="20" cy="50" r="2" fill="#7DD3FC" class="drop drop-1"/>
              <circle cx="32" cy="54" r="2" fill="#7DD3FC" class="drop drop-2"/>
              <circle cx="44" cy="48" r="2" fill="#7DD3FC" class="drop drop-3"/>
            </g>
          </svg>
        }
        @case ('showers') {
          <svg viewBox="0 0 64 64" class="weather-svg showers-svg">
            <g class="sun-behind-rain">
              <circle cx="20" cy="20" r="10" fill="#FFB300"/>
            </g>
            <path d="M46 42H20C13.37 42 8 36.63 8 30C8 23.78 12.72 18.68 18.88 18.07C20.67 11.12 26.96 6 34.5 6C43.06 6 50 12.94 50 21.5C54.45 24.74 57.8 28.98 57.8 34C57.8 38.42 52.53 42 46 42Z" fill="url(#cloudGrad)"/>
            <g class="rain-drops">
              <line x1="22" y1="46" x2="18" y2="56" stroke="#38BDF8" stroke-width="3" stroke-linecap="round" class="drop drop-1"/>
              <line x1="36" y1="46" x2="32" y2="58" stroke="#38BDF8" stroke-width="3" stroke-linecap="round" class="drop drop-2"/>
            </g>
          </svg>
        }
        @case ('storm') {
          <svg viewBox="0 0 64 64" class="weather-svg storm-svg">
            <path d="M46 38H20C13.37 38 8 32.63 8 26C8 19.78 12.72 14.68 18.88 14.07C20.67 7.12 26.96 2 34.5 2C43.06 2 50 8.94 50 17.5C54.45 20.74 57.8 24.98 57.8 30C57.8 34.42 52.53 38 46 38Z" fill="#334155"/>
            <polygon points="30,36 22,48 30,48 26,62 42,44 32,44" fill="#FACC15" class="lightning-bolt"/>
          </svg>
        }
        @case ('snow') {
          <svg viewBox="0 0 64 64" class="weather-svg snow-svg">
            <path d="M46 42H20C13.37 42 8 36.63 8 30C8 23.78 12.72 18.68 18.88 18.07C20.67 11.12 26.96 6 34.5 6C43.06 6 50 12.94 50 21.5C54.45 24.74 57.8 28.98 57.8 34C57.8 38.42 52.53 42 46 42Z" fill="url(#cloudSnowGrad)"/>
            <g class="snow-flakes">
              <text x="18" y="56" fill="#E0F2FE" font-size="12" class="flake flake-1">❄</text>
              <text x="30" y="58" fill="#E0F2FE" font-size="14" class="flake flake-2">❄</text>
              <text x="42" y="54" fill="#E0F2FE" font-size="12" class="flake flake-3">❄</text>
            </g>
          </svg>
        }
        @case ('snow-showers') {
          <svg viewBox="0 0 64 64" class="weather-svg snow-svg">
            <path d="M46 42H20C13.37 42 8 36.63 8 30C8 23.78 12.72 18.68 18.88 18.07C20.67 11.12 26.96 6 34.5 6C43.06 6 50 12.94 50 21.5C54.45 24.74 57.8 28.98 57.8 34C57.8 38.42 52.53 42 46 42Z" fill="url(#cloudSnowGrad)"/>
            <g class="snow-flakes">
              <text x="20" y="56" fill="#E0F2FE" font-size="14" class="flake flake-1">❄</text>
              <text x="36" y="56" fill="#E0F2FE" font-size="14" class="flake flake-2">❄</text>
            </g>
          </svg>
        }
        @case ('fog') {
          <svg viewBox="0 0 64 64" class="weather-svg fog-svg">
            <line x1="12" y1="20" x2="52" y2="20" stroke="#CBD5E1" stroke-width="4" stroke-linecap="round" class="fog-line line-1"/>
            <line x1="8" y1="32" x2="56" y2="32" stroke="#E2E8F0" stroke-width="5" stroke-linecap="round" class="fog-line line-2"/>
            <line x1="16" y1="44" x2="48" y2="44" stroke="#CBD5E1" stroke-width="4" stroke-linecap="round" class="fog-line line-3"/>
          </svg>
        }
        @default {
          <svg viewBox="0 0 64 64" class="weather-svg cloud-svg">
            <path d="M46 46H20C13.37 46 8 40.63 8 34C8 27.78 12.72 22.68 18.88 22.07C20.67 15.12 26.96 10 34.5 10C43.06 10 50 16.94 50 25.5C54.45 28.74 57.8 32.98 57.8 38C57.8 42.42 52.53 46 46 46Z" fill="url(#cloudGrad)"/>
          </svg>
        }
      }
      
      <!-- Shared Gradient Definitions -->
      <svg width="0" height="0" style="position:absolute;">
        <defs>
          <linearGradient id="cloudGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#FFFFFF"/>
            <stop offset="100%" stop-color="#CBD5E1"/>
          </linearGradient>
          <linearGradient id="cloudGradNight" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#94A3B8"/>
            <stop offset="100%" stop-color="#475569"/>
          </linearGradient>
          <linearGradient id="cloudRainGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#94A3B8"/>
            <stop offset="100%" stop-color="#334155"/>
          </linearGradient>
          <linearGradient id="cloudSnowGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#E2E8F0"/>
            <stop offset="100%" stop-color="#94A3B8"/>
          </linearGradient>
        </defs>
      </svg>
    </div>
  `,
  styles: [`
    .icon-container {
      display: inline-flex;
      justify-content: center;
      align-items: center;
      line-height: 0;
    }
    
    .small { width: 32px; height: 32px; }
    .medium { width: 64px; height: 64px; }
    .large { width: 110px; height: 110px; }

    .weather-svg {
      width: 100%;
      height: 100%;
      overflow: visible;
      filter: drop-shadow(0 4px 12px rgba(0, 0, 0, 0.15));
    }

    /* Keyframe Animations */
    .sun-rays {
      transform-origin: 32px 32px;
      animation: rotateRays 20s linear infinite;
    }

    .sun-core {
      animation: pulseSun 3s ease-in-out infinite alternate;
    }

    .star-1 { animation: blinkStar 2s ease-in-out infinite; }
    .star-2 { animation: blinkStar 2.8s ease-in-out infinite 0.5s; }
    .star-3 { animation: blinkStar 2.2s ease-in-out infinite 1s; }

    .drop-1 { animation: fallDrop 1.2s ease-in infinite; }
    .drop-2 { animation: fallDrop 1.2s ease-in infinite 0.4s; }
    .drop-3 { animation: fallDrop 1.2s ease-in infinite 0.8s; }

    .flake-1 { animation: swaySnow 2.5s ease-in-out infinite; }
    .flake-2 { animation: swaySnow 3s ease-in-out infinite 0.6s; }
    .flake-3 { animation: swaySnow 2.2s ease-in-out infinite 1.2s; }

    .fog-line { animation: driftFog 4s ease-in-out infinite alternate; }
    .line-2 { animation-delay: 1s; }

    .lightning-bolt { animation: flashLightning 2.5s ease-in-out infinite; }

    @keyframes rotateRays {
      to { transform: rotate(360deg); }
    }

    @keyframes pulseSun {
      from { transform: scale(1); }
      to { transform: scale(1.06); }
    }

    @keyframes blinkStar {
      0%, 100% { opacity: 0.3; transform: scale(0.8); }
      50% { opacity: 1; transform: scale(1.2); }
    }

    @keyframes fallDrop {
      0% { opacity: 0; transform: translateY(-6px); }
      50% { opacity: 1; }
      100% { opacity: 0; transform: translateY(10px); }
    }

    @keyframes swaySnow {
      0%, 100% { transform: translateY(0) translateX(0); }
      50% { transform: translateY(4px) translateX(3px); }
    }

    @keyframes driftFog {
      from { transform: translateX(-4px); }
      to { transform: translateX(4px); }
    }

    @keyframes flashLightning {
      0%, 90%, 100% { opacity: 1; }
      92%, 96% { opacity: 0.2; }
    }
  `]
})
export class WeatherIconComponent {
  @Input({ required: true }) icon!: string;
  @Input() size: 'small' | 'medium' | 'large' = 'medium';

  get normalizedIcon(): string {
    return this.icon || 'unknown';
  }
}

