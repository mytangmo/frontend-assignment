import { api } from "@/lib/eden";
import { SizeDetail } from "@/types/size.type";

export async function getAllSize(): Promise<SizeDetail[]> {
  const { data, error } = await api.sizes.get();
  if (error) {
    throw new Error("Unable to load sizes");
  }
  return data;
}
