import { combineReducers, AnyAction, Action } from 'redux'
import { all, fork } from 'redux-saga/effects'

import { History } from 'history'
import { connectRouter, RouterState } from 'connected-react-router'

import clientsSaga from './clients/sagas'
import { ClientsReducer } from './clients/reducer'
import { ClientsState } from './clients/types'

import { Dispatch } from 'react';

//import { offline } from '@redux-offline/redux-offline';
//import offlineConfig from '@redux-offline/redux-offline/lib/defaults';

//Models
export interface AppState {
    clients: ClientsState
    router: RouterState
}

export interface ConnectedReduxProps<A extends Action = AnyAction> {
    dispatch: Dispatch<A>
}

export const createRootReducer = (history: History) =>
    combineReducers({
        clients: ClientsReducer,
        router: connectRouter(history)
    })

export function* rootSaga() {
    yield all([fork(clientsSaga)])
}