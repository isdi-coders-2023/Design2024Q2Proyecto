/* eslint-disable @typescript-eslint/no-explicit-any */
import Cookies from 'js-cookie';
import {APIValidationError, ApiErrorResponse, FetchOptions} from '../types/api';

export function setToken(token: string, expiresIn: string) {
    Cookies.set('token', token, {expires: new Date(expiresIn), secure: true});
}

export function getToken() {
    return Cookies.get('token');
}

const processOptions = (options?: FetchOptions): FetchOptions => {
    if (!options) {
        return {};
    }
    let opts = {
        ...options,
    };
    // defaultContentType is true, no set 'Content-Type'
    if (
        !opts.defaultContentType &&
        opts.method &&
        opts.method.toUpperCase() !== 'GET'
    ) {
        opts = {
            ...opts,
            headers: {
                ...opts.headers,
                'Content-Type': 'application/json; charset=utf-8',
            },
        };
    }

    const _token = getToken();
    if (opts.auth && _token) {
        opts = {
            ...opts,
            headers: {
                ...opts.headers,
                Authorization: `Bearer ${_token}`,
            },
        };
    }

    return opts;
};

const _apiCall = async (input: string, init: RequestInit) => {
    init.headers = {
        ...init.headers,
        Accept: 'application/json',
    };
    const response: Response = await fetch(input, processOptions(init));

    if (response.ok) {
        return response;
    }

    let error: ApiErrorResponse;
    try {
        error = (await response.json()) || {
            message: 'Unknown error',
            statusCode: 500,
        };
    } catch {
        error = {
            message: 'Unknown error',
            statusCode: 500,
        };
    }

    throw error;
};

export type Result<Ok, Error> =
    | {
          type: 'ok';
          value: Ok;
      }
    | {
          type: 'validation-error';
          value: Error;
      };

export const apiCall = async <T>(
    input: string,
    init: RequestInit & {auth?: boolean},
): Promise<T> => {
    const response = await _apiCall(input, init);
    const clone = response.clone();
    const buffer = await clone.arrayBuffer();

    return buffer.byteLength > 0 ? response.json() : {};
};

export const validatedApiCall = async <T>(
    input: string,
    init: RequestInit & {auth?: boolean},
): Promise<Result<T, APIValidationError>> => {
    try {
        const response = await apiCall<T>(input, init);
        return {
            type: 'ok',
            value: response,
        };
    } catch (e) {
        if (isAPIValidationError(e)) {
            return {
                type: 'validation-error',
                value: e,
            };
        }
        throw e;
    }
};

export function isApiError(param: any): param is ApiErrorResponse {
    return (
        param !== null &&
        typeof param === 'object' &&
        typeof param.statusCode === 'number' &&
        typeof param.message === 'string'
    );
}

export function isAPIValidationError(param: any): param is APIValidationError {
    return param.statusCode === 422;
}
