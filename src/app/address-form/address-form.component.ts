import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormArray } from '@angular/forms';
import { GeocodingService } from '../geocoding.service';

@Component({
  selector: 'app-address-form',
  templateUrl: './address-form.component.html',
  styleUrls: ['./address-form.component.css']
})
export class AddressFormComponent {
  addressForm = this.fb.group({
    addresses: this.fb.array([this.fb.control('')])
  });

  @Output() coordinates = new EventEmitter<any[]>();

  constructor(private fb: FormBuilder, private geocodingService: GeocodingService) {}

  get addresses() {
    return this.addressForm.get('addresses') as FormArray;
  }

  addAddress(): void {
    this.addresses.push(this.fb.control(''));
  }

  removeAddress(index: number): void {
    this.addresses.removeAt(index);
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
