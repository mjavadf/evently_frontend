import { useQuery } from "@tanstack/react-query";
import APIClient, { FetchResponse } from "../services/api-client";
import Location from "../entities/Location";


const useLocations = () => {
  const apiCilent = new APIClient<Location>("/locations");
  
  return useQuery<Location[], Error>({
    queryKey: ["locations"],
    queryFn: apiCilent.getAllItems,
    staleTime: 30 * 60 * 1000, // 30 Mins
  });
};

export default useLocations;
