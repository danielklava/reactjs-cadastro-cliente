import { all, call, fork, put, takeEvery } from 'redux-saga/effects'
import { ClientsActionTypes } from './types'
import { fetchError, fetchSuccess } from './actions'
import axios from 'axios'

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT || 'http://localhost:8080'

function* handleFetch() {
    try {
        // To call async functions, use redux-saga's `call()`.
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

// This is our watcher function. We use `take*()` functions to watch Redux for a specific action
// type, and run our saga, for example the `handleFetch()` saga above.
function* watchFetchRequest() {
    yield takeEvery(ClientsActionTypes.FETCH_REQUEST, handleFetch)
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
        data: JSON.stringify(data)
    })
    return await res.data
}

export default ClientsSaga
