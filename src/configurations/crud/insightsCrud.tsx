import { createAxios } from "./createAxios"

export async function GetAllInsights() {
    return await createAxios().get("/campaigns/insights")
}
export async function GetByIdInsight(id: string) {
  return await createAxios().get(`/campaigns/${id}/insights`);
}