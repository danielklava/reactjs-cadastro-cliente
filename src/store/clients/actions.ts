import { action } from 'typesafe-actions'
import { ClientsActionTypes, Client, userConstants } from './types'

export const fetchRequest = () => action(ClientsActionTypes.FETCH_REQUEST)
export const fetchSuccess = (data: Client[]) => action(ClientsActionTypes.FETCH_SUCCESS, data)
export const fetchError = (message: string) => action(ClientsActionTypes.FETCH_ERROR, message)

export const authRequest = (user: string, password: string) => action(userConstants.LOGIN_REQUEST, { username: user, password: password })
export const authSuccess = (data: Client[]) => action(userConstants.LOGIN_SUCCESS, data)
export const authError = (message: string) => action(userConstants.LOGIN_FAILURE, message)