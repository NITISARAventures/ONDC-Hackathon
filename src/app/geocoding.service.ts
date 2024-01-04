import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GeocodingService {
  constructor() {}

  geocodeAddresses(addresses: string[]): Observable<any[]> {
    // Replace this with actual geocoding logic
    // For demonstration, it returns an array of dummy coordinates
    return of(addresses.map((addr, index) => ({ lat: 40.0 + index, lng: -74.0 - index })));
  }
}
