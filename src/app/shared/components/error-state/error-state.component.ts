import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-error-state',
  template: `
    <div class="error-state glass-panel">
      <span class="emoji">⚠️</span>
      <h3>¡Ups! Hubo un problema</h3>
      <p>{{ error?.message || 'No pudimos cargar la información del tiempo.' }}</p>
    </div>
  `,
  styles: [`
    .error-state {
      text-align: center;
      padding: 40px;
      margin-top: 20px;
      .emoji { font-size: 3rem; margin-bottom: 16px; display: block; }
      h3 { margin-bottom: 8px; }
      p { opacity: 0.8; }
    }
  `]
})
export class ErrorStateComponent {
  @Input() error: any;
}
