import { useQuery } from "@tanstack/react-query";
import APIClient from "../services/api-client";
import Event from "../entities/Event";

const useEvent = (id: number) => {
  const apiClient = new APIClient<Event>("/events");

  return useQuery({
    queryKey: ["events", id],
    queryFn: () => apiClient.get(id),
    staleTime: 30 * 60 * 1000, // 30 Mins
  });
};

export default useEvent;
