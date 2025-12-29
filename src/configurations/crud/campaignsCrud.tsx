import { createAxios } from "./createAxios"

export async function GetAll() {
    return await createAxios().get("campaigns/")
}
export async function GetById(id: string) {
  return await createAxios().get(`/campaigns/${id}`);
}