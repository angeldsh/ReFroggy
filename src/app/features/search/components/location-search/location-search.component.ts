import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GeocodingService } from '../../../../core/services/geocoding.service';
import { GeocodingResult } from '../../../../core/models/geocoding.model';
import { WeatherStore } from '../../../../core/state/weather.store';
import { Subject, debounceTime, distinctUntilChanged, switchMap, of, catchError } from 'rxjs';

@Component({
  selector: 'app-location-search',
  imports: [CommonModule, FormsModule],
  templateUrl: './location-search.component.html',
  styleUrl: './location-search.component.scss'
})
export class LocationSearchComponent {
  private geocodingService = inject(GeocodingService);
  private store = inject(WeatherStore);

  searchQuery = signal('');
  results = signal<GeocodingResult[]>([]);
  isSearching = signal(false);
  isDropdownOpen = signal(false);

  private searchSubject = new Subject<string>();

  constructor() {
    this.searchSubject.pipe(
      debounceTime(400),
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
    this.store.setLocation(loc);
    this.isDropdownOpen.set(false);
    this.searchQuery.set('');
  }

  closeDropdown() {
    setTimeout(() => this.isDropdownOpen.set(false), 200);
  }
}
