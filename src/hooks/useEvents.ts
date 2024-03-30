import { useQuery } from "@tanstack/react-query";
import Event from "../entities/Event";
import APIClient, { FetchResponse } from "../services/api-client";

const useEvents = () => {
  const apiClient = new APIClient<Event>("/events/");

  return useQuery<FetchResponse<Event>, Error>({
    queryKey: ["events"],
    queryFn: apiClient.getAll,
    staleTime: 30 * 60 * 1000, // 30 Mins
  });
};

export default useEvents;