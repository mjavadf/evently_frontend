export default interface Ticket {
    id: number;
    title: string;
    price: string;
    capacity: number;
    purchased: number | undefined | null;
    available: boolean | undefined | null;
    description: string;
    needs_approval: boolean;
  }