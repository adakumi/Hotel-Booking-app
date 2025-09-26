import { Injectable } from '@angular/core';
import { Observable, of, delay, BehaviorSubject } from 'rxjs';
import { Room, RoomType } from '../models/room.model';

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  private rooms: Room[] = [];
  private roomsSubject = new BehaviorSubject<Room[]>([]);
  private storageKey = 'hotel_rooms_data';

  constructor() {
    this.initializeRooms();
  }

  private initializeRooms(): void {
    // Try to load from localStorage first
    const savedRooms = localStorage.getItem(this.storageKey);
    
    if (savedRooms) {
      this.rooms = JSON.parse(savedRooms);
    } else {
      // Initial mock data - only used on first load
      this.rooms = [
        { 
          id: '1', 
          name: '101', 
          type: RoomType.SINGLE, 
          price: 100, 
          available: true,
          image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
          description: 'Cozy single room perfect for solo travelers with comfortable bedding and essential amenities.',
          amenities: ['Free WiFi', 'TV', 'Air Conditioning', 'Work Desk']
        },
        { 
          id: '2', 
          name: '102', 
          type: RoomType.DOUBLE, 
          price: 150, 
          available: true,
          image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
          description: 'Spacious double room ideal for couples or business travelers with premium comfort.',
          amenities: ['Free WiFi', 'TV', 'Air Conditioning', 'Mini Bar', 'Work Desk']
        },
        { 
          id: '3', 
          name: '103', 
          type: RoomType.SUITE, 
          price: 250, 
          available: false,
          image: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
          description: 'Luxurious suite with separate living area, perfect for extended stays or special occasions.',
          amenities: ['Free WiFi', 'Smart TV', 'Air Conditioning', 'Mini Bar', 'Jacuzzi', 'Living Area']
        },
        { 
          id: '4', 
          name: '201', 
          type: RoomType.SINGLE, 
          price: 120, 
          available: true,
          image: 'https://images.unsplash.com/photo-1566195992011-5f6b21e539aa?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
          description: 'Modern single room with city view and contemporary design for comfortable stays.',
          amenities: ['Free WiFi', 'TV', 'Air Conditioning', 'City View', 'Work Desk']
        },
        { 
          id: '5', 
          name: '202', 
          type: RoomType.DOUBLE, 
          price: 160, 
          available: true,
          image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
          description: 'Elegant double room with premium furnishings and enhanced amenities for luxury experience.',
          amenities: ['Free WiFi', 'Smart TV', 'Air Conditioning', 'Mini Bar', 'Balcony', 'Work Desk']
        },
        { 
          id: '6', 
          name: '203', 
          type: RoomType.DELUXE, 
          price: 280, 
          available: true,
          image: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
          description: 'Premium deluxe room with exclusive amenities, stunning views, and ultimate comfort.',
          amenities: ['Free WiFi', 'Smart TV', 'Air Conditioning', 'Mini Bar', 'Jacuzzi', 'Balcony', 'City View']
        }
      ];
      this.saveToLocalStorage();
    }
    
    this.roomsSubject.next(this.rooms);
  }

  private saveToLocalStorage(): void {
    localStorage.setItem(this.storageKey, JSON.stringify(this.rooms));
  }

  getRooms(): Observable<Room[]> {
    return this.roomsSubject.asObservable().pipe(delay(500));
  }

  bookRoom(roomId: string, guestName: string, checkIn: string, checkOut: string): Observable<boolean> {
    const room = this.rooms.find(r => r.id === roomId);
    
    if (room && room.available) {
      room.available = false;
      
      // Save booking details to localStorage
      this.saveBookingDetails(roomId, guestName, checkIn, checkOut);
      
      // Update localStorage and notify subscribers
      this.saveToLocalStorage();
      this.roomsSubject.next([...this.rooms]);
      
      return of(true).pipe(delay(300));
    }
    
    return of(false).pipe(delay(300));
  }

  private saveBookingDetails(roomId: string, guestName: string, checkIn: string, checkOut: string): void {
    const booking = {
      roomId,
      guestName,
      checkIn,
      checkOut,
      bookedAt: new Date().toISOString()
    };
    
    const existingBookings = this.getBookings();
    existingBookings.push(booking);
    localStorage.setItem('hotel_bookings', JSON.stringify(existingBookings));
  }

  getBookings(): any[] {
    const bookings = localStorage.getItem('hotel_bookings');
    return bookings ? JSON.parse(bookings) : [];
  }

  // Method to reset all data (for testing purposes)
  resetData(): void {
    localStorage.removeItem(this.storageKey);
    localStorage.removeItem('hotel_bookings');
    this.initializeRooms();
  }

  // Method to get booking history for a specific room
  getRoomBookingHistory(roomId: string): any[] {
    const bookings = this.getBookings();
    return bookings.filter(booking => booking.roomId === roomId);
  }
}