import type {Artist, ArtistRequest} from "@/types/artist.ts";
import type { ErrorResponse } from "react-router-dom";


const artistAPIBaseURL = "http://localhost:8080";


export const listArtists = async (): Promise<Artist[]> => {
    const response = await fetch(`${artistAPIBaseURL}/artists`,
        {
            method: "GET"
        });
    if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
    }
    const artists: Artist[] = await response.json();
    return artists;
}

export const createArtists = async(request: ArtistRequest):Promise<Artist|ErrorResponse> => {
    const response = await fetch(`${artistAPIBaseURL}/artists`,
        {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(request),
        });
    if (!response.ok) {
        const error: ErrorResponse = await response.json();
        return error;
    }
    const artists: Artist= await response.json();
    return artists;
}

export const updateArtist = async(id: string, request: ArtistRequest):Promise<Artist|ErrorResponse> => {
    const response = await fetch(`${artistAPIBaseURL}/artists/${id}`,
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
    const artists: Artist= await response.json();
    return artists;
}



export const getArtist = async(id: string):Promise<Artist|ErrorResponse> => {
    const response = await fetch(`${artistAPIBaseURL}/artists/${id}`,
        {
            method: "GET",
            headers: {
                "Accept": "application/json",
            }
        });
    if (!response.ok) {
        const error: ErrorResponse = await response.json();
        return error;
    }
    const artists: Artist= await response.json();
    return artists;
}

export const deleteArtists = async(id: string):Promise<ErrorResponse| void> => {
    const response = await fetch(`${artistAPIBaseURL}/artists/${id}`,
        {
            method: "DELETE",
        });
    if (!response.ok) {
        const error: ErrorResponse = await response.json();
        return error;
    }
}
