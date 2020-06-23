import { ActionTypes } from './types';


export const setCurrentUser = (user) => ({
    type: ActionTypes.SET_CURRENT_USER,
    payload: user
})

export const googleSignInStart = () => ({
  type: ActionTypes.GOOGLE_SIGN_IN_START
})

export const googleSignInSuccess = (user) => ({
    type: ActionTypes.GOOOGLE_SIGNIN_SUCCESS,
    payload: user ,
})

export const emailSignInStart = (emailAndPassword) => ({
  type: ActionTypes.EMAIL_SIGN_IN_START,
  payload: emailAndPassword
})

export const emailSignInSuccess = (emailAndPassword) => ({
    type: ActionTypes.EMAIL_SIGN_IN_SUCCESS,
    payload: emailAndPassword
})

export const createUserRequest = (userAuth, additionalData) => ({
    type: ActionTypes.CREATE_USER,
    payload: { userAuth, additionalData },
})


export const signFailure = (error) => ({
    type: ActionTypes.SIGN_FAILURE,
    payload: error
})

export const signOut = () => ({
    type: ActionTypes.SIGN_OUT,
})
