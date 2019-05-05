import { Reducer } from 'redux'
import { ClientsState, ClientsActionTypes } from './types'

// Type-safe initialState!
export const initialState: ClientsState = {
    data: [],
    errors: undefined,
    loading: false
}

const reducer: Reducer<ClientsState> = (state = initialState, action) => {
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
        default: {
            return state
        }
    }
}

export { reducer as ClientsReducer }
