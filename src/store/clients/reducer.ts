import { Reducer } from 'redux'
import { ClientsState, ClientsActionTypes, userConstants } from './types'

export const initialState: ClientsState = {
    data: [],
    errors: undefined,
    loading: false,
    loggedIn: false
}

const reducer: Reducer<ClientsState> = (state = initialState, action) => {
    console.log(action);
    switch (action.type) {
        case ClientsActionTypes.FETCH_REQUEST: {
            return { ...state, loading: true }
        }
        case ClientsActionTypes.FETCH_SUCCESS: {
            return { ...state, loading: false, data: action.payload }
        }
        case ClientsActionTypes.FETCH_ERROR: {
            return { ...state, loading: false, errors: action.payload }
        }
        case userConstants.LOGIN_REQUEST: {
            return { ...state, loading: true }
        }
        case userConstants.LOGIN_SUCCESS: {
            return { ...state, loading: false, loggedIn: true}
        }
        case userConstants.LOGIN_FAILURE: {
            return { ...state, loading: false, errors: action.payload }
        }
        default: {
            return state
        }
    }
}

export { reducer as ClientsReducer }
