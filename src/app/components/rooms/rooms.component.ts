import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { RoomService } from '../../services/room.service';
import { RoomCardComponent } from '../room-card/room-card.component';
import { BookingModalComponent } from '../booking-modal/booking-modal.component';
import { Room } from '../../models/room.model';

@Component({
  selector: 'app-rooms',
  standalone: true,
  imports: [
    CommonModule, 
    RouterModule,
    RoomCardComponent,
    BookingModalComponent
  ],
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})
export class RoomsComponent implements OnInit {
  rooms: Room[] = [];
  leftColumnRooms: Room[] = [];
  rightColumnRooms: Room[] = [];
  loading = true;
  selectedRoom: Room | null = null;
  showModal = false;
  showToast = false;
  toastMessage = '';
  toastType: 'success' | 'error' = 'success';

  constructor(
    private roomService: RoomService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadRooms();
  }

  loadRooms(): void {
    this.loading = true;
    this.roomService.getRooms().subscribe({
      next: (rooms) => {
        this.rooms = rooms;
        this.splitRoomsIntoColumns();
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading rooms:', error);
        this.loading = false;
        this.showToastMessage('Error loading rooms', 'error');
      }
    });
  }


  private splitRoomsIntoColumns(): void {
    this.leftColumnRooms = [];
    this.rightColumnRooms = [];

    this.rooms.forEach((room, index) => {
      if (index % 2 === 0) {
        this.leftColumnRooms.push(room);
      } else {
        this.rightColumnRooms.push(room);
      }
    });
  }

  onBookRoom(room: Room): void {
    this.selectedRoom = room;
    this.showModal = true;
  }

  onBookingConfirmed(bookingData: {roomId: string, guestName: string, checkIn: string, checkOut: string}): void {
    this.roomService.bookRoom(bookingData.roomId, bookingData.guestName, bookingData.checkIn, bookingData.checkOut)
      .subscribe(success => {
        if (success) {
          this.showToastMessage('Room booked successfully!', 'success');
          this.loadRooms();
        } else {
          this.showToastMessage('Booking failed. Room may no longer be available.', 'error');
        }
      });
  }


  scrollToContact(): void {
    this.router.navigate(['/'], { fragment: 'contact' });
  }

  // scrollToContact(): void {
  //   const contactSection = document.getElementById('contact');
  //   if (contactSection) {
  //     contactSection.scrollIntoView({ behavior: 'smooth' });
  //   } else {
  //     // If no contact section on rooms page, navigate to home
  //     this.router.navigate(['/'], { fragment: 'contact' });
  //   }
  // }

  private showToastMessage(message: string, type: 'success' | 'error'): void {
    this.toastMessage = message;
    this.toastType = type;
    this.showToast = true;
    setTimeout(() => {
      this.showToast = false;
    }, 4000);
  }

  getToastClass(): string {
    return this.toastType === 'success' ? 'bg-success' : 'bg-danger';
  }

  getRoomSize(roomType: string): string {
    switch (roomType) {
      case 'Single': return '25 m²';
      case 'Double': return '35 m²';
      case 'Suite': return '60 m²';
      case 'Deluxe': return '80 m²';
      default: return '30 m²';
    }
  }


  goBackToHome(): void {
  this.router.navigate(['/']);
}

resetAllData(): void {
  this.roomService.resetData();
  this.loadRooms(); // reload to reflect cleared data
  this.showToastMessage('All room data reset.', 'success');
}

}