
import {
    OTP_REQUEST_SUCCESS,
    OTP_REQUEST_FAIL,
    OTP_LOGIN_SUCCESS,
    OTP_LOGIN_FAIL,
    OTP_SIGN_UP_SUCCESS,
    OTP_SIGN_UP_FAIL,
}
from '../../constants';

const INITIAL_STATE = {
    status: 0, // O = Nothing happened
    message: '',
    token: ''
}
export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case OTP_REQUEST_SUCCESS:
            return { status: action.type, message: 'OTP is sent to your phone.'}
        case OTP_REQUEST_FAIL:
            return { status: action.type, message: 'OTP is fail to send. Please check your phone number.'}
        case OTP_LOGIN_SUCCESS:
            return { status: action.type, message: '', toke: action.payload }
        case OTP_LOGIN_FAIL:
            return { status: action.type, message: 'Authentication failed', toke: '' }
        case OTP_SIGN_UP_SUCCESS:
            return { status: action.type, message: 'Sign up success. an OTP is sent to your phone.', toke: '' }
        case OTP_SIGN_UP_FAIL:
            return { status: action.type, message: 'Sign up fail. Maybe user is existed. Try to request a code.', toke: '' }
        default:
            return state;
    }
}