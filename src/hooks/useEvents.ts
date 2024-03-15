import axios from "axios";
import authHeader from "../services/auth-header";
import { useQuery } from "@tanstack/react-query";

export interface Event {
  id: number;
  title: string;
  date: string;
  price: string;
  images: Image[] | [];
}

interface Image {
  id: string;
  image: string;
}

export interface FetchResponse {
  count: number;
  results: Event[];
}

const useEvents = () => {
  const fetchEvents = () =>
    axios
      .get<FetchResponse>("http://127.0.0.1:8000/events/", {
        headers: authHeader(),
      })
      .then((res) => res.data.results);

  return useQuery<Event[], Error>({
    queryKey: ["events"],
    queryFn: fetchEvents,
    staleTime: 30 * 60 * 1000, // 30 Mins
  });
};

export default useEvents;
