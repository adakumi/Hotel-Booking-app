export interface Room {
  id: string;
  name: string;
  type: RoomType;
  price: number;
  available: boolean;
  image: string;
  description: string; 
  amenities: string[]; 
}

export enum RoomType {
  SINGLE = 'Single',
  DOUBLE = 'Double',
  SUITE = 'Suite',
  DELUXE = 'Deluxe'
}