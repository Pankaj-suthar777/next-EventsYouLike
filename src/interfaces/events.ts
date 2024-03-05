export interface EventType {
  name: string;
  description: string;
  organizer: string;
  guests: string[];

  date: string;
  time: string;
  location: string;

  images: string[];

  ticketTypes: {
    name: string;
    price: number;
    limit: number;
  }[];

  createdAt: string;
  updatedAt: string;
  user: any;
  _id: string;
}
