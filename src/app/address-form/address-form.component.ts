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
    this.addresses.push('');
  }

  removeAddress(index: number): void {
    this.addresses.splice(index, 1);
  }

  onSubmit(): void {
    this.geocodingService.geocodeAddresses(this.addresses).subscribe(
      (coords) => {
        // Filter out null results if any address couldn't be geocoded
        const validCoords = coords.filter(coord => coord !== null);
        this.coordinates.emit(validCoords);
      },
      (error) => {
        console.error('Geocoding error:', error);
      }
    );
  }
}
