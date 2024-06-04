export type Await<T> = T extends {
    then(onfulfilled?: (value: infer U) => unknown): unknown;
}
    ? U
    : T;

export type FetchOptions = RequestInit & {
    auth?: true;
    error?: string;
    defaultContentType?: boolean;
};

export interface ApiErrorResponse {
    statusCode: number;
    message: string;
}

export interface APIValidationError extends ApiErrorResponse {
    statusCode: number;
    message: string;
    errors: Record<string, string[]>;
}
