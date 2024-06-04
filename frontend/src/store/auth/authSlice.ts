import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {APIError} from '../../types/api/api';
import {AuthRequest, AuthResponse, UserAuth} from '../../types/auth/auth';

export interface AuthState {
    loading: boolean;
    user: UserAuth | null;
    isLoggedIn: boolean;
    error: string | null;
}

export const initialState: AuthState = {
    isLoggedIn: false,
    user: null,
    loading: false,
    error: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: {
            reducer(state) {
                state.loading = true;
            },
            prepare(payload: AuthRequest) {
                return {payload};
            },
        },
        loginOk(state, action: PayloadAction<AuthResponse>) {
            state.isLoggedIn = true;
            state.loading = false;
            state.user = action.payload.user;
            state.error = null;
        },
        loginKo(state, action: PayloadAction<APIError>) {
            state.isLoggedIn = false;
            state.loading = false;
            state.error = action.payload.message;
            state.user = null;
        },
        logout() {
            return initialState;
        },
    },
});

export const {login, loginOk, loginKo} = authSlice.actions;

export default authSlice;
