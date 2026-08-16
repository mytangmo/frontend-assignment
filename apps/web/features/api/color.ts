import { api } from "@/lib/eden";
import { ColorDetail } from "@/types/colors.type";

export async function getAllColors(): Promise<ColorDetail[]> {
  const { data, error } = await api.colors.get();
  if (error) {
    throw new Error("Unable to load colors");
  }
  return data;
}
