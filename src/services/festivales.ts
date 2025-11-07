import type { Festival } from "@/types/festival";

const festivalAPI = "http://localhost:8080";

export const listFestivals = async (): Promise<Festival[]> => {
    const response = await fetch(`${festivalAPI}/festivals`,
        {
            method: "GET"
        });
    if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
    }
    const festivals: Festival[] = await response.json();
    return festivals;
}