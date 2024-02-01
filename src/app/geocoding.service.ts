import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GeocodingService {
  constructor(private http: HttpClient) {}

  geocodeAddresses(addresses: string[]): Observable<any[]> {
    const requests = addresses.map(address => 
      this.http.get<any[]>(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`)
        .pipe(
          map((results: any[]) => {
            // Ensure results are not empty and have the expected structure
            if (results.length > 0 && results[0].lat && results[0].lon) {
              return { lat: +results[0].lat, lng: +results[0].lon };
            }
            return null;
          })
        )
    );
    return forkJoin(requests); // Execute all HTTP requests concurrently and return an array of results
  }
}
