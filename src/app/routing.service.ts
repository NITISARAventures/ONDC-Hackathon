import { Injectable } from '@angular/core';
import * as L from 'leaflet';
import 'leaflet-routing-machine'; // Ensure you have installed and imported this

@Injectable({
  providedIn: 'root'
})
export class RoutingService {

  constructor() { }

  // Assuming this method is inside your RoutingService or a similar service
  generateRoute(map: L.Map, waypoints: L.LatLng[]): void {
    const routingControl = L.Routing.control({
      waypoints: waypoints,
      routeWhileDragging: false,
      createMarker: function(_i: number, wp: any) {
        return L.marker(wp.latLng);
      }
    }).addTo(map);
  
    routingControl.on('routesfound', function(e: { routes: any; }) {
      const routes = e.routes;
      const summary = routes[0].summary;
      // Convert distance to km and time to hours and minutes
      const distance = (summary.totalDistance / 1000).toFixed(2) + ' km';
      const time = (summary.totalTime / 3600).toFixed(2) + ' hours';
      const routingInfo = document.getElementById('routing-info');
      if (routingInfo) {
        routingInfo.innerHTML = `Distance: ${distance}, Time: ${time}`;
      }
    });
  
    // Move the itinerary container after the control has been added to the map
    routingControl.on('routingstart', function() {
      const routingContainer = document.querySelector('.leaflet-routing-container');
      const routingInfo = document.getElementById('routing-info');
      if (routingContainer && routingInfo) {
        routingInfo.appendChild(routingContainer);
      }
    });
  }
  
  
  
}
