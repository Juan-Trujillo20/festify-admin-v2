export type ErrorResponse = {
    type: string;
    title: string;
    status: number;
    detail: string;
}
export type APIResult<T, E = ErrorResponse> =  | {ok: true, data: T} | {ok: false, error: E};
 