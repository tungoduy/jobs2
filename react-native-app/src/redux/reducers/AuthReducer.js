import {
    FACEBOOK_LOGIN_SUCCESS,
    FACEBOOK_LOGIN_FAIL
}
from '../../constants';

const INITIAL_STATE = {
    token: '',
    error: ''
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FACEBOOK_LOGIN_SUCCESS:
            return { token: action.payload, error: '' };
        case FACEBOOK_LOGIN_FAIL:
            return { token: '', error: action.payload };
        default:
            return INITIAL_STATE;
    }
}
