import axios from "axios";
import authHeader from "../services/auth-header";
import { useQuery } from "@tanstack/react-query";
import { Dayjs } from "dayjs";

export interface Event {
  title: string;
  description: string;
  date: string;
  endDate: Dayjs | null;
  category: number;
  location: number;
  cover: string;
  organizer: Organizer;
}

interface Organizer {
  id: number;
  username: string;
}

const useEvent = (id: number) => {
  const fetchEvents = () =>
    axios
      .get<Event>(`http://127.0.0.1:8000/events/${id}`, {
        headers: authHeader(),
      })
      .then((res) => res.data);

  return useQuery<Event, Error>({
    queryKey: ["events", id],
    queryFn: fetchEvents,
    staleTime: 30 * 60 * 1000, // 30 Mins
  });
};

export default useEvent;
