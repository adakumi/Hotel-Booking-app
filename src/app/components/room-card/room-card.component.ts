import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Room, RoomType } from '../../models/room.model';

@Component({
  selector: 'app-room-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './room-card.component.html',
  styleUrls: ['./room-card.component.css']
})
export class RoomCardComponent {
  @Input() room!: Room;
  @Output() bookRoom = new EventEmitter<Room>();

  onBookRoom(): void {
    this.bookRoom.emit(this.room);
  }


  getRoomSize(roomType: string): string {
    switch (roomType) {
      case 'Single':
      case RoomType.SINGLE:
        return '25 m²';
      case 'Double':
      case RoomType.DOUBLE:
        return '35 m²';
      case 'Suite':
      case RoomType.SUITE:
        return '60 m²';
      case 'Deluxe':
        return '80 m²';
      default:
        return '30 m²';
    }
  }


  getGuestCapacity(roomType: string): string {
    switch (roomType) {
      case 'Single':
      case RoomType.SINGLE:
        return '1 Guest';
      case 'Double':
      case RoomType.DOUBLE:
        return '2 Guests';
      case 'Suite':
      case RoomType.SUITE:
        return '4 Guests';
      case 'Deluxe':
        return '4 Guests';
      default:
        return '2 Guests';
    }
  }



}