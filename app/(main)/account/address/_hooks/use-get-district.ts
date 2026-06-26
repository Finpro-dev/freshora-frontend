"use client";

import { CORS_CREDENTIALS } from "@/shared/config/dotenv-config";
import { api } from "@/shared/lib/axios-instance";
import { useQuery } from "@tanstack/react-query";
import { getIdAndNameLocation } from "../_utils/get-id-and-name-location-util";

export const useGetDistrict = (city: string) => {
  const { id: cityId, name: _cityName } = getIdAndNameLocation(city);
  return useQuery({
    queryKey: ["city", city],
    queryFn: async () => {
      const { data } = await api.get(`/location/district/${cityId}`);

      return data;
    },

    enabled: !!city,
    staleTime: 5 * 60 * 1000,
  });
};
