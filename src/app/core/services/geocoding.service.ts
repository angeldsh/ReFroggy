import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GeocodingResponse } from '../models/geocoding.model';

@Injectable({
  providedIn: 'root'
})
export class GeocodingService {
  private http = inject(HttpClient);
  private readonly baseUrl = 'https://geocoding-api.open-meteo.com/v1/search';

  searchLocations(query: string, count: number = 5): Observable<GeocodingResponse> {
    const params = new HttpParams()
      .set('name', query)
      .set('count', count.toString())
      .set('language', 'es')
      .set('format', 'json');

    return this.http.get<GeocodingResponse>(this.baseUrl, { params });
  }
}
