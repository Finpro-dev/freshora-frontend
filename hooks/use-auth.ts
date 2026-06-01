"use client";

import { CORS_CREDENTIALS } from "@/config/dotenv-config";
import { api } from "@/lib/axios-instance";
import { useMutation } from "@tanstack/react-query";

export function useAuth() {
  const loginMutation = useMutation({
    mutationFn: async (credentials: Record<string, string>) => {
      const { data } = await api.post(
        `${CORS_CREDENTIALS.API_BASE_URL}/auth/login`,
        credentials,
      );

      return data;
    },
  });

  return {
    loginMutation: loginMutation.mutate,
    isLoggingIn: loginMutation.isPending,
  };
}
