import axios from "axios";
import authHeader from "../services/auth-header";
import { useQuery } from "@tanstack/react-query";

interface Location {
  id: number;
  name: string;
  country: string;
  city: string;
  address: string;
}

const useLocations = () => {
  const fetchEvents = () =>
    axios
      .get<Location[]>("http://127.0.0.1:8000/locations/", {
        headers: authHeader(),
      })
      .then((res) => res.data);

  return useQuery<Location[], Error>({
    queryKey: ["locations"],
    queryFn: fetchEvents,
    staleTime: 30 * 60 * 1000, // 30 Mins
  });
};

export default useLocations;
