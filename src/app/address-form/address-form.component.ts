import { Component, EventEmitter, Output } from '@angular/core';
import { GeocodingService } from '../geocoding.service';

@Component({
  selector: 'app-address-form',
  templateUrl: './address-form.component.html',
  styleUrls: ['./address-form.component.css']
})
export class AddressFormComponent {
  addresses: string[] = [''];
  
  @Output() coordinates = new EventEmitter<any[]>();

  constructor(private geocodingService: GeocodingService) {}

  addAddress(): void {
    if (this.addresses.length < 8) {
      this.addresses.push('');
    }
  }

  removeAddress(index: number): void {
    this.addresses.splice(index, 1);
  }

  onSubmit(): void {
    this.geocodingService.geocodeAddresses(this.addresses).subscribe(
      (coords) => {
        this.coordinates.emit(coords);
      },
      (error) => {
        console.error('Geocoding error:', error);
      }
    );
  }
}
