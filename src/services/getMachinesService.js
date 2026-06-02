import api from "@/utils/axios";

export const getMachines = async (stage) => {
  const response = await api.get("/v1/number_machines", {
    params: { stage },
  });

  return response.data;
};