import { useQuery } from "@tanstack/react-query";
import { CORS_CREDENTIALS } from "../config/dotenv-config";
import { api } from "../lib/axios-instance";

export function useSearchRecommendation(search: string) {
  const searchRecommendationMutation = useQuery({
    queryKey: ["search-recommendations", search],
    queryFn: async () => {
      const data = await api.get(
        `${CORS_CREDENTIALS.API_BASE_URL}/search-recommendations?search=${search}`,
      );

      return data.data;
    },
  });

  return searchRecommendationMutation;
}
