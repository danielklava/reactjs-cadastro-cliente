import { all, call, fork, put, takeEvery } from 'redux-saga/effects'
import { ClientsActionTypes, userConstants } from './types'
import { fetchError, fetchSuccess, authError, authSuccess } from './actions'
import axios from 'axios'
import { push } from 'connected-react-router';

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT || 'http://localhost:8080'

function* handleAuthSuccess(){
    yield put(push('dashboard'));
}

function* handleFetch() {
    try {

        const res = yield call(callClientApi, 'get', API_ENDPOINT, '/clientes')
        console.log(res);
        if (res.error) {
            yield put(fetchError(res.error))
        } else {
            yield put(fetchSuccess(res))
        }
    } catch (err) {
        if (err instanceof Error) {
            yield put(fetchError(err.stack!))
        } else {
            yield put(fetchError('An unknown error occured.'))
        }
    }
}

function* handleAuth(action: any) {
    try {
        console.log(action.payload)
        const res = yield call(callLoginApi, 'post', API_ENDPOINT, '/login', action.payload)
        console.log(res);
        if (res.error) {
            yield put(authError(res.error))
        } else {
            localStorage.setItem('id_token', res.token);
            yield put(authSuccess(res))
        }
    } catch (err) {
        if (err instanceof Error) {
            yield put(authError(err.stack!))
        } else {
            yield put(authError('An unknown error occured.'))
        }
    }
}

// This is our watcher function. We use `take*()` functions to watch Redux for a specific action
// type, and run our saga, for example the `handleFetch()` saga above.
function* watchFetchRequest() {
    yield takeEvery(ClientsActionTypes.FETCH_REQUEST, handleFetch)
}

function* watchAuthRequest() {
    yield takeEvery(userConstants.LOGIN_REQUEST, handleAuth)
}

function* watchAuthSuccess() {
    yield takeEvery(userConstants.LOGIN_SUCCESS, handleAuthSuccess)
}

// We can also use `fork()` here to split our saga into multiple watchers.
function* ClientsSaga() {
    yield all([
        fork(watchFetchRequest),
        fork(watchAuthRequest),
        fork(watchAuthSuccess)
    ])
}
async function callClientApi(method: string, url: string, path: string, data?: any) {
    const res = await axios.request({
        url: url + '/api/v1' + path,
        method,
        headers: {
            Accept: 'application/json',
            Authorization: 'Bearer ' + localStorage.getItem('id_token')
        },
        data: data
    })
    return await res.data
}

async function callLoginApi(method: string, url: string, path: string, data?: any) {
    const res = await axios.request({
        url: url + '/api/v1' + path,
        method,
        headers: {
            Accept: 'application/json'
        },
        data: data
    })
    return await res.data
}

export default ClientsSaga
