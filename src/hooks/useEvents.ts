import axios from "axios";
import authHeader from "../services/auth-header";
import { useQuery } from "@tanstack/react-query";
import apiClient from "../services/api-client";

export interface Event {
  id: number;
  title: string;
  date: string;
  price: string;
  cover: string | null;
}

export interface FetchResponse {
  count: number;
  results: Event[];
}

const useEvents = () => {
  const fetchEvents = () =>
    apiClient
      .get<FetchResponse>("/events/")
      .then((res) => res.data.results);

  return useQuery<Event[], Error>({
    queryKey: ["events"],
    queryFn: fetchEvents,
    staleTime: 30 * 60 * 1000, // 30 Mins
  });
};

export default useEvents;
