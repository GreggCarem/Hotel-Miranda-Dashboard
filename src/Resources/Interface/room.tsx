export interface Room {
  _id: string;
  photo: string;
  roomNumber: string;
  bedType: string;
  facilities: string[];
  rate: string;
  offerPrice?: string;
  status: "Available" | "Occupied" | "Maintenance";
  description: string;
}
