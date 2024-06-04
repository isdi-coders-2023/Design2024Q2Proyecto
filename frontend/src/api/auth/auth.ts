import {APIValidationError} from '../../types/api';
import {AuthRequest, AuthResponse} from '../../types/auth';
import {Result, validatedApiCall} from '../api';

export const login = async (
    data: AuthRequest,
): Promise<Result<AuthResponse, APIValidationError>> =>
    validatedApiCall<AuthResponse>(`/api/auth/login`, {
        method: 'POST',
        body: JSON.stringify(data),
    });
