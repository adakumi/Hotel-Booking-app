import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Room } from '../../models/room.model';

@Component({
  selector: 'app-booking-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './booking-modal.component.html',
  styleUrls: ['./booking-modal.component.css']
})
export class BookingModalComponent {
  @Input() room: Room | null = null;
  @Input() visible = false;
  @Output() visibleChange = new EventEmitter<boolean>();
  @Output() bookingConfirmed = new EventEmitter<{roomId: string, guestName: string, checkIn: string, checkOut: string}>();

  bookingForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.bookingForm = this.fb.group({
      guestName: ['', [Validators.required, Validators.minLength(2)]],
      checkIn: ['', Validators.required],
      checkOut: ['', Validators.required]
    });
  }

  get guestName() { return this.bookingForm.get('guestName'); }
  get checkIn() { return this.bookingForm.get('checkIn'); }
  get checkOut() { return this.bookingForm.get('checkOut'); }

  onHide(): void {
    this.visible = false;
    this.visibleChange.emit(false);
    this.bookingForm.reset();
  }

  onSubmit(): void {
    if (this.bookingForm.valid && this.room) {
      this.bookingConfirmed.emit({
        roomId: this.room.id,
        guestName: this.bookingForm.value.guestName,
        checkIn: this.bookingForm.value.checkIn,
        checkOut: this.bookingForm.value.checkOut
      });
      this.onHide();
    }
  }

  get tomorrow(): string {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  }
}
