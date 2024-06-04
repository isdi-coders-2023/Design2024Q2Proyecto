import {all} from 'redux-saga/effects';

import authSagas from './auth/sagas';

function* actionWatcher() {
    yield all([...authSagas]);
}

export default actionWatcher;
