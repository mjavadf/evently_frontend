import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface Category {
  id: number;
  name: string;
}

interface FetchResponse {
  count: number;
  results: Category[];
}

const useCategories = () => {
  const fetchTodos = () =>
    axios
      .get<FetchResponse>("http://127.0.0.1:8000/categories")
      .then((res) => res.data.results);

  return useQuery<Category[], Error>({
    queryKey: ["categoeries"],
    queryFn: fetchTodos,
    staleTime: 30 * 60 * 1000, // 30 Mins
  });
}

export default useCategories