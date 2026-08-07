import { Injectable, signal } from '@angular/core';

export type Language = 'es' | 'en';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  readonly lang = signal<Language>(this.detectLanguage());

  private detectLanguage(): Language {
    if (typeof navigator !== 'undefined' && navigator.language) {
      return navigator.language.toLowerCase().startsWith('es') ? 'es' : 'en';
    }
    return 'es';
  }

  isEs(): boolean {
    return this.lang() === 'es';
  }
}
