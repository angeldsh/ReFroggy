import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of, tap } from 'rxjs';
import { GeocodingResponse } from '../models/geocoding.model';

@Injectable({
  providedIn: 'root'
})
export class GeocodingService {
  private http = inject(HttpClient);
  private readonly baseUrl = 'https://geocoding-api.open-meteo.com/v1/search';
  private searchCache = new Map<string, GeocodingResponse>();

  searchLocations(query: string, count: number = 5): Observable<GeocodingResponse> {
    const cleanQuery = query.trim().toLowerCase();
    if (this.searchCache.has(cleanQuery)) {
      return of(this.searchCache.get(cleanQuery)!);
    }

    const params = new HttpParams()
      .set('name', query)
      .set('count', count.toString())
      .set('language', 'en')
      .set('format', 'json');

    return this.http.get<GeocodingResponse>(this.baseUrl, { params }).pipe(
      tap(response => {
        if (response && response.results) {
          this.searchCache.set(cleanQuery, response);
        }
      })
    );
  }
}

