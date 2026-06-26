import { useQuery } from "@tanstack/react-query";
import { CORS_CREDENTIALS } from "../config/dotenv-config";
import { api } from "../lib/axios-instance";

export function useGetUserProfile() {
  const userProfileMutation = useQuery({
    queryKey: ["user-profile"],
    queryFn: async () => {
      const { data } = await api.get(`/users/me`);

      return data;
    },
  });

  return userProfileMutation;
}
