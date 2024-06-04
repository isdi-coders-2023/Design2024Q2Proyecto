import {ISO8601DateString} from '@types/common';

export interface AuthRequest {
    username: string;
    password: string;
}

export interface AuthResponse {
    token: string;
    expires: ISO8601DateString;
    user: UserAuth;
}

export type UserAuth = {
    id: string;
    name: string;
    lastname: string;
    email: string;
};
