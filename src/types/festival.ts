export  type Festival = {
    id:number;
    title: string;
    about: string;
    city: string;
    from: string;
    to: string;
    price_from: number;
    price_to: number;
}


export type FestivalRequest = {
    id?:number;
    title: string;
    about: string;
    city: string;
    from: string;
    to: string;
    price_from: number;
    price_to: number;
}


