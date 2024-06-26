import axios, { AxiosRequestConfig, CanceledError } from "axios";
import authHeader from "./auth-header";

/**
 * Represents the response structure for fetching data.
 */
export interface FetchResponse<T> {
  count: number;
  next: string | null;
  results: T[];
}

const axiosInstance = axios.create({
  baseURL: "http://127.0.0.1:8000",
  headers: {
    Authorization: authHeader(),
  },
});

/**
 * Represents an API client for making HTTP requests.
 */
class APIClient<T> {
  /**
   * The endpoint URL for the API client.
   */
  endpoint: string;

  /**
   * Creates an instance of the APIClient class.
   * @param endpoint - The endpoint URL for the API client.
   */
  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  /**
   * Retrieves all items from the API.
   * @param config - The Axios request configuration.
   * @returns A promise that resolves to the fetched data.
   */
  getAll = (config: AxiosRequestConfig) => {
    return axiosInstance
      .get<FetchResponse<T>>(this.endpoint, config)
      .then((res) => res.data);
  };

  /**
   * Retrieves a specific item from the API.
   * @param id - The ID of the item to retrieve.
   * @returns A promise that resolves to the fetched data.
   */
  get = (id: number | string) => {
    return axiosInstance
      .get<T>(`${this.endpoint}/${id}`)
      .then((res) => res.data);
  };

  /**
   * Retrieves all items from the API that are not paginated.
   * @returns A promise that resolves to the fetched data.
   */
  getAllItems = () => {
    return axiosInstance.get<T[]>(this.endpoint).then((res) => res.data);
  };

  /**
   * Creates a new item in the API.
   * @param data - The data for the new item.
   * @returns A promise that resolves to the created item.
   */
  create = (data: T, config?: AxiosRequestConfig) => {
    return axiosInstance
      .post<T>(this.endpoint, data, config)
      .then((res) => res.data);
  };

  /**
   * Updates an existing item in the API.
   * @param id - The ID of the item to update.
   * @param data - The updated data for the item.
   * @returns A promise that resolves to the updated item.
   */
  update = (id: number | string, data: T, config?: AxiosRequestConfig) => {
    return axiosInstance
      .put<T>(`${this.endpoint}/${id}`, data, config)
      .then((res) => res.data);
  };

  /**
   * Deletes an item from the API.
   * @param id - The ID of the item to delete.
   * @returns A promise that resolves when the item is deleted.
   */
  delete = (id: number | string) => {
    return axiosInstance.delete(`${this.endpoint}/${id}`);
  };
}

export default APIClient;
