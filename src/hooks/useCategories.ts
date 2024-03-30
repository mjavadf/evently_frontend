import { useQuery } from "@tanstack/react-query";
import APIClient, { FetchResponse } from "../services/api-client";

interface Category {
  id: number;
  name: string;
}

const useCategories = () => {
  const apiClient = new APIClient<Category>("/categories/");

  return useQuery<FetchResponse<Category>, Error>({
    queryKey: ["categoeries"],
    queryFn: apiClient.getAll,
    staleTime: 30 * 60 * 1000, // 30 Mins
  });
};

export default useCategories;
