import { ActionTypes } from './types';

export const createUserRequest = (userAuth, additionalData) => ({
  type: ActionTypes.CREATE_USER,
  payload: { userAuth, additionalData },
})

export const googleSignInStart = () => ({
  type: ActionTypes.GOOGLE_SIGN_IN_START
})

export const emailSignInStart = (emailAndPassword) => ({
  type: ActionTypes.EMAIL_SIGN_IN_START,
  payload: emailAndPassword
})

export const signInSuccess = (user) => ({
  type: ActionTypes.SIGN_IN_SUCCESS,
  payload: user
})

export const signOutStart = () => ({
  type: ActionTypes.SIGN_OUT_START,
})

export const signOutSuccess = () => ({
  type: ActionTypes.SIGN_OUT_SUCCESS,
})

export const signFailure = (error) => ({
    type: ActionTypes.SIGN_FAILURE,
    payload: error
})
