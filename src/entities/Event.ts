import Ticket from "./Ticket";
import Organizer from "./Organizer";

export default interface Event {
  id: number;
  title: string;
  description: string | "";
  date: string;
  endDate: string | null;
  category: number | null;
  location: number | null;
  cover: string | null;
  organizer: Organizer;
  tickets: Ticket[];
  price: number | null;
}
