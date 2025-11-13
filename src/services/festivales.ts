import type { APIResult, ErrorResponse } from "@/types/Errors";
import type { Festival, FestivalRequest } from "@/types/festival";



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

export const updateFestival=async(id: string, request:FestivalRequest):Promise<Festival | ErrorResponse>=>{
    const response = await fetch(`${festivalAPI}/festivals/${id}`,
        {
            method: "PUT",
            headers: { 
                "Content-type": "application/json",
            },
            body: JSON.stringify(request),
        });
    if (!response.ok) {
        const error: ErrorResponse = await response.json();
        return error;
    }
    const festival: Festival= await response.json();
    return festival;
}       

export const getFestival = async( id: string):Promise<APIResult<Festival>>=>{
    const response = await fetch(`${festivalAPI}/festivals/${id}`,
        {
            method: "GET",
            headers: {
                "Accept": "application/json",
            },
        });
    if (!response.ok) {
        const festival: Festival = await response.json();
        return {ok:true, data: festival};
    }
    const error: ErrorResponse= await response.json();
    return {ok:false, error: error};
}

export const createFestival=async(request: FestivalRequest):Promise<APIResult<Festival>>=>{
    const response = await fetch(`${festivalAPI}/festivals`,
        {
            method: "POST",
            headers: { 
                "Content-type": "application/json",
            },
            body: JSON.stringify(request),
        });
    if (response.ok) {
        const festival: Festival = await response.json();
        return {ok:true, data: festival};
    }
    const error: ErrorResponse= await response.json();
    return {ok:false, error: error};
}
 
export const deleteFestival=async (id:string):Promise<APIResult <null>>=>{
    const response = await fetch(`${festivalAPI}/festivals/${id}`,
        {
            method: "DELETE",
        });
    if (response.ok) {
        return {ok:true, data: null};
    }
    const error: ErrorResponse= await response.json();
    return {ok:false, error: error};
}

