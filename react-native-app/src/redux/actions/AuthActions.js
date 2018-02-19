import _ from 'lodash';
import { Facebook } from 'expo';
import { AsyncStorage } from 'react-native';
import axios from 'axios';

import { getAsyncData, setAsyncData } from './sharedFunctions';
import {
    FB_TOKEN,
    FACEBOOK_LOGIN_SUCCESS,
    FACEBOOK_LOGIN_FAIL,
    FIREBASE_FN_CREATE_USER,
    FIREBASE_FN_REQUEST_OTP,
    FIREBASE_FN_VERIFY_OTP,
    OTP_REQUEST_SUCCESS,
    OTP_REQUEST_FAIL,
    OTP_LOGIN_SUCCESS,
    OTP_LOGIN_FAIL,
    OTP_TOKEN,
    OTP_SIGN_UP_SUCCESS,
    OTP_SIGN_UP_FAIL,
}
from '../../constants';

export const facebookLogin = (callback) => {
    return async (dispatch) => {

        let preToken = await checkToken(FB_TOKEN);
        if(preToken === false) {
            const { type, token } = await Facebook.logInWithReadPermissionsAsync('1748038121927442', {
                permissions: ['public_profile'],
            });
            if (type === 'success') {
                // Save the token
                let result = await setAsyncData(AsyncStorage, { key: FB_TOKEN, value: token });
                if (result) {
                    dispatch({ type: FACEBOOK_LOGIN_SUCCESS, payload: token });
                    callback();
                } else {
                    dispatch({ type: FACEBOOK_LOGIN_FAIL, payload: result });
                }
            } else {
                dispatch({ type: FACEBOOK_LOGIN_FAIL });
            }
        } else {
            dispatch({ type: FACEBOOK_LOGIN_SUCCESS, payload: preToken });
            callback();            
        }
    }
}

export const requestCode = (phone) => {
    return async (dispatch) => {
        try {
            // Request a code
            await axios.post(FIREBASE_FN_REQUEST_OTP, { phone });
            dispatch({ type: OTP_REQUEST_SUCCESS });
        } catch (err) {
            console.log(err);
            dispatch({ type: OTP_REQUEST_FAIL, payload: err });
        }
    }
}

export const OTPLogin = (phone, code) => {
    return async (dispatch) => {
        try {
            // Request a code
            let { data } = await axios.post(FIREBASE_FN_VERIFY_OTP, { phone, code });
            //console.log(data);
            await setAsyncData(AsyncStorage, { key: OTP_TOKEN, value: data.token });
            dispatch({ type: OTP_LOGIN_SUCCESS });
        } catch (err) {
            console.log(err);
            dispatch({ type: OTP_LOGIN_FAIL, payload: err });
        }
    }
}

export const signUp = (phone) => {
    return async (dispatch) => {
        try {
            await axios.post(FIREBASE_FN_CREATE_USER, { phone });
            await axios.post(FIREBASE_FN_REQUEST_OTP, { phone });
            dispatch({ type: OTP_SIGN_UP_SUCCESS });
        } catch (err) {
            console.log(err);
            dispatch({ type: OTP_SIGN_UP_FAIL, payload: err });
        }
    }
}

checkToken = async (tokenName) => {
    let token = await getAsyncData(AsyncStorage, tokenName);
    if(_.isNull(token)) {
        return false;
    } else {
        return token;
    }
}