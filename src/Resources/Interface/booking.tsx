export interface Booking {
  totalAmount: ReactNode;
  endDate: string | number | Date;
  startDate: string | number | Date;
  roomId: any;
  private _id(_id: any): void;
  userId: any;
  id: string;
  guest: string;
  orderDate: string;
  checkIn: string;
  checkOut: string;
  specialRequest: string;
  room_type: string;
  status: string;
  photo: string;
}
