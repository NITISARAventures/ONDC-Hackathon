import { Component, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {

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
  

   // Set the icon's URL to the correct path
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

   // Now, when you add a marker, it will use the correct icon
   //L.marker([28.553440, 77.214241]).addTo(this.map);
  }
 
}
