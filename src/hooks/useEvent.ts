import axios from "axios";
import authHeader from "../services/auth-header";
import { useQuery } from "@tanstack/react-query";
import { Dayjs } from "dayjs";
import apiClient from "../services/api-client";

export interface Event {
  id: number;
  title: string;
  description: string;
  date: string;
  endDate: Dayjs | null;
  category: number;
  location: number;
  cover: string;
  organizer: Organizer;
  tickets: Ticket[];
}

interface Organizer {
  id: number;
  username: string;
}

export interface Ticket {
  id: number;
  title: string;
  price: string;
  capacity: number;
  purchased: number;
  available: boolean;
  description: string;
  needs_approval: boolean;
}

const useEvent = (id: number) => {
  const fetchEvents = () =>
    apiClient
      .get<Event>(`/events/${id}`)
      .then((res) => res.data);

  return useQuery<Event, Error>({
    queryKey: ["events", id],
    queryFn: fetchEvents,
    staleTime: 30 * 60 * 1000, // 30 Mins
  });
};

export default useEvent;
