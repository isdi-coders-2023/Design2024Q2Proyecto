import {getToken} from '../../api/api';
import {UserAuth} from '../../types/auth.d';
import {AppState} from '../store';
import {AuthState} from './authSlice';

// LOGIN
export const getAuthState = (state: AppState): AuthState => state.auth;

export const isLoggedIn = (state: AppState): boolean => {
    const token = getToken();
    return !!(token && getAuthState(state).isLoggedIn);
};

export const selectLoginError = (state: AppState): string | null =>
    getAuthState(state).error;

export const selectUser = (state: AppState): UserAuth | null =>
    getAuthState(state).user;

export const selectLoginLoading = (state: AppState): boolean =>
    getAuthState(state).loading;
