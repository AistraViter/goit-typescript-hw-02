import axios from "axios";
import { Image as ImageData } from "./types/ImageTypes";

const API_KEY = "FMIJ5k-c5lppvR6WpV4KaIibT-R7gUAfjxBmMzlKrlI";

axios.defaults.baseURL = "https://api.unsplash.com/";

interface FetchImagesResponse {
  total: number;
  total_pages: number;
  results: ImageData[];
}

export async function fetchImages(
  query: string,
  page: number
): Promise<FetchImagesResponse> {
  const { data } = await axios.get<FetchImagesResponse>("/search/photos", {
    params: {
      client_id: API_KEY,
      page: page,
      per_page: 12,
      query: query,
    },
  });
  return data;
}
