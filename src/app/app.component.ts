import { Component, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';

import { GeocodingService } from './geocoding.service';
import { RoutingService } from './routing.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {

  constructor(
    private geocodingService: GeocodingService,
    private routingService: RoutingService) {}

  onCoordinatesReceived(coords: any[]): void {
    coords.forEach(coord => {
      L.marker([coord.lat, coord.lng]).addTo(this.map);
    });
  }
  
  private map: any;

  ngAfterViewInit(): void {
    this.initMap();
  }

  private initMap(): void {
    this.map = L.map('map').setView([26.4499, 80.3319], 5);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);
  

   // Set the icon's URL to the path
   const iconUrl = 'assets/leaflet/images/marker-icon.png';
   const iconRetinaUrl = 'assets/leaflet/images/marker-icon-2x.png';
   const shadowUrl = 'assets/leaflet/images/marker-shadow.png';
   const iconDefault = L.icon({
     iconUrl,
     iconRetinaUrl,
     shadowUrl,
     iconSize: [25, 41],
     iconAnchor: [12, 41],
     popupAnchor: [1, -34],
     tooltipAnchor: [16, -28],
     shadowSize: [41, 41]
   });
   L.Marker.prototype.options.icon = iconDefault;

  }

  onGeneratePolygon(addresses: string[]): void {
    this.geocodingService.geocodeAddresses(addresses).subscribe(coords => {
      const validCoords = coords.filter(coord => coord !== null);
      if (validCoords.length > 2) {
        const latLngs = validCoords.map(coord => [coord.lat, coord.lng]);
        const polygon = L.polygon(latLngs, {color: 'red'}).addTo(this.map);
        this.map.fitBounds(polygon.getBounds());
      } else {
        console.error('Not enough valid coordinates to generate a polygon');
      }
    });
  }

  onGenerateRoutes(addresses: string[]): void {
    this.geocodingService.geocodeAddresses(addresses).subscribe(coords => {
      const waypoints = coords.filter(coord => coord !== null).map(coord => L.latLng(coord.lat, coord.lng));
      if (waypoints.length > 1) {
        this.routingService.generateRoute(this.map, waypoints);
      } else {
        console.error('Not enough coordinates to generate a route');
      }
    });
  }

 
}
