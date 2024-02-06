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
    // Extract addresses from the form array
    const addresses = this.addresses.value.filter((address: string) => address.trim() !== '');
  
    if (addresses.length === 0) {
      console.error('No addresses to geocode');
      return;
    }
  
    this.geocodingService.geocodeAddresses(addresses).subscribe(
      (coords) => {
        // Emit the coordinates for the parent component to use
        this.coordinates.emit(coords);
      },
      (error) => {
        console.error('Geocoding error:', error);
        // Handle errors, possibly show user feedback
      }
    );
  }

  //Polygon generation method
  @Output() generatePolygonEvent = new EventEmitter<string[]>();

  generatePolygon(): void {
    this.generatePolygonEvent.emit(this.addresses.value.filter((address: string) => address.trim() !== ''));
  }

  //Route generation method
  @Output() generateRoutesEvent = new EventEmitter<string[]>();

  generateMotorablePathAndDistance(): void {
    this.generateRoutesEvent.emit(this.addresses.value.filter((address: string) => address.trim() !== ''));
  }


  
}
