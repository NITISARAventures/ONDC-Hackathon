import { Injectable } from '@angular/core';
import * as L from 'leaflet';
import 'leaflet-routing-machine'; // Ensure you have installed and imported this

@Injectable({
  providedIn: 'root'
})
export class RoutingService {

  constructor() { }

  generateRoute(map: L.Map, waypoints: L.LatLng[]): void {
    L.Routing.control({
      waypoints: waypoints,
      routeWhileDragging: false,
      show: false, // Set to false to hide the routing itinerary by default
      createMarker: function(_i: number, wp: any) { // Use _i to indicate it's unused, and type wp as any
        return L.marker(wp.latLng);
      }
    }).addTo(map);
  }
  
}
