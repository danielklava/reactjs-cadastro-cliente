import { all, call, fork, put, takeEvery } from 'redux-saga/effects'
import { ClientsActionTypes, userConstants } from './types'
import { fetchError, fetchSuccess, authError , authSuccess} from './actions'
import axios from 'axios'

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT || 'http://localhost:8080'

function* handleFetch() {
    try {
        
        const res = yield call(callApi, 'get', API_ENDPOINT, '/clientes')
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
        
        const res = yield call(callApi, 'post', API_ENDPOINT, '/login', action.payload)

        if (res.error){
            yield put(authError(res.error))
        } else {
            yield put(authSuccess(res.sucess))
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


// We can also use `fork()` here to split our saga into multiple watchers.
function* ClientsSaga() {
    yield all([fork(watchFetchRequest)])
}

async function callApi(method: string, url: string, path: string, data?: any) {
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
