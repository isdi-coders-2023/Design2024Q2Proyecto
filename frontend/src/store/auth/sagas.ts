import {PayloadAction} from '@reduxjs/toolkit';
import {call, put, takeLatest} from 'redux-saga/effects';

import {isApiError, setToken} from '../../api/api';
import {Await} from '../../types/api';
import authSlice from './authSlice';
import {AuthRequest} from '../../types/auth';
import {login} from '../../api/auth/auth';

function* loginSaga(action: PayloadAction<AuthRequest>) {
    try {
        const result = (yield call(login, {
            username: action.payload.username,
            password: action.payload.password,
        })) as Await<ReturnType<typeof login>>;

        switch (result.type) {
            case 'ok':
                setToken(result.value.token, result.value.expires);
                yield put(authSlice.actions.loginOk(result.value));
                return;
            case 'validation-error':
                yield put(authSlice.actions.loginKo(result.value));
                return;
        }
    } catch (e) {
        if (isApiError(e)) {
            yield put(authSlice.actions.loginKo(e));
        } else {
            throw e;
        }
    }
}

const authSagas = [takeLatest(authSlice.actions.login.type, loginSaga)];

export default authSagas;
