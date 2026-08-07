import { Component, inject, signal, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GeocodingService } from '../../../../core/services/geocoding.service';
import { GeocodingResult } from '../../../../core/models/geocoding.model';
import { WeatherStore } from '../../../../core/state/weather.store';
import { Subject, debounceTime, distinctUntilChanged, switchMap, of, catchError } from 'rxjs';

import { LanguageService } from '../../../../core/services/language.service';

@Component({
  selector: 'app-location-search',
  imports: [CommonModule, FormsModule],
  templateUrl: './location-search.component.html',
  styleUrl: './location-search.component.scss'
})
export class LocationSearchComponent {
  private geocodingService = inject(GeocodingService);
  store = inject(WeatherStore);
  langService = inject(LanguageService);

  @Input() mode: 'primary' | 'secondary' = 'primary';

  get isEs(): boolean {
    return this.langService.isEs();
  }

  searchQuery = signal('');
  results = signal<GeocodingResult[]>([]);
  isSearching = signal(false);
  isDropdownOpen = signal(false);

  private searchSubject = new Subject<string>();

  constructor() {
    this.searchSubject.pipe(
      debounceTime(250),
      distinctUntilChanged(),
      switchMap(query => {
        if (!query.trim()) {
          this.results.set([]);
          this.isSearching.set(false);
          return of({ results: [] });
        }
        this.isSearching.set(true);
        return this.geocodingService.searchLocations(query).pipe(
          catchError(() => of({ results: [] }))
        );
      })
    ).subscribe(response => {
      this.results.set(response.results || []);
      this.isSearching.set(false);
      this.isDropdownOpen.set(true);
    });
  }

  onSearchChange(query: string) {
    this.searchQuery.set(query);
    this.searchSubject.next(query);
  }

  selectLocation(loc: GeocodingResult) {
    if (this.mode === 'primary') {
      this.store.setLocation(loc);
    } else {
      this.store.setSecondaryLocation(loc);
    }
    this.isDropdownOpen.set(false);
    this.searchQuery.set('');
  }

  isFav(loc: GeocodingResult): boolean {
    return this.store.favorites().some(f => f.name.toLowerCase() === loc.name.toLowerCase());
  }

  toggleFav(loc: GeocodingResult, event: Event) {
    event.stopPropagation();
    event.preventDefault();
    this.store.toggleFavorite(loc);
  }

  removeFav(loc: GeocodingResult, event: Event) {
    event.stopPropagation();
    event.preventDefault();
    this.store.toggleFavorite(loc);
  }

  clearSearch() {
    this.searchQuery.set('');
    this.results.set([]);
    this.isDropdownOpen.set(false);
  }

  closeDropdown() {
    setTimeout(() => this.isDropdownOpen.set(false), 200);
  }
}


