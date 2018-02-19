import _ from 'lodash';
import { AsyncStorage } from 'react-native';

import { getAsyncData, setAsyncData } from './sharedFunctions';
import {
    CHANGE_SCREEN,
    WELCOME_SCREEN,
    AUTH_SCREEN,
    MAP_SCREEN,
    PASSED_WELCOME,
    FB_TOKEN,
    OTP_TOKEN,
    PASSED_WELCOME_SUCCESS,
    PASSED_WELCOME_FAIL,
    CLEAR_ASYNC_STORAGE_SUCCESS
} from '../../constants';
import { logStart, logEnd, logConsole, logContinue } from '../../mylogger';

export const setNextScreen = (screenName) => {
    return { type: CHANGE_SCREEN, payload: screenName};
}

export const clearData = () => {
    return async (dispatch) => {
        await AsyncStorage.multiRemove([PASSED_WELCOME, FB_TOKEN, OTP_TOKEN]);
        return { type: CLEAR_ASYNC_STORAGE_SUCCESS };
    }
}

export const navigateToScreen = () => {
    return async (dispatch) => {
        let passedWelcome = await checkPassedWelcome(AsyncStorage);
        if (!passedWelcome) {
            dispatch({ type: CHANGE_SCREEN, payload: WELCOME_SCREEN });
        } else {
            let passedAuth = await checkPassedAuth(AsyncStorage);
            if (!passedAuth) {
                dispatch({ type: CHANGE_SCREEN, payload: AUTH_SCREEN });
            } else {
                dispatch({ type: CHANGE_SCREEN, payload: MAP_SCREEN });
            }
        }
    }
}

export const updatePassedWelcome = () => {
    return async (dispatch) => {
        let result = await setAsyncData(AsyncStorage, { key: PASSED_WELCOME, value: 'true' });

        if (result === true) {
            dispatch({ type: PASSED_WELCOME_SUCCESS });
        } else {
            dispatch({ type: PASSED_WELCOME_FAIL, payload: result });
        }
    }
}

checkPassedWelcome = async (_asyncStorage) => {
    let passedWelcome = await getAsyncData(_asyncStorage, PASSED_WELCOME);
        if (_.isNull(passedWelcome) || !passedWelcome) {
            return false;
        } else {
            return true;
        }
}

checkPassedAuth = async (_asyncStorage) => {
    let passedAuth = false;
    await _asyncStorage.multiGet([FB_TOKEN, OTP_TOKEN], (err, stores) => {
        stores.map((result, i, store) => {
            // get at each store's key/value so you can work with it
            let key = store[i][0];
            let value = store[i][1];
            if (_.isNull(value) || !value) {
                return false;
            } else {
                passedAuth = true;
            }
        });
    });

    return passedAuth;

    // let passedAuth = await getAsyncData(_asyncStorage, FB_TOKEN);
    // if (_.isNull(passedAuth) || !passedAuth) {
    //     return false;
    // } else {
    //     return true;
    // }
}
