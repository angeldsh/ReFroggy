import { Component } from '@angular/core';

@Component({
  selector: 'app-loading-state',
  template: `
    <div class="loading-state">
      <div class="spinner"></div>
      <p>Cargando el tiempo...</p>
    </div>
  `,
  styles: [`
    .loading-state {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 40px;
      gap: 16px;
    }
    .spinner {
      width: 40px;
      height: 40px;
      border: 4px solid rgba(255,255,255,0.2);
      border-top-color: currentColor;
      border-radius: 50%;
      animation: spin 1s linear infinite;
    }
    @keyframes spin { to { transform: rotate(360deg); } }
  `]
})
export class LoadingStateComponent {}
