import {
    FETCH_JOBS_SUCCESS,
    FETCH_JOBS_FAIL
} from '../../constants';

const INITIAL_STATE = {
    data: [],
    error: '',
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FETCH_JOBS_SUCCESS:
            return { data: action.payload, error: ''};
        case FETCH_JOBS_FAIL:
            return { data: [], error: action.payload};
        default:
            return state;
    }
}